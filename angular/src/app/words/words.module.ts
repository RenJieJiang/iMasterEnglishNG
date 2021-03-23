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

@NgModule({
  declarations: [
    WordsComponent,
    CreateWordDialogComponent,
    EditWordDialogComponent,
  ],
  imports: [
    SharedModule,
    WordsRoutingModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxDatatableModule
  ],
})
export class WordsModule {}
