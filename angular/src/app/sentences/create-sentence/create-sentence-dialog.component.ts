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
import { SentenceServiceProxy } from '../../services/sentence/sentence.service';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { interval,of, timer } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Sentence } from '@app/store/actions/sentence.actions';
import { SentenceState } from '@app/store/states/sentence.state';
import { Observable } from 'rxjs';
import SentenceDto from '@app/services/sentence/sentence.model';

@Component({
  templateUrl: 'create-sentence-dialog.component.html'
})
export class CreateSentenceDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  sentence = new SentenceDto();
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

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
  }

  saveSentence(): void {
    this.saving = true;

    const sentence = new SentenceDto();
    sentence.init(this.sentence);

    this.store
    .dispatch(new Sentence.Add(sentence))
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
