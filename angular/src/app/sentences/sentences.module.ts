import { SentenceMaintenanceComponent } from './sentence-maintenance/sentence-maintenance.component';
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SentencesRoutingModule } from "./sentences-routing.module";
import { CreateSentenceDialogComponent } from "./create-sentence/create-sentence-dialog.component";
import { EditSentenceDialogComponent } from "./edit-sentence/edit-sentence-dialog.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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


@NgModule({
  declarations: [
    CreateSentenceDialogComponent,
    EditSentenceDialogComponent,
    SentenceMaintenanceComponent
  ],
  imports: [
    SharedModule,
    SentencesRoutingModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxDatatableModule,
    MatIconModule,
    BreadcrumbModule,
    DropdownModule,
  ]
})
export class SentencesModule { }
