import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { SentenceServiceProxy } from "../../services/sentence/sentence.service";
import SentenceDto from "@app/services/sentence/sentence.model";
import { CreateSentenceDialogComponent } from "../create-sentence/create-sentence-dialog.component";
import { EditSentenceDialogComponent } from "../edit-sentence/edit-sentence-dialog.component";
import { Select, Store } from "@ngxs/store";
import { Sentence } from "@app/store/actions/sentence.actions";
import { SentenceState } from "@app/store/states/sentence.state";
import { Observable } from "rxjs";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { NgxPaginationModule } from "ngx-pagination";
import SearchResult from "@app/shared/model/search-result";
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { basename } from "path";
import { BreadcrumbService } from 'xng-breadcrumb';

class PagedSentencesRequestDto extends PagedRequestDto {
  sentence: string;
}

@Component({
  selector: 'app-sentence-maintenance',
  templateUrl: './sentence-maintenance.component.html',
  styleUrls: ['./sentence-maintenance.component.css'],
  animations: [appModuleAnimation()]
})
export class SentenceMaintenanceComponent extends PagedListingComponentBase<SentenceDto> {

  @Select(SentenceState.getSentences)
  sentences$: Observable<SearchResult<SentenceDto>>;

  sentences: SentenceDto[] = [];
  sentence = "";

  columns = [
    { prop: 'sentence', minxWidth: 100, maxWidth: 200 },
    { name: 'difficulty', minxWidth: 50, maxWidth: 100 },
    { name: 'word', minxWidth: 100, maxWidth: 200 },
    { name: 'translate' },
    { name: 'formattedCreationTime'},
    { name: 'Actions', prop: 'Id' }
  ];

  loadingIndicator:boolean = true;
  reorderable:boolean = true;
  SortType = SortType;
  ColumnMode = ColumnMode;

  constructor(
    injector: Injector,
    private _sentencesService: SentenceServiceProxy,
    private _modalService: BsModalService,
    private store: Store,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.breadcrumbService.set('@SentenceMaintenance', this.l("SentenceMaintenance"));
  }

  list(
    request: PagedSentencesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.sentence = this.sentence;

    this.store
      .dispatch(new Sentence.GetAll(request))
      .pipe(
        finalize(() => {
          finishedCallback();
          //subscribe sentences$ to get the result, then be able to call this.showPaging()
          //otherwise needn't subscribe sentences$, just use sentences$ @Select observable in html.
          this.sentences$.subscribe((result: SearchResult<SentenceDto>) => {
            this.sentences = result.items;
            this.showPaging(result, pageNumber);
          });
        })
      )
      .subscribe(() => {});
  }

  delete(sentence: SentenceDto): void {
    abp.message.confirm(
      this.l("SentenceDeleteWarningMessage", sentence.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this.store
            .dispatch(new Sentence.Delete(sentence.id))
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

  createSentence(): void {
    this.showCreateOrEditSentenceDialog();
  }

  editSentence(id: number): void {
    this.showCreateOrEditSentenceDialog(id);
  }

  showCreateOrEditSentenceDialog(id?: number): void {
    let createOrEditSentenceDialog: BsModalRef;
    if (!id) {
      createOrEditSentenceDialog = this._modalService.show(
        CreateSentenceDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditSentenceDialog = this._modalService.show(
        EditSentenceDialogComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditSentenceDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  checkRouteUrl() {
    return this.router.url == '/app/sentences/sentence-maintenance';
  }

}
