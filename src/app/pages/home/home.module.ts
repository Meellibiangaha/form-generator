import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TabBtnComponent } from '../../shared/tab-btn/tab-btn.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Главная' },
  {
    path: 'web-form',
    loadChildren: () =>
      import('../web-form/web-form.module').then(
        (m) => m.WebFormModule
      ),
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TabBtnComponent],
})
export class HomeModule {}
