import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { WordServiceProxy } from "../../services/word/word.service";
import WordDto from "@app/services/word/word.model";
import { CreateWordDialogComponent } from "../create-word/create-word-dialog.component";
import { EditWordDialogComponent } from "../edit-word/edit-word-dialog.component";
import { Select, Store } from "@ngxs/store";
import { Word } from "@app/store/actions/word.actions";
import { WordState } from "@app/store/states/word.state";
import { Observable } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { NgxPaginationModule } from "ngx-pagination";
import SearchResult from "@app/shared/model/search-result";
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { words } from "lodash";
import { Router } from '@angular/router';
import { basename } from "path";
import { BreadcrumbService } from 'xng-breadcrumb';

class PagedWordsRequestDto extends PagedRequestDto {
  word: string;
}

@Component({
  selector: 'app-word-maintenance',
  templateUrl: './word-maintenance.component.html',
  styleUrls: ['./word-maintenance.component.css'],
  animations: [appModuleAnimation()]
})
export class WordMaintenanceComponent extends PagedListingComponentBase<WordDto> {

  @Select(WordState.getWords)
  words$: Observable<SearchResult<WordDto>>;

  words: WordDto[] = [];
  word = "";

  columns = [
    { prop: 'word', minxWidth: 100, maxWidth: 200 },
    { name: 'frequency', minxWidth: 50, maxWidth: 100 },
    { name: 'phoneticSymbol', minxWidth: 100, maxWidth: 200 },
    { name: 'definition' },
    { name: 'formattedCreationTime'},
    { name: 'Actions', prop: 'Id' }
  ];

  loadingIndicator:boolean = true;
  reorderable:boolean = true;
  SortType = SortType;
  ColumnMode = ColumnMode;

  constructor(
    injector: Injector,
    private _wordsService: WordServiceProxy,
    private _modalService: BsModalService,
    private store: Store,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.breadcrumbService.set('@WordMaintenance', this.l("WordMaintenance"));
  }

  list(
    request: PagedWordsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.word = this.word;

    this.store
      .dispatch(new Word.GetAll(request))
      .pipe(
        finalize(() => {
          finishedCallback();
          this.words$.subscribe((result: SearchResult<WordDto>) => {
            this.words = result.items;
            this.showPaging(result, pageNumber);
          });
        })
      )
      .subscribe(() => {});
  }

  delete(word: WordDto): void {
    abp.message.confirm(
      this.l("WordDeleteWarningMessage", word.word),
      undefined,
      (result: boolean) => {
        if (result) {
          this.store
            .dispatch(new Word.Delete(word.id))
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
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

  editWord(id: number): void {
    this.showCreateOrEditWordDialog(id);
  }

  showCreateOrEditWordDialog(id?: number): void {
    let createOrEditWordDialog: BsModalRef;
    if (!id) {
      createOrEditWordDialog = this._modalService.show(
        CreateWordDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditWordDialog = this._modalService.show(
        EditWordDialogComponent,
        {
          class: "modal-lg",
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

  checkRouteUrl() {
    return this.router.url == '/app/words/word-maintenance';
  }

}
