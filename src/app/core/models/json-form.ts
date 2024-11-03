import { InputTypeEnum } from '../enums/input-type.enum';

export type JsonForm = {
  controls: JsonFormControls[];
};

export type JsonFormControls = {
  name: string;
  label: string;
  value: string;
  type: InputTypeEnum;
  options?: JsonControlOptions;
  validators: JsonFormValidators;
};
export type JsonFormValidators = {
  required?: boolean;
  minLength?: number;
};

export type JsonControlOptions = {
  min: string;
  max: string;
  step: string;
  icon: string;
}
