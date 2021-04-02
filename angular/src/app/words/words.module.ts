import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { WordsRoutingModule } from "./words-routing.module";
import { CreateWordDialogComponent } from "./create-word/create-word-dialog.component";
import { EditWordDialogComponent } from "./edit-word/edit-word-dialog.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChildOneComponent } from './child-one/child-one.component';
import { MatIconModule } from '@angular/material/icon';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { CarouselModule } from "ngx-bootstrap/carousel";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CardModule} from 'primeng/card';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PanelModule} from 'primeng/panel';
import {CalendarModule} from 'primeng/calendar';
import { WordMaintenanceComponent } from './word-maintenance/word-maintenance.component';

@NgModule({
  declarations: [
    CreateWordDialogComponent,
    EditWordDialogComponent,
    ChildOneComponent,
    WordMaintenanceComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule,
    WordsRoutingModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxDatatableModule,
    MatIconModule,
    BreadcrumbModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
    SplitButtonModule,
    SplitterModule,
    TabViewModule,
    ToolbarModule,
    ConfirmDialogModule,
    PanelModule,
    CalendarModule
  ],
})
export class WordsModule {}
