import { Injectable } from '@angular/core';
import { WebFormRepository } from './web-from.repository';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class WebFormService {
  constructor(private repository: WebFormRepository) {}
  loadForm(): Observable<any> {
    return this.repository.loadForm().pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      })
    );
  }

  getFakeForm(): Observable<any> {
    const result = null;
    return of(result);
  }
}
