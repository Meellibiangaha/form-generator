import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebFormService } from './web-form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JsonForm } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';
import { BaseValidationEnum } from '../../core/enums/base-validation.enum';

@UntilDestroy()
@Component({
  selector: 'app-web-form',
  templateUrl: './web-form.component.html',
  styleUrl: './web-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebFormComponent implements OnInit {
  constructor(
    private webFormService: WebFormService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  public IT = InputTypeEnum;
  public BVE = BaseValidationEnum;
  public formGroup: FormGroup = this.fb.group({});
  readonly webFormData = signal<JsonForm>(null);

  get skilsArray(): FormArray | null {
    return this.formGroup.get('skils') as FormArray;
  }

  public submit(): void {
    if (this.formGroup.valid) {
    } else {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
    }
    console.log('valid: ', this.formGroup.valid);
    console.log(this.formGroup.value);
  }

  generateForm(webForm: JsonForm): void {
    this.webFormData.set(webForm);

    for (const control of webForm.controls) {
      if (control.type === this.IT.InputCheckbox) {
        const formArray = this.fb.array(
          control.checkboxItems.map(() => this.fb.control(null))
        );
        this.formGroup.addControl(control.name, formArray);
      } else {
        const validators = [];
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case this.BVE.Min:
              validators.push(Validators.min(+value));
              break;
            case this.BVE.Max:
              validators.push(Validators.max(+value));
              break;
            case this.BVE.Required:
              if (value) {
                validators.push(Validators.required);
              }
              break;
            case this.BVE.MinLength:
              validators.push(Validators.minLength(+value));
              break;
            case this.BVE.Maxlength:
              validators.push(Validators.maxLength(+value));
              break;
              // case 'pattern':
              //   validators.push(Validators.pattern(value));
              //   break;
              // case 'nullValidator':
              //   if (value) {
              //     validators.push(Validators.nullValidator);
              //   }
              break;
            default:
              break;
          }
        }
        this.formGroup.addControl(
          control.name,
          this.fb.control(control.value, validators)
        );
      }
    }
  }
  public setUp(response: JsonForm): void {
    this.generateForm(response);
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe(({ webForm }) => this.setUp(webForm));
  }
}
