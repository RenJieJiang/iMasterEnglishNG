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
import { SentenceServiceProxy } from '../../services/sentence/sentence.service';
import { Select, Store } from '@ngxs/store';
import { Sentence } from '@app/store/actions/sentence.actions';
import { SentenceState } from '@app/store/states/sentence.state';
import { Observable } from 'rxjs';
import SentenceDto from '@app/services/sentence/sentence.model';

@Component({
  templateUrl: 'edit-sentence-dialog.component.html'
})
export class EditSentenceDialogComponent extends AppComponentBase implements OnInit {
  @Select(SentenceState.getSentence)
  sentences$: Observable<SentenceDto>;

  saving = false;
  id: number;
  sentence = new SentenceDto();
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _sentenceService: SentenceServiceProxy,
    public bsModalRef: BsModalRef,
    private store: Store
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.store
    .dispatch(new Sentence.Get(this.id))
    .pipe(
      finalize(() => {
        this.sentences$.subscribe((result: SentenceDto) => {
          this.sentence = result;
        });
      })
    )
    .subscribe(() => {});
  }

  saveSentence(): void {
    this.saving = true;

    const sentence = new SentenceDto();
    sentence.init(this.sentence);

    this.store
    .dispatch(new Sentence.Edit(sentence))
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
