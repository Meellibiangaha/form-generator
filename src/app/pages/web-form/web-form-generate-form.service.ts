import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { BaseValidationEnum } from '../../core/enums/base-validation.enum';
import { JsonFormControls, JsonFormValidators } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';

@Injectable({
  providedIn: 'any',
})
export class WebFormGenerateFormService {
  constructor(private fb: FormBuilder) {}

  createFormArray(control: JsonFormControls, controlValidators: JsonFormValidators): FormArray<FormControl<any>> {
    switch (control.type) {
      case InputTypeEnum.InputCheckbox:
        return this.fb.array(
          control.checkboxItems.map((item) =>
            this.fb.control(item.checked ? item.id : null, this.createValidation(controlValidators)),
          ),
        );
      case InputTypeEnum.InputText:
        return this.fb.array(
          control.inputTextItems
          // [['text1], [text2]] -> [text1, text2]
            .join(' ')
            .split(' ')
            .map((item: string) => this.fb.control(item, this.createValidation(controlValidators))),
        );
      default:
        return this.fb.array(null);
    }
  }

  createValidation(controlValidators: JsonFormValidators): ValidatorFn[] {
    const validators = [];
    for (const [key, value] of Object.entries(controlValidators)) {
      switch (key) {
        case BaseValidationEnum.Min:
          validators.push(Validators.min(+value));
          break;
        case BaseValidationEnum.Max:
          validators.push(Validators.max(+value));
          break;
        case BaseValidationEnum.Required:
          if (value) {
            validators.push(Validators.required);
          }
          break;
        case BaseValidationEnum.MinLength:
          validators.push(Validators.minLength(+value));
          break;
        case BaseValidationEnum.Maxlength:
          validators.push(Validators.maxLength(+value));
          break;
        default:
          break;
      }
    }
    return validators;
  }
}
