import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebFormComponent } from './web-form.component';
import { RouterModule, Routes } from '@angular/router';
import { WebFormResolver } from './web-form.resolver';
import { TestCheckboxComponent } from '../../shared/test-checkbox/test-checkbox.component';
import { TestInputComponent } from '../../shared/test-input/test-input.component';
import { TestNumberComponent } from '../../shared/test-number/test-number.component';
import { TestSelectComponent } from '../../shared/test-select/test-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from '../../shared/control-error/control-error.component';

const routes: Routes = [
  {
    path: '',
    component: WebFormComponent,
    title: 'Создать анкету',
    resolve: { webForm: WebFormResolver },
  },
  {
    path: ':id',
    component: WebFormComponent,
    title: 'Редактировать анкету',
    resolve: { webForm: WebFormResolver },
  },
];

@NgModule({
  declarations: [WebFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TestCheckboxComponent,
    TestInputComponent,
    TestNumberComponent,
    TestSelectComponent,
    ControlErrorComponent,
  ],
})
export class WebFormModule {}
