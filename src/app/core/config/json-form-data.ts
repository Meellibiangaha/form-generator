import { InputTypeEnum } from '../enums/input-type.enum';
import { JsonForm } from '../models/json-form';

export class JsonFormDataConfig {
  static jsonFormOne: JsonForm = {
    controls: [
      {
        name: 'firstName',
        label: 'First name:',
        value: '',
        type: InputTypeEnum.InputText,
        validators: {
          required: true,
          minLength: 10,
        },
      },
      {
        name: 'lastName',
        label: 'Last name:',
        value: '',
        type: InputTypeEnum.InputText,
        validators: {},
      },

      {
        name: 'agreeTerms',
        label: 'This is a checkbox?',
        value: 'false',
        type: InputTypeEnum.InputCheckbox,
        validators: {},
      },
    ],
  };
}
