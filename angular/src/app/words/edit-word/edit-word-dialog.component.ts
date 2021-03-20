import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  WordServiceProxy,
  WordDto,
  WordEditDto,
} from '../../services/word.service';
import { Select, Store } from '@ngxs/store';
import { Word } from '@app/store/actions/word.actions';
import { WordState } from '@app/store/states/word.state';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'edit-word-dialog.component.html'
})
export class EditWordDialogComponent extends AppComponentBase implements OnInit {
  @Select(WordState.getWord)
  words$: Observable<WordDto>;

  saving = false;
  id: number;
  word = new WordDto();
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _wordService: WordServiceProxy,
    public bsModalRef: BsModalRef,
    private store: Store
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.store
    .dispatch(new Word.Get(this.id))
    .pipe(
      finalize(() => {
        this.words$.subscribe((result: WordDto) => {
          this.word = result;
        });
      })
    )
    .subscribe(() => {});
  }

  save(): void {
    this.saving = true;

    const word = new WordDto();
    word.init(this.word);

    this.store
    .dispatch(new Word.Edit(this.word))
    .pipe(
      finalize(() => {
        this.saving = false;
      })
    )
    .subscribe(() => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    });
  }
}
