export namespace Word {

  export class GetAll {
    static readonly type = '[Word] Get All';
    constructor(public payload: any) { }
  }

  export class Get {
    static readonly type = '[Word] Get';
    constructor(public id: number) { }
  }

  export class Add {
    static readonly type = '[Word] Add';
    constructor(public payload: any) {}
  }

  export class Edit {
    static readonly type = '[Word] Edit';
    constructor(public payload: any) {}
  }

  export class Delete {
    static readonly type = '[Word] Delete';
    constructor(public id: number) {}
  }
}
