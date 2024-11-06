import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { WebFormService } from './web-form.service';
import { JsonForm } from '../../core/models/json-form';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export const WebFormResolver: ResolveFn<JsonForm> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  webFormService: WebFormService = inject(WebFormService),
): Observable<JsonForm> => webFormService.loadForm(+route.params['id']);
