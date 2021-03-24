import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WordsComponent } from "./words.component";
import { ChildOneComponent } from "./child-one/child-one.component";

const routes: Routes = [
  {
    path: "",
    component: WordsComponent,
    children: [
      {
        path: "child-one",
        component: ChildOneComponent,
        data: { breadcrumb: {alias: 'ChildOne'} },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
