import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  WordServiceProxy,
  WordDto,
  WordDtoPagedResultDto
} from './services/word.service';
import { CreateWordDialogComponent } from './create-word/create-word-dialog.component';
import { EditWordDialogComponent } from './edit-word/edit-word-dialog.component';
import { Select, Store } from '@ngxs/store';
import { Word } from './state/word.actions';
import { WordState } from './state/word.state';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

class PagedWordsRequestDto extends PagedRequestDto {
  word: string;
}

@Component({
  templateUrl: './words.component.html',
  animations: [appModuleAnimation()]
})
export class WordsComponent extends PagedListingComponentBase<WordDto> {
  @Select(WordState.getWords)
  words$: Observable<WordDtoPagedResultDto>;

  words: WordDto[] = [];
  word = '';

  constructor(
    injector: Injector,
    private _wordsService: WordServiceProxy,
    private _modalService: BsModalService,
    private store: Store
  ) {
    super(injector);
  }

  list(
    request: PagedWordsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.word = this.word;

    this.store
    .dispatch(new Word.GetAll(request))
    .pipe(finalize(() => {
      finishedCallback();
      this.words$.subscribe((result: WordDtoPagedResultDto) => {
        this.words = result.items;
        this.showPaging(result, pageNumber);
      });
    }))
    .subscribe(() => { });
  }

  delete(word: WordDto): void {
    abp.message.confirm(
      this.l('WordDeleteWarningMessage', word.word),
      undefined,
      (result: boolean) => {
        if (result) {
          this.store
          .dispatch(new Word.Delete(word.id))
          .pipe(finalize(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          }))
          .subscribe(() => { });
        }
      }
    );
  }

  createWord(): void {
    this.showCreateOrEditWordDialog();
  }

  editWord(word: WordDto): void {
    this.showCreateOrEditWordDialog(word.id);
  }

  showCreateOrEditWordDialog(id?: number): void {
    let createOrEditWordDialog: BsModalRef;
    if (!id) {
      createOrEditWordDialog = this._modalService.show(
        CreateWordDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditWordDialog = this._modalService.show(
        EditWordDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditWordDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
