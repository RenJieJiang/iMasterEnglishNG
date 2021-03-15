import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as moment from 'moment';
import { blobToText, throwException, API_BASE_URL} from './service-proxies';

@Injectable()
export class WordServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param body (optional)
     * @return Success
     */
    create(body: CreateWordDto | undefined): Observable<WordDto> {
        let url_ = this.baseUrl + "/api/services/app/Word/Create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WordDto>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WordDto>(<any>null);
    }

    /**
     * @param permission (optional)
     * @return Success
     */
    getWords(permission: string | undefined): Observable<WordListDtoListResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Word/GetWords?";
        if (permission === null)
            throw new Error("The parameter 'permission' cannot be null.");
        else if (permission !== undefined)
            url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetWords(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetWords(<any>response_);
                } catch (e) {
                    return <Observable<WordListDtoListResultDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WordListDtoListResultDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetWords(response: HttpResponseBase): Observable<WordListDtoListResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordListDtoListResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WordListDtoListResultDto>(<any>null);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    update(body: WordDto | undefined): Observable<WordDto> {
        let url_ = this.baseUrl + "/api/services/app/Word/Update";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WordDto>><any>_observableThrow(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WordDto>(<any>null);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Word/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    // /**
    //  * @return Success
    //  */
    // getAllPermissions(): Observable<PermissionDtoListResultDto> {
    //     let url_ = this.baseUrl + "/api/services/app/Word/GetAllPermissions";
    //     url_ = url_.replace(/[?&]$/, "");

    //     let options_ : any = {
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processGetAllPermissions(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processGetAllPermissions(<any>response_);
    //             } catch (e) {
    //                 return <Observable<PermissionDtoListResultDto>><any>_observableThrow(e);
    //             }
    //         } else
    //             return <Observable<PermissionDtoListResultDto>><any>_observableThrow(response_);
    //     }));
    // }

    // protected processGetAllPermissions(response: HttpResponseBase): Observable<PermissionDtoListResultDto> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = PermissionDtoListResultDto.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf<PermissionDtoListResultDto>(<any>null);
    // }

    /**
     * @param id (optional)
     * @return Success
     */
    // getWordForEdit(id: number | undefined): Observable<GetWordForEditOutput> {
    //     let url_ = this.baseUrl + "/api/services/app/Word/GetWordForEdit?";
    //     if (id === null)
    //         throw new Error("The parameter 'id' cannot be null.");
    //     else if (id !== undefined)
    //         url_ += "Id=" + encodeURIComponent("" + id) + "&";
    //     url_ = url_.replace(/[?&]$/, "");

    //     let options_ : any = {
    //         observe: "response",
    //         responseType: "blob",
    //         headers: new HttpHeaders({
    //             "Accept": "text/plain"
    //         })
    //     };

    //     return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
    //         return this.processGetWordForEdit(response_);
    //     })).pipe(_observableCatch((response_: any) => {
    //         if (response_ instanceof HttpResponseBase) {
    //             try {
    //                 return this.processGetWordForEdit(<any>response_);
    //             } catch (e) {
    //                 return <Observable<GetWordForEditOutput>><any>_observableThrow(e);
    //             }
    //         } else
    //             return <Observable<GetWordForEditOutput>><any>_observableThrow(response_);
    //     }));
    // }

    // protected processGetWordForEdit(response: HttpResponseBase): Observable<GetWordForEditOutput> {
    //     const status = response.status;
    //     const responseBlob =
    //         response instanceof HttpResponse ? response.body :
    //         (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    //     let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    //     if (status === 200) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         let result200: any = null;
    //         let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
    //         result200 = GetWordForEditOutput.fromJS(resultData200);
    //         return _observableOf(result200);
    //         }));
    //     } else if (status !== 200 && status !== 204) {
    //         return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
    //         return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    //         }));
    //     }
    //     return _observableOf<GetWordForEditOutput>(<any>null);
    // }

    /**
     * @param id (optional)
     * @return Success
     */
    get(id: number | undefined): Observable<WordDto> {
        let url_ = this.baseUrl + "/api/services/app/Word/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WordDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WordDto>(<any>null);
    }

    /**
     * @param word (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(word: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<WordDtoPagedResultDto> {
        let url_ = this.baseUrl + "/api/services/app/Word/GetAll?";
        if (word === null)
            throw new Error("The parameter 'word' cannot be null.");
        else if (word !== undefined)
            url_ += "Word=" + encodeURIComponent("" + word) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<WordDtoPagedResultDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<WordDtoPagedResultDto>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<WordDtoPagedResultDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDtoPagedResultDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<WordDtoPagedResultDto>(<any>null);
    }
}

export class WordDto implements IWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  id: number;

  constructor(data?: IWordDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.word = data["word"];
          this.frequency = data["frequency"];
          this.phoneticSymbol = data["phoneticSymbol"];
          this.definition = data["definition"];
          this.synonym = data["synonym"];
          this.antonym = data["antonym"];
          this.remarks = data["remarks"];
          if (Array.isArray(data["grantedPermissions"])) {
              this.grantedPermissions = [] as any;
              for (let item of data["grantedPermissions"])
                  this.grantedPermissions.push(item);
          }
          this.id = data["id"];
      }
  }

  static fromJS(data: any): WordDto {
      data = typeof data === 'object' ? data : {};
      let result = new WordDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word;
      data["frequency"] = this.frequency;
      data["phoneticSymbol"] = this.phoneticSymbol;
      data["definition"] = this.definition;
      data["synonym"] = this.synonym;
      data["antonym"] = this.antonym;
      data["remarks"] = this.remarks;
      if (Array.isArray(this.grantedPermissions)) {
          data["grantedPermissions"] = [];
          for (let item of this.grantedPermissions)
              data["grantedPermissions"].push(item);
      }
      data["id"] = this.id;
      return data;
  }

  clone(): WordDto {
      const json = this.toJSON();
      let result = new WordDto();
      result.init(json);
      return result;
  }
}

export interface IWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
  id: number;
}

export class WordListDto implements IWordListDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  creationTime: moment.Moment;
  id: number;

  constructor(data?: IWordListDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
        this.word = data["word"];
        this.frequency = data["frequency"];
        this.phoneticSymbol = data["phoneticSymbol"];
        this.definition = data["definition"];
        this.creationTime = data["creationTime"] ? moment(data["creationTime"].toString()) : <any>undefined;
        this.id = data["id"];
      }
  }

  static fromJS(data: any): WordListDto {
      data = typeof data === 'object' ? data : {};
      let result = new WordListDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word;
      data["frequency"] = this.frequency;
      data["phoneticSymbol"] = this.phoneticSymbol;
      data["definition"] = this.definition;
      data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
      data["id"] = this.id;
      return data;
  }

  clone(): WordListDto {
      const json = this.toJSON();
      let result = new WordListDto();
      result.init(json);
      return result;
  }
}

export interface IWordListDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  creationTime: moment.Moment;
  id: number;
}

export class WordListDtoListResultDto implements IWordListDtoListResultDto {
  items: WordDto[] | undefined;

  constructor(data?: IWordListDtoListResultDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          if (Array.isArray(data["items"])) {
              this.items = [] as any;
              for (let item of data["items"])
                  this.items.push(WordDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): WordListDtoListResultDto {
      data = typeof data === 'object' ? data : {};
      let result = new WordListDtoListResultDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }

  clone(): WordListDtoListResultDto {
      const json = this.toJSON();
      let result = new WordListDtoListResultDto();
      result.init(json);
      return result;
  }
}

export interface IWordListDtoListResultDto {
  items: WordDto[] | undefined;
}

export class CreateWordDto implements ICreateWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;

  constructor(data?: ICreateWordDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.word = data["word"];
          this.frequency = data["frequency"];
          this.phoneticSymbol = data["phoneticSymbol"];
          this.definition = data["definition"];
          this.synonym = data["synonym"];
          this.antonym = data["antonym"];
          this.remarks = data["remarks"];
          if (Array.isArray(data["grantedPermissions"])) {
              this.grantedPermissions = [] as any;
              for (let item of data["grantedPermissions"])
                  this.grantedPermissions.push(item);
          }
      }
  }

  static fromJS(data: any): CreateWordDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateWordDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word;
      data["frequency"] = this.frequency;
      data["phoneticSymbol"] = this.phoneticSymbol;
      data["definition"] = this.definition;
      data["synonym"] = this.synonym;
      data["antonym"] = this.antonym;
      data["remarks"] = this.remarks;
      if (Array.isArray(this.grantedPermissions)) {
          data["grantedPermissions"] = [];
          for (let item of this.grantedPermissions)
              data["grantedPermissions"].push(item);
      }
      return data;
  }

  clone(): CreateWordDto {
      const json = this.toJSON();
      let result = new CreateWordDto();
      result.init(json);
      return result;
  }
}

export interface ICreateWordDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  grantedPermissions: string[] | undefined;
}

export class WordEditDto implements IWordEditDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  id: number;

  constructor(data?: IWordEditDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
        this.word = data["word"];
        this.frequency = data["frequency"];
        this.phoneticSymbol = data["phoneticSymbol"];
        this.definition = data["definition"];
        this.synonym = data["synonym"];
        this.antonym = data["antonym"];
        this.remarks = data["remarks"];
        this.id = data["id"];
      }
  }

  static fromJS(data: any): WordEditDto {
      data = typeof data === 'object' ? data : {};
      let result = new WordEditDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word;
      data["frequency"] = this.frequency;
      data["phoneticSymbol"] = this.phoneticSymbol;
      data["definition"] = this.definition;
      data["synonym"] = this.synonym;
      data["antonym"] = this.antonym;
      data["remarks"] = this.remarks;
      data["id"] = this.id;
      return data;
  }

  clone(): WordEditDto {
      const json = this.toJSON();
      let result = new WordEditDto();
      result.init(json);
      return result;
  }
}

export interface IWordEditDto {
  word: string | undefined;
  frequency: number | undefined;
  phoneticSymbol: string | undefined;
  definition: string | undefined;
  synonym: string | undefined;
  antonym: string | undefined;
  remarks: string | undefined;
  id: number;
}

export class GetWordForEditOutput implements IGetWordForEditOutput {
  word: WordEditDto;
  //permissions: FlatPermissionDto[] | undefined;
  grantedPermissionNames: string[] | undefined;

  constructor(data?: IGetWordForEditOutput) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.word = data["word"] ? WordEditDto.fromJS(data["word"]) : <any>undefined;
          // if (Array.isArray(data["permissions"])) {
          //     this.permissions = [] as any;
          //     for (let item of data["permissions"])
          //         this.permissions.push(FlatPermissionDto.fromJS(item));
          // }
          if (Array.isArray(data["grantedPermissionNames"])) {
              this.grantedPermissionNames = [] as any;
              for (let item of data["grantedPermissionNames"])
                  this.grantedPermissionNames.push(item);
          }
      }
  }

  static fromJS(data: any): GetWordForEditOutput {
      data = typeof data === 'object' ? data : {};
      let result = new GetWordForEditOutput();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["word"] = this.word ? this.word.toJSON() : <any>undefined;
      // if (Array.isArray(this.permissions)) {
      //     data["permissions"] = [];
      //     for (let item of this.permissions)
      //         data["permissions"].push(item.toJSON());
      // }
      if (Array.isArray(this.grantedPermissionNames)) {
          data["grantedPermissionNames"] = [];
          for (let item of this.grantedPermissionNames)
              data["grantedPermissionNames"].push(item);
      }
      return data;
  }

  clone(): GetWordForEditOutput {
      const json = this.toJSON();
      let result = new GetWordForEditOutput();
      result.init(json);
      return result;
  }
}

export interface IGetWordForEditOutput {
  word: WordEditDto;
  //permissions: FlatPermissionDto[] | undefined;
  grantedPermissionNames: string[] | undefined;
}

export class WordDtoPagedResultDto implements IWordDtoPagedResultDto {
  totalCount: number;
  items: WordDto[] | undefined;

  constructor(data?: IWordDtoPagedResultDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.totalCount = data["totalCount"];
          if (Array.isArray(data["items"])) {
              this.items = [] as any;
              for (let item of data["items"])
                  this.items.push(WordDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): WordDtoPagedResultDto {
      data = typeof data === 'object' ? data : {};
      let result = new WordDtoPagedResultDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["totalCount"] = this.totalCount;
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }

  clone(): WordDtoPagedResultDto {
      const json = this.toJSON();
      let result = new WordDtoPagedResultDto();
      result.init(json);
      return result;
  }
}

export interface IWordDtoPagedResultDto {
  totalCount: number;
  items: WordDto[] | undefined;
}

