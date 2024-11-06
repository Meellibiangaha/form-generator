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
        placeholder: 'Введите ваше Имя',
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
        placeholder: 'Введите ваш возраст',
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
        placeholder: 'Например, ВолгГУ',
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
        type: InputTypeEnum.InputCheckbox,
        validators: {
          required: false,
        },
        checkboxItems: [
          {
            id: 1,
            name: 'Общение',
            checked: false,
          },
          {
            id: 2,
            name: 'Иностранные языки',
            checked: false,
          },
          {
            id: 3,
            name: 'Бег с препятствиями',
            checked: false,
          },
          {
            id: 4,
            name: 'Быстрое чтение',
            checked: false,
          },
          {
            id: 5,
            name: 'Самозащита',
            checked: false,
          },
          {
            id: 6,
            name: 'Вождение',
            checked: false,
          },
          {
            id: 7,
            name: 'Программирование',
            checked: false,
          },
          {
            id: 8,
            name: 'Управление вертолетом',
            checked: false,
          },
          {
            id: 9,
            name: 'Оперное пение',
            checked: false,
          },
        ],
      },
    ],
  };

  /** Уже заполненная */
  static jsonFormTwo: JsonForm = {
    controls: [
      {
        name: 'name',
        label: 'Имя',
        value: 'Иван',
        type: InputTypeEnum.InputText,
        placeholder: 'Введите ваше Имя',
        validators: {
          required: true,
          minLength: 2,
        },
      },
      {
        name: 'age',
        label: 'Возраст',
        value: 30,
        type: InputTypeEnum.InputNumber,
        placeholder: 'Введите ваш возраст',
        validators: {
          required: true,
          min: 16,
        },
      },
      {
        name: 'maritalStatus',
        label: 'Семейное положение',
        value: 1,
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
        placeholder: 'Например, ВолгГУ',
        type: InputTypeEnum.InputText,
        validators: {
          minLength: 2,
        },
        inputTextItems: ['ВолгГУ', 'Тест'],
        modifier: {
          canAddControl: true,
        },
      },
      {
        name: 'skils',
        label: 'Навыки',
        type: InputTypeEnum.InputCheckbox,
        validators: {
          required: false,
        },
        checkboxItems: [
          {
            id: 1,
            name: 'Общение',
            checked: false,
          },
          {
            id: 2,
            name: 'Иностранные языки',
            checked: true,
          },
          {
            id: 3,
            name: 'Бег с препятствиями',
            checked: true,
          },
          {
            id: 4,
            name: 'Быстрое чтение',
            checked: false,
          },
          {
            id: 5,
            name: 'Самозащита',
            checked: false,
          },
          {
            id: 6,
            name: 'Вождение',
            checked: false,
          },
          {
            id: 7,
            name: 'Программирование',
            checked: true,
          },
          {
            id: 8,
            name: 'Управление вертолетом',
            checked: false,
          },
          {
            id: 9,
            name: 'Оперное пение',
            checked: false,
          },
        ],
      },
    ],
  };
}
