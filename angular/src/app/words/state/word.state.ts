import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  WordDtoPagedResultDto,
  WordDto,
  WordServiceProxy as WordService,
} from "../services/word.service";
import { Word } from "./word.actions";

export class WordStateModel {
  words: WordDtoPagedResultDto;
  word: WordDto;
}
@State<WordStateModel>({
  name: "words",
  defaults: {
    words: {},
    word: null
  } as WordStateModel,
})
@Injectable()
export class WordState {
  constructor(private wordService: WordService) {}

  @Selector()
  static getWords(state: WordStateModel) {
    return state.words || {};
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

  @Action(Word.Get)
  Get(ctx: StateContext<WordStateModel>, action: Word.Get) {
      return this.wordService
      .get(action.id)
      .pipe(
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

