import { FormGroup } from "@angular/forms";

export interface OptionFormlyField {
  label: string;
  value: string;
  _value?: any;
  checked?: boolean;
  indeterminate?: boolean;
  options?: OptionFormlyField[];
  [key: string]: any;
}

export interface FormlyField {
  value?: any;
  key?: string;
  hidden?: boolean;
  component?: any;
  customValidators?: any;
  asyncValidators?: any;
  _validators?: any;
  clearHidden?: boolean;
  validators?: {
    required?: any;
    min?: any;
    max?: any;
    minLength?: any;
    [key: string]: (model?: any, form?: FormGroup, formyField?: FormlyField) => any;
  },
  expressions?: {
    // hidden?: (model?: Object, form?: FormGroup, formyField?: FormlyField) => boolean;
    // disabled?: (model?: Object, form?: FormGroup, formyField?: FormlyField) => boolean;
    // required?: (model?: Object, form?: FormGroup, formyField?: FormlyField) => boolean;
    // props?: (model?: Object, form?: FormGroup, formyField?: FormlyField) => any;
    [key: string]: (model?: any, form?: FormGroup, formyField?: FormlyField) => any;
  }
  props: {
    className?: string;
    wrappClassName?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    readonly?: boolean;
    options?: OptionFormlyField[];
    keyLabel?: string;
    keyOptions?: string;
    keyValue?: string;
    [key: string]: any;
  }
  fields?: FormlyField[];
  change?: (model?: any, formState?: any, field?: FormlyField, option?:any) => void;

}

export interface InputFormlyField extends FormlyField{
  key: string;
}