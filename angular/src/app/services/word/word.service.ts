import { mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as moment from 'moment';
import { blobToText, throwException, API_BASE_URL} from '@shared/service-proxies/service-proxies';
import WordDto from './word.model';
import SearchResult from "@app/shared/model/search-result";

@Injectable({
  providedIn: 'root'
})
export class WordServiceProxy {
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(private http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @param body (optional)
     * @return Success
     */
    create(body: WordDto | undefined): Observable<WordDto> {
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

        return this.http.request("post", url_, options_).pipe(mergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(catchError((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>throwError(e);
                }
            } else
                return <Observable<WordDto>><any>throwError(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<WordDto>(<any>null);
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

        return this.http.request("put", url_, options_).pipe(mergeMap((response_ : any) => {
            return this.processUpdate(response_);
        })).pipe(catchError((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdate(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>throwError(e);
                }
            } else
                return <Observable<WordDto>><any>throwError(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<WordDto>(<any>null);
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

        return this.http.request("delete", url_, options_).pipe(mergeMap((response_ : any) => {
            return this.processDelete(response_);
        })).pipe(catchError((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>throwError(e);
                }
            } else
                return <Observable<void>><any>throwError(response_);
        }));
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return of<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<void>(<any>null);
    }

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

        return this.http.request("get", url_, options_).pipe(mergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(catchError((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<WordDto>><any>throwError(e);
                }
            } else
                return <Observable<WordDto>><any>throwError(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<WordDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = WordDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<WordDto>(<any>null);
    }

    /**
     * @param word (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(word: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<SearchResult<WordDto>> {
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
        return this.http.request("get", url_, options_)
        .pipe(mergeMap((response_ : any) => {
            return this.processGetAll(response_);
        }))
        .pipe(catchError((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    const a = this.processGetAll(<any>response_);
                    return a;
                } catch (e) {
                    return <Observable<SearchResult<WordDto>>><any>throwError(e);
                }
            } else
                return <Observable<SearchResult<WordDto>>><any>throwError(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<SearchResult<WordDto>> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            let searchResult = new SearchResult<WordDto>();
            searchResult.items = resultData200["items"];
            searchResult.totalCount = resultData200["totalCount"];
            result200 = searchResult;
            console.log(result200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<SearchResult<WordDto>>(<any>null);
    }
}

// export class WordDtoPagedResultDto implements IWordDtoPagedResultDto {
//   totalCount: number;
//   items: WordDto[] | undefined;

//   constructor(data?: IWordDtoPagedResultDto) {
//       if (data) {
//           for (var property in data) {
//               if (data.hasOwnProperty(property))
//                   (<any>this)[property] = (<any>data)[property];
//           }
//       }
//   }

//   init(data?: any) {
//       if (data) {
//           this.totalCount = data["totalCount"];
//           if (Array.isArray(data["items"])) {
//               this.items = [] as any;
//               for (let item of data["items"])
//                   this.items.push(WordDto.fromJS(item));
//           }
//       }
//   }

//   static fromJS(data: any): WordDtoPagedResultDto {
//     console.log('entered fromJS');
//       data = typeof data === 'object' ? data : {};
//       let result = new WordDtoPagedResultDto();
//       result.init(data);
//       return result;
//   }

//   toJSON(data?: any) {
//     console.log('entered toJSON');
//       data = typeof data === 'object' ? data : {};
//       data["totalCount"] = this.totalCount;
//       if (Array.isArray(this.items)) {
//           data["items"] = [];
//           for (let item of this.items)
//               data["items"].push(item.toJSON());
//       }
//       return data;
//   }

//   clone(): WordDtoPagedResultDto {
//     console.log('entered clone');
//       const json = this.toJSON();
//       let result = new WordDtoPagedResultDto();
//       result.init(json);
//       return result;
//   }
// }

// export interface IWordDtoPagedResultDto {
//   totalCount: number;
//   items: WordDto[] | undefined;
// }

