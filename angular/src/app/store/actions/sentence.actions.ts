export namespace Sentence {

  export class GetAll {
    static readonly type = '[Sentence] Get All';
    constructor(public payload: any) { }
  }

  export class Get {
    static readonly type = '[Sentence] Get';
    constructor(public id: number) { }
  }

  export class Add {
    static readonly type = '[Sentence] Add';
    constructor(public payload: any) {}
  }

  export class Edit {
    static readonly type = '[Sentence] Edit';
    constructor(public payload: any) {}
  }

  export class Delete {
    static readonly type = '[Sentence] Delete';
    constructor(public id: number) {}
  }
}
