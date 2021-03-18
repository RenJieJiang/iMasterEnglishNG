import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize,take,mergeMap, switchMap } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  WordServiceProxy,
  WordDto,
  CreateWordDto,
} from '../services/word.service';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { interval,of, timer } from 'rxjs';

@Component({
  templateUrl: 'create-word-dialog.component.html'
})
export class CreateWordDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  word = new WordDto();
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _wordService: WordServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const word = new CreateWordDto();
    word.init(this.word);

    this._wordService
      .create(word)
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
