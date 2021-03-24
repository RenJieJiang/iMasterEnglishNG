import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { WordsRoutingModule } from "./words-routing.module";
import { WordsComponent } from "./words.component";
import { CreateWordDialogComponent } from "./create-word/create-word-dialog.component";
import { EditWordDialogComponent } from "./edit-word/edit-word-dialog.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChildOneComponent } from './child-one/child-one.component';
import { MatIconModule } from '@angular/material/icon';
import {BreadcrumbModule} from 'xng-breadcrumb';

@NgModule({
  declarations: [
    WordsComponent,
    CreateWordDialogComponent,
    EditWordDialogComponent,
    ChildOneComponent,
  ],
  imports: [
    SharedModule,
    WordsRoutingModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxDatatableModule,
    MatIconModule,
    BreadcrumbModule
  ],
})
export class WordsModule {}
