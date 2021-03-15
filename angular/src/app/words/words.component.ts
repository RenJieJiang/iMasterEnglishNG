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
} from '@shared/service-proxies/word';
import { CreateWordDialogComponent } from './create-word/create-word-dialog.component';
import { EditWordDialogComponent } from './edit-word/edit-word-dialog.component';

class PagedWordsRequestDto extends PagedRequestDto {
  word: string;
}

@Component({
  templateUrl: './words.component.html',
  animations: [appModuleAnimation()]
})
export class WordsComponent extends PagedListingComponentBase<WordDto> {
  words: WordDto[] = [];
  word = '';

  constructor(
    injector: Injector,
    private _wordsService: WordServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedWordsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.word = this.word;

    this._wordsService
      .getAll(request.word, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: WordDtoPagedResultDto) => {
        this.words = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(word: WordDto): void {
    abp.message.confirm(
      this.l('WordDeleteWarningMessage', word.word),
      undefined,
      (result: boolean) => {
        if (result) {
          this._wordsService
            .delete(word.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
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
    }
    else {
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
