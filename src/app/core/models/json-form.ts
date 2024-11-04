import { InputTypeEnum } from '../enums/input-type.enum';
import { CheckboxItem } from './checkbox-item';
import { SelectOption } from './select-option';

export type JsonForm = {
  controls: JsonFormControls[];
};

export type JsonFormControls = {
  name: string;
  label: string;
  value: string;
  type: InputTypeEnum;
  validators: JsonFormValidators;
  descripton?: string,
  options?: JsonControlOptions;
  selectOptions?: SelectOption[];
  checkboxItems?: CheckboxItem[];
};
export type JsonFormValidators = {
  required?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
};

export type JsonControlOptions = {
  min: string;
  max: string;
  step: string;
  icon: string;
};
