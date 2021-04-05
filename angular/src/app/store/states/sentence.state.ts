import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { SentenceServiceProxy as SentenceService } from "@app/services/sentence/sentence.service";
import SentenceDto from "@app/services/sentence/sentence.model";
import { Sentence } from "@app/store/actions/sentence.actions";
import SearchResult from "@app/shared/model/search-result";

export interface SentenceStateModel {
  searchResultData: SearchResult<SentenceDto>;
  sentence: SentenceDto;
}
@State<SentenceStateModel>({
  name: "sentences",
  defaults: {
    searchResultData: {},
    sentence: null,
  } as SentenceStateModel,
})
@Injectable()
export class SentenceState {
  constructor(private sentenceService: SentenceService) {}

  @Selector()
  static getSentences(state: SentenceStateModel) {
    return state.searchResultData || {};
  }

  @Selector()
  static getSentence(state: SentenceStateModel) {
    return state.sentence || {};
  }

  @Action(Sentence.GetAll)
  GetAll(ctx: StateContext<SentenceStateModel>, action: Sentence.GetAll) {
    return this.sentenceService
      .getAll(
        action.payload.sentence,
        action.payload.sorting,
        action.payload.skipCount,
        action.payload.maxResultCount
      )
      .pipe(
        tap((response) => {
          let page = response as SearchResult<SentenceDto>;

          ctx.patchState({
            searchResultData: page,
          });
        })
      );
  }

  @Action(Sentence.Get)
  Get(ctx: StateContext<SentenceStateModel>, action: Sentence.Get) {
    return this.sentenceService.get(action.id).pipe(
      tap((response) => {
        ctx.patchState({
          sentence: response,
        });
      })
    );
  }

  @Action(Sentence.Add)
  Add(ctx: StateContext<SentenceStateModel>, action: Sentence.Add) {
    return this.sentenceService.create(action.payload);
  }

  @Action(Sentence.Edit)
  Edit(ctx: StateContext<SentenceStateModel>, action: Sentence.Edit) {
    return this.sentenceService.update(action.payload);
  }

  @Action(Sentence.Delete)
  Delete(ctx: StateContext<SentenceStateModel>, action: Sentence.Delete) {
    return this.sentenceService.delete(action.id);
  }
}
