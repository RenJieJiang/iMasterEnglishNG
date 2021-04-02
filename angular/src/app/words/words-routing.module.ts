import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChildOneComponent } from "./child-one/child-one.component";
import { WordMaintenanceComponent } from "./word-maintenance/word-maintenance.component";

const routes: Routes = [
  {
    path: "word-maintenance",
    component: WordMaintenanceComponent,
    data: { breadcrumb: { alias: "WordMaintenance" } },
    children: [
      {
        path: "child-one",
        component: ChildOneComponent,
        data: { breadcrumb: { alias: "ChildOne" } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
