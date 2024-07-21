import { Component, Input, Signal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyField, InputFormlyField } from "../models/formly-field.interface";
import { getDescendantProp } from "../helpers/getDescendantProp";

@Component({
  selector: 'input-field',
  template: ''
})
export abstract class InputField  {

  @Input() form!: FormGroup;
  @Input() model!: Signal<any>;
  @Input() field!: any;

  onChange() {
    setTimeout(() => {
      if(this.field.change){
        const value = getDescendantProp(this.model(), this.field.key);
        let option:any;
        if(this.field.props?.options){
          option = this.field.props.options().find((option:any) => option.value === value);
        }
        this.field.change(this.model(), this.form, this.field, option);
      }
    });
  }

}