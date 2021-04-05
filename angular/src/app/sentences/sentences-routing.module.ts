import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SentenceMaintenanceComponent } from "./sentence-maintenance/sentence-maintenance.component";

const routes: Routes = [
  {
    path: "sentence-maintenance",
    component: SentenceMaintenanceComponent,
    data: { breadcrumb: { alias: "SentenceMaintenance" } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentencesRoutingModule {}
