import { FormGroup, Validators } from "@angular/forms";
import { FormlyField } from "../models/formly-field.interface";

export const checkFieldsExpressions = (fields: FormlyField[], model: any, form: FormGroup, fieldId:string) => {
  if(fields){
    fields.forEach((formyField:FormlyField) => {
      if(formyField.key){
        const field = form.get(formyField.key);
        if(formyField.expressions){

          if(formyField.expressions?.["hidden"]){
            if(formyField.expressions?.["hidden"](model, form, formyField)){
              field?.disable();
              formyField.hidden = true;
            } else {
              field?.enable();
              formyField.hidden = false;
            }
          }

          if(!formyField.hidden){
            if(formyField.expressions?.["disabled"]){
              if(formyField.expressions?.["disabled"](model, form, formyField)){
                field?.disable();
              } else {
                field?.enable();
              }
            }
          } else {
            if (formyField.clearHidden && field?.value){
              field?.setValue(null);
            }
          }
        }
        if(formyField.validators){
          field?.clearValidators();
          field?.clearAsyncValidators();
          if(!formyField.hidden){
            for(let key in formyField?.validators){
              let value;
              if(typeof formyField.validators?.[key] === 'function'){
                value = formyField.validators?.[key](model, form, formyField);
              } else {
                value = formyField.validators?.[key];
              }
              if(!formyField._validators){
                formyField._validators = {}
              }
              formyField._validators[key] = value;

              if(value){
                if(formyField.customValidators?.[key]){
                  field?.addValidators(formyField.customValidators[key](value));
                } else if(formyField.asyncValidators?.[key]){
                  if(fieldId === formyField.id){
                    field?.addAsyncValidators(formyField.asyncValidators[key](value));
                  }
                } else {
                  if(key === 'required'){
                    field?.addValidators(Validators.required);
                  } else {
                    field?.addValidators((Validators as any)[key](value));
                  }
                }
              }
            }
          }
      }
      field?.updateValueAndValidity();
      } else {

        if(formyField.expressions?.["hidden"]){
          if(formyField.expressions?.["hidden"](model, form, formyField)){
            formyField.hidden = true;
            if(formyField.fields){
              for(let nestedField of formyField.fields){
                if(nestedField.key){
                  const fieldControl = form.controls[nestedField.key]
                  fieldControl?.disable();
                }
              }
            }
          } else {
            formyField.hidden = false;
            if(formyField.fields){
              for(let nestedField of formyField.fields){
                if(nestedField.key){
                  const fieldControl = form.controls[nestedField.key]
                  fieldControl?.enable();
                }
              }
            }
          }
        }
      }
    });
  }
}