import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  WordDtoPagedResultDto,
  WordServiceProxy as WordService,
} from "../services/word.service";
import { Word } from "./word.actions";

export class WordStateModel {
  words: WordDtoPagedResultDto;
}
@State<WordStateModel>({
  name: "words",
  defaults: { words: {} } as WordStateModel,
})
@Injectable()
export class WordState {
  constructor(private wordService: WordService) {}

  @Selector()
  static getWords(state: WordStateModel) {
    return state.words || {};
  }

  @Action(Word.GetAll)
  GetAll(ctx: StateContext<WordStateModel>, action: Word.GetAll) {
    return this.wordService
      .getAll(
        action.payload.word,
        action.payload.skipCount,
        action.payload.maxResultCount
      )
      .pipe(
        tap((response) => {
          ctx.patchState({
            words: response,
          });
        })
      );
  }
}
