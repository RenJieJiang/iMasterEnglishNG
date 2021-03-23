import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { WordServiceProxy as WordService } from "@app/services/word/word.service";
import WordDto from "@app/services/word/word.model";
import { Word } from "@app/store/actions/word.actions";
import SearchResult from "@app/shared/model/search-result";

export interface WordStateModel {
  searchResultData: SearchResult<WordDto>;
  word: WordDto;
}
@State<WordStateModel>({
  name: "words",
  defaults: {
    searchResultData: {},
    word: null,
  } as WordStateModel,
})
@Injectable()
export class WordState {
  constructor(private wordService: WordService) {}

  @Selector()
  static getWords(state: WordStateModel) {
    return state.searchResultData || {};
  }

  @Selector()
  static getWord(state: WordStateModel) {
    return state.word || {};
  }

  @Action(Word.GetAll)
  GetAll(ctx: StateContext<WordStateModel>, action: Word.GetAll) {
    return this.wordService
      .getAll(
        action.payload.word,
        action.payload.sorting,
        action.payload.skipCount,
        action.payload.maxResultCount
      )
      .pipe(
        tap((response) => {
          let page = response as SearchResult<WordDto>;

          ctx.patchState({
            searchResultData: page,
          });
        })
      );
  }

  @Action(Word.Get)
  Get(ctx: StateContext<WordStateModel>, action: Word.Get) {
    return this.wordService.get(action.id).pipe(
      tap((response) => {
        ctx.patchState({
          word: response,
        });
      })
    );
  }

  @Action(Word.Add)
  Add(ctx: StateContext<WordStateModel>, action: Word.Add) {
    return this.wordService.create(action.payload);
  }

  @Action(Word.Edit)
  Edit(ctx: StateContext<WordStateModel>, action: Word.Edit) {
    return this.wordService.update(action.payload);
  }

  @Action(Word.Delete)
  Delete(ctx: StateContext<WordStateModel>, action: Word.Delete) {
    return this.wordService.delete(action.id);
  }
}
