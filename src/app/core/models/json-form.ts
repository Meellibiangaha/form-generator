import { InputTypeEnum } from '../enums/input-type.enum';
import { CheckboxItem } from './checkbox-item';
import { SelectOption } from './select-option';

export type JsonForm = {
  /** Id формы (анкеты) */
  id: number | null;
  /** контролы формы */
  controls: JsonFormControls[];
};

export type JsonFormControls = {
  /** control name */
  name: string;
  /** label */
  label: string;
  /** тип элемента управления формой */
  type: InputTypeEnum;
  /** валидаторы */
  validators: JsonFormValidators;
  /** значение для text/number */
  value?: string | number;
  /** использовал как summary text под инпутом текста */
  descripton?: string;
  /** placeholder */
  placeholder?: string;
  /** модификаторы */
  modifier?: JsonControlModifier;
  /** значения для селекта */
  selectOptions?: SelectOption[];
  /** значения для чекбоксов */
  checkboxItems?: CheckboxItem[];
  /** значения для текстового инпута, где можно создавать динамически контролы */
  inputTextItems?: string[];
};
export type JsonFormValidators = {
  /** обязательное поле (почемается в шаблоне '*') */
  required?: boolean;
  /** Минимальная длинна поля */
  minLength?: number;
  /** минимальное значение для input type="number" */
  min?: number;
  /** максимальное значение для input type="number" */
  max?: number;
};

export type JsonControlModifier = {
  /** для чекбокса */
  active?: boolean;
  /** для тектстового инпута (ВУЗ) */
  canAddControl?: boolean;
};
