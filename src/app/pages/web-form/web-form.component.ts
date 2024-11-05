import { ChangeDetectionStrategy, Component, computed, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebFormService } from './web-form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JsonForm } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';
import { BaseValidationEnum } from '../../core/enums/base-validation.enum';
import { WebFormGenerateFormService } from './web-form-generate-form.service';

type updateWebFormDataOption = {
  isAdd: boolean;
  value?: string | null;
  index?: number;
};

@UntilDestroy()
@Component({
  selector: 'app-web-form',
  templateUrl: './web-form.component.html',
  styleUrl: './web-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebFormComponent implements OnInit {
  constructor(
    private wformService: WebFormService,
    private wfGenerateFormSevice: WebFormGenerateFormService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  public IT = InputTypeEnum;
  public BVE = BaseValidationEnum;
  public formGroup: FormGroup = this.fb.group({});
  readonly webFormData = signal<JsonForm>(null);

  public submit(): void {
    if (this.formGroup.valid) {
    } else {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
    }
    console.log('valid: ', this.formGroup.valid);
    console.log(this.formGroup.value);
  }

  private updateWebFormData(option: updateWebFormDataOption): void {
    if (option.isAdd) {
      this.webFormData.update((form) => {
        const newForm = {
          ...form,
          controls: form.controls.map((c) => ({
            ...c,
            inputTextItems:
              option.value === null || option.value
                ? [...(c.inputTextItems || []), option.value]
                : c.inputTextItems || [],
          })),
        };
        return newForm;
      });
    } else {
      this.webFormData.update((form) => {
        const newForm = {
          ...form,
          controls: form.controls.map((c) => ({
            ...c,
            inputTextItems: c.inputTextItems.filter((_, i) => i !== option.index)
          })),
        };
        return newForm;
      });
    }
  }

  addInputControl(arrayName: string): void {
    const controlArray = this.formGroup.get(arrayName) as FormArray;
    controlArray.push(this.fb.control(null));
    const addControlOption = {
      isAdd: true,
      value: null,
    } as updateWebFormDataOption;
    this.updateWebFormData(addControlOption);
  }

  removeInputControl(arrayName: string, index: number): void {
    const controlArray = this.formGroup.get(arrayName) as FormArray;
    const removeControlOption = {
      isAdd: false,
      index: index,
    };
    if (controlArray.length > 1) {
      controlArray.removeAt(index);
      this.updateWebFormData(removeControlOption);
    }
  }

  generateForm(webForm: JsonForm): void {
    for (const control of webForm.controls) {
      switch (control.type) {
        case InputTypeEnum.InputCheckbox:
          const formArray = this.fb.array(
            control.checkboxItems.map(() =>
              this.fb.control(null, this.wfGenerateFormSevice.createValidation(control.validators)),
            ),
          );
          this.formGroup.addControl(control.name, formArray);
          break;
        case InputTypeEnum.InputText:
          if (control?.modifier?.canAddControl) {
            const formArray = this.wfGenerateFormSevice.createFormArray(control, control.validators);
            this.formGroup.addControl(control.name, formArray);
          } else {
            this.formGroup.addControl(
              control.name,
              this.fb.control(control.value, this.wfGenerateFormSevice.createValidation(control.validators)),
            );
          }
          break;
        default:
          this.formGroup.addControl(
            control.name,
            this.fb.control(control.value, this.wfGenerateFormSevice.createValidation(control.validators)),
          );
          break;
      }
    }
  }
  public setUp(response: JsonForm): void {
    this.webFormData.set(response);
    this.generateForm(response);
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ webForm }) => this.setUp(webForm));
  }
}
