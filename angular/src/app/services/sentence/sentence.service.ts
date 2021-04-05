import { mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import * as moment from 'moment';
import { blobToText, throwException, API_BASE_URL} from '@shared/service-proxies/service-proxies';
import SentenceDto from './sentence.model';
import SearchResult from "@shared/model/search-result";

@Injectable({
  providedIn: 'root'
})
export class SentenceServiceProxy {
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
    create(body: SentenceDto | undefined): Observable<SentenceDto> {
        let url_ = this.baseUrl + "/api/services/app/Sentence/Create";
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
                    return <Observable<SentenceDto>><any>throwError(e);
                }
            } else
                return <Observable<SentenceDto>><any>throwError(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<SentenceDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SentenceDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<SentenceDto>(<any>null);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    update(body: SentenceDto | undefined): Observable<SentenceDto> {
        let url_ = this.baseUrl + "/api/services/app/Sentence/Update";
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
                    return <Observable<SentenceDto>><any>throwError(e);
                }
            } else
                return <Observable<SentenceDto>><any>throwError(response_);
        }));
    }

    protected processUpdate(response: HttpResponseBase): Observable<SentenceDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SentenceDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<SentenceDto>(<any>null);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/services/app/Sentence/Delete?";
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
    get(id: number | undefined): Observable<SentenceDto> {
        let url_ = this.baseUrl + "/api/services/app/Sentence/Get?";
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
                    return <Observable<SentenceDto>><any>throwError(e);
                }
            } else
                return <Observable<SentenceDto>><any>throwError(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<SentenceDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = SentenceDto.fromJS(resultData200);
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<SentenceDto>(<any>null);
    }

    /**
     * @param sentence (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAll(sentence: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<SearchResult<SentenceDto>> {
        let url_ = this.baseUrl + "/api/services/app/Sentence/GetFilteredQuery?";
        if (sentence === null)
            throw new Error("The parameter 'sentence' cannot be null.");
        else if (sentence !== undefined)
            url_ += "Sentence=" + encodeURIComponent("" + sentence) + "&";
        if (sorting !== undefined)
            url_ += "Sorting=" + encodeURIComponent("" + sorting) + "&";
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
                    return <Observable<SearchResult<SentenceDto>>><any>throwError(e);
                }
            } else
                return <Observable<SearchResult<SentenceDto>>><any>throwError(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<SearchResult<SentenceDto>> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            let searchResult = new SearchResult<SentenceDto>();
            searchResult.items = resultData200["items"];
            searchResult.totalCount = resultData200["totalCount"];
            result200 = searchResult;
            return of(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(mergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return of<SearchResult<SentenceDto>>(<any>null);
    }
}
