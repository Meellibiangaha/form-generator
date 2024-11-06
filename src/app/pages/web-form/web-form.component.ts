import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebFormService } from './web-form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JsonForm } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';
import { BaseValidationEnum } from '../../core/enums/base-validation.enum';
import { WebFormGenerateFormService } from './web-form-generate-form.service';
import { AppStorageService } from '../../core/services/app-storage.service';
import { WebFormModel } from './models/web-form.model';
import { CheckboxItem } from '../../core/models/checkbox-item';

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
    private storage: AppStorageService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  IT = InputTypeEnum;
  BVE = BaseValidationEnum;
  formGroup: FormGroup = this.fb.group({});
  readonly webFormData = signal<JsonForm>(null);
  readonly webFormId = signal<number>(null);
  selectAllCheckbox = signal<CheckboxItem>({ id: null, name: 'Выбрать все', checked: false });

  submit(): void {
    /** Логи для проверяющих */
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.wformService
        .createForm(this.wformService.convertFormToUploadModel(this.formGroup.getRawValue(), this.webFormId()))
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('home');
          },
          error: (error) => {
            // Какой-то алёрт выводим
            console.error(error);
          },
        });
    } else {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
    }
  }

  toggleAllCheckbox(controlName: string, items: CheckboxItem[]): void {
    /** Можно было сделать так, что мы проверяем, если один из всех чекбоксов не true
     *  То снимаем галочку с "Выбрать все"
     *  Но основная задача заключалась в генерации формы с бэка
     *  Решил не тратить время
     */
    const formArray = this.formGroup.get(controlName) as FormArray;
    if (!formArray) return;

    this.selectAllCheckbox.update((s) => ({ ...s, checked: !s.checked }));
    const allSelectedStatus = this.selectAllCheckbox().checked;

    // Переключаем состояние всех элементов на противоположное
    formArray.controls.forEach((control) => {
      control.setValue(allSelectedStatus);
    });

    // Получаем обновленные ID выбранных элементов
    const selectedIds = items
      .map((item, index) => (formArray.at(index).value ? item.id : null))
      .filter((id) => id !== null);

    // Обновляем значение формгруппы
    this.formGroup.patchValue({ skils: selectedIds });

    // Обновляем checked состояние для каждого элемента checkboxItems
    // Можно в updateWebFormData внести
    this.webFormData.update((form) => ({
      ...form,
      controls: form.controls.map((control) => {
        if (control.name === controlName) {
          return {
            ...control,
            checkboxItems: items.map((item, index) => ({
              ...item,
              checked: allSelectedStatus,
            })),
          };
        }
        return control;
      }),
    }));
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
  setUp(response: JsonForm): void {
    /** Логи для проверяющих */
    console.log('response', response);
    const storageFormValue = this.storage.getItem<WebFormModel>('WebForm') || null;
    this.webFormData.set(this.wformService.convertFormToLoadModel(response, storageFormValue));
    this.webFormId.set(response.id || null);
    this.generateForm(this.wformService.convertFormToLoadModel(response, storageFormValue));
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(({ webForm }) => this.setUp(webForm));
  }
}
