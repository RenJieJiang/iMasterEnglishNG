import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsComponent } from './words.component';
//import { ApplicationLayoutComponent } from '@abp/ng.theme.basic';

const routes: Routes = [{ path: '', component: WordsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
