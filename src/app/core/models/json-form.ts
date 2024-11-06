import { InputTypeEnum } from '../enums/input-type.enum';
import { CheckboxItem } from './checkbox-item';
import { SelectOption } from './select-option';

export type JsonForm = {
  controls: JsonFormControls[];
};

export type JsonFormControls = {
  name: string;
  label: string;
  type: InputTypeEnum;
  validators: JsonFormValidators;
  value?: string | number;
  descripton?: string;
  placeholder?: string;
  modifier?: JsonControlModifier;
  selectOptions?: SelectOption[];
  checkboxItems?: CheckboxItem[];
  inputTextItems?: string[];
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
