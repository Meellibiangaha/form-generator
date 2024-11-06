import { ChangeDetectionStrategy, Component, computed, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebFormService } from './web-form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JsonForm } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';
import { BaseValidationEnum } from '../../core/enums/base-validation.enum';
import { WebFormGenerateFormService } from './web-form-generate-form.service';

type updateWebFormDataOption = {
  isAdd: boolean;
  controlName: string;
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
    private router: Router,
  ) {}

  public IT = InputTypeEnum;
  public BVE = BaseValidationEnum;
  public formGroup: FormGroup = this.fb.group({});
  readonly webFormData = signal<JsonForm>(null);

  public submit(): void {
    console.log(this.formGroup.value);
    console.log(this.webFormData());
    if (this.formGroup.valid) {
      this.wformService
        .createForm(this.wformService.mapFilterToRequest(this.formGroup.getRawValue()))
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('home');
          },
          error: () => {
            // Какой-то алёрт выводим
          },
        });
    } else {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
    }
  }

  private updateWebFormData(option: updateWebFormDataOption): void {
    this.webFormData.update((form) => ({
      ...form,
      controls: form.controls.map((c) => {
        if (c.name === option.controlName) {
          return {
            ...c,
            // Если добавляем, вставляем inputTextItems только в нужное место
            inputTextItems: option.isAdd
              ? [...(c.inputTextItems ?? []), option.value]
              : c.inputTextItems.filter((_, i) => i !== option.index),
          };
        }
        return c; // Остальные контролы возвращаем без изменений
      }),
    }));
    this.updateWebFormDataValue();
  }

  private updateWebFormDataValue(): void {
    this.webFormData.update((form) => ({
      ...form,
      controls: form.controls.map((c) => ({
        ...c,
        value: this.formGroup.get(c.name)?.value ?? c.value,
      })),
    }));
  }

  addInputControl(controlName: string): void {
    const controlArray = this.formGroup.get(controlName) as FormArray;
    controlArray.push(this.fb.control(null));
    const addControlOption = {
      isAdd: true,
      controlName: controlName,
      value: null,
    } as updateWebFormDataOption;
    this.updateWebFormData(addControlOption);
  }

  removeInputControl(controlName: string, index: number): void {
    const controlArray = this.formGroup.get(controlName) as FormArray;
    const removeControlOption = {
      isAdd: false,
      controlName: controlName,
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
          const formArray = this.wfGenerateFormSevice.createFormArray(control, control.validators);
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
