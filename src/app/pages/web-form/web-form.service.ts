import { Injectable } from '@angular/core';
import { WebFormRepository } from './web-from.repository';
import { catchError, Observable, of, throwError } from 'rxjs';
import { JsonForm } from '../../core/models/json-form';
import { WebFormModel } from './models/web-form.model';
import { FormGroup } from '@angular/forms';
import { AppStorageService } from '../../core/services/app-storage.service';
import { InputTypeEnum } from '../../core/enums/input-type.enum';
import { WebFormControlName } from './models/web-from-control-name.enum';

@Injectable({
  providedIn: 'any',
})
export class WebFormService {
  constructor(private repository: WebFormRepository) {}
  loadForm(webFormId: number): Observable<JsonForm> {
    return this.repository.loadForm(webFormId).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      }),
    );
  }
  createForm(webForm: Partial<WebFormModel>): Observable<{ id: number }> {
    return this.repository.createForm(webForm).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      }),
    );
  }
  convertFormToUploadModel(form: Partial<WebFormModel>, formId: number): Partial<WebFormModel> {
    const result = {
      id: formId ?? 2,
      name: form.name,
      age: form.age,
      maritalStatus: form.maritalStatus,
      skils: form.skils.filter((s) => s),
      university: form.university.filter((s) => s),
    };
    return result;
  }

  convertFormToLoadModel(form: JsonForm, formValue: Partial<WebFormModel>): JsonForm {
    if (form?.id === formValue?.id) {
      /** Проходимся по jsonForm и вставляем значения со стореджа
       * Я постарался максимально всё типизировать и написать enum'ы
       */
      const updatedControls = form.controls.map((control) => {
        const updatedControl = { ...control };

        switch (control.name) {
          case WebFormControlName.Name:
            updatedControl.value = formValue.name;
            break;
          case WebFormControlName.Age:
            updatedControl.value = formValue.age;
            break;
          case WebFormControlName.MaritalStatus:
            updatedControl.value = formValue.maritalStatus;
            break;
          case WebFormControlName.Skils:
            if (formValue.skils && control.type === InputTypeEnum.InputCheckbox) {
              updatedControl.checkboxItems = control.checkboxItems?.map((item) => ({
                ...item,
                checked: formValue.skils.includes(item.id),
              }));
            }
            break;
          case WebFormControlName.University:
            if (formValue.university && control.type === InputTypeEnum.InputText) {
              updatedControl.inputTextItems = formValue.university;
            }
            break;
          default:
            break;
        }

        return updatedControl;
      });

      return { ...form, controls: updatedControls };
    } else {
      return form;
    }
  }
}
