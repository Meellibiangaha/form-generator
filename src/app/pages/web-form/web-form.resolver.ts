import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { WebFormService } from './web-form.service';
import { JsonForm } from '../../core/models/json-form';
import { Observable } from 'rxjs';

export const WebFormResolver: ResolveFn<JsonForm> = (): Observable<JsonForm> =>
  inject(WebFormService).loadForm();
