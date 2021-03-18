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
} from '../services/word.service';

@Component({
  templateUrl: 'edit-word-dialog.component.html'
})
export class EditWordDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  word = new WordDto();
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _wordService: WordServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._wordService
      .get(this.id)
      .subscribe((result: WordDto) => {
        this.word = result;
      });
  }

  save(): void {
    this.saving = true;

    const word = new WordDto();
    word.init(this.word);

    this._wordService
      .update(word)
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
