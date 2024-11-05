import { InputTypeEnum } from '../enums/input-type.enum';
import { JsonForm } from '../models/json-form';

export class JsonFormDataConfig {
  static jsonFormOne: JsonForm = {
    controls: [
      {
        name: 'name',
        label: 'Имя',
        value: null,
        type: InputTypeEnum.InputText,
        validators: {
          required: true,
          minLength: 2,
        },
      },
      {
        name: 'age',
        label: 'Возраст',
        value: null,
        type: InputTypeEnum.InputNumber,
        validators: {
          required: true,
          min: 16,
        },
      },
      {
        name: 'maritalStatus',
        label: 'Семейное положение',
        value: null,
        type: InputTypeEnum.InputSelect,
        validators: {
          required: true,
        },
        selectOptions: [
          {
            id: 1,
            name: 'Не женат / не замужем',
            active: true,
          },
          {
            id: 2,
            name: 'Женат / замужем',
          },
        ],
      },
      {
        name: 'university',
        label: 'ВУЗ',
        value: null,
        descripton: 'Укажите заведения, в которых вы учились.',
        type: InputTypeEnum.InputText,
        validators: {
          minLength: 2,
        },
        inputTextItems: [null],
        modifier: {
          canAddControl: true,
        },
      },
      {
        name: 'skils',
        label: 'Навыки',
        value: null,
        type: InputTypeEnum.InputCheckbox,
        validators: {
          required: false,
        },
        checkboxItems: [
          {
            id: 1,
            name: 'Общение',
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
            id: 4,
            name: 'Быстрое чтение',
          },
          {
            id: 5,
            name: 'Самозащита',
          },
          {
            id: 6,
            name: 'Вождение',
          },
          {
            id: 7,
            name: 'Программирование',
          },
          {
            id: 8,
            name: 'Управление вертолетом',
          },
          {
            id: 9,
            name: 'Оперное пение',
          },
        ],
      },
    ],
  };
}
