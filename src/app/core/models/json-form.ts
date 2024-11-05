import { InputTypeEnum } from '../enums/input-type.enum';
import { CheckboxItem } from './checkbox-item';
import { SelectOption } from './select-option';

export type JsonForm = {
  controls: JsonFormControls[];
};

export type JsonFormControls = {
  name: string;
  label: string;
  value: string | number;
  type: InputTypeEnum;
  validators: JsonFormValidators;
  descripton?: string,
  modifier?: JsonControlModifier;
  selectOptions?: SelectOption[];
  checkboxItems?: CheckboxItem[];
  inputTextItems?: string[]
};
export type JsonFormValidators = {
  required?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
};

export type JsonControlModifier = {
  active?: boolean;
  canAddControl?: boolean;
};
