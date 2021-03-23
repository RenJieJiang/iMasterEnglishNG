import { AppComponentBase } from '@shared/app-component-base';
import { Injector, OnInit } from '@angular/core';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export class PagedRequestDto {
    skipCount: number;
    maxResultCount: number;
    sorting:string;
}

export abstract class PagedListingComponentBase<TEntityDto> extends AppComponentBase implements OnInit {

    public pageSize = 5;
    public pageNumber = 1;
    public totalPages = 1;
    public totalItems: number;
    public sorting: string = "";
    public isTableLoading = false;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page: number): void {
        const req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        if (this.sorting.trim() != "") {
            req.sorting = this.sorting;
        }

        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
        });
    }

    public sortChange(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
        const req = new PagedRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (this.pageNumber - 1) * this.pageSize;

        if (sortInfo.sorts.length > 0) {
            const property = sortInfo.sorts[0].prop;
            const dir = sortInfo.sorts[0].dir
            if (sortInfo.sorts[0].dir != null) {
                req.sorting = property + " " + dir;
            } else {
                req.sorting = property;
            }
            this.sorting = req.sorting;
        }

        this.isTableLoading = true;
        this.list(req, this.pageNumber, () => {
            this.isTableLoading = false;
        });
    }

    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void;
    protected abstract delete(entity: TEntityDto): void;
}
