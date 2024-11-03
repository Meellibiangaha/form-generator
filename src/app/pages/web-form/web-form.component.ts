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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SelectOption } from '../../core/models/select-option';
import { CheckboxItem } from '../../core/models/checkbox-item';
import { JsonForm } from '../../core/models/json-form';
import { InputTypeEnum } from '../../core/enums/input-type.enum';

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
  public formGroup: FormGroup = this.fb.group({});
  public webFormData?: JsonForm ;

  public selectOptions = signal<SelectOption[]>([
    { id: 1, name: 'value1' },
    { id: 2, name: 'value2' },
  ]);
  public checkboxItems = signal<CheckboxItem[]>([
    {
      id: 1,
      name: 'Общение',
      checked: true,
    },
    {
      id: 2,
      name: 'Иностранные языки',
    },
    {
      id: 3,
      name: 'Бег с препятствиями',
    },
    {
      id: 1,
      name: 'Общение',
      checked: true,
    },
    {
      id: 2,
      name: 'Иностранные языки',
    },
    {
      id: 3,
      name: 'Бег с препятствиями',
    },
    {
      id: 1,
      name: 'Общение',
      checked: true,
    },
    {
      id: 2,
      name: 'Иностранные языки',
    },
    {
      id: 3,
      name: 'Бег с препятствиями',
    },
  ]);
  generateForm(webForm: JsonForm): void {
    this.webFormData = webForm;
    for (const control of webForm.controls) {
      const validators = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validators.push(Validators.min(+value));
        }
      }
      this.formGroup.addControl(
        control.name,
        this.fb.control(control.value, validators)
      );
    }
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.data);
    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe(({ webForm }) => this.generateForm(webForm));
  }
}
