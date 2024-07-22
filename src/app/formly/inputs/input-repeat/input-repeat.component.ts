import { Component, signal } from '@angular/core';
import { InputField } from '../input-field.class';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldComponent } from '../../formly-field.component';
import { getDescendantProp } from '../../helpers/getDescendantProp';
import { setDescendantProp } from '../../helpers/setDescendantProp';
import { FormlyField } from '../../models/formly-field.interface';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'nq-input-repeat',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyFieldComponent],
  templateUrl: './input-repeat.component.html',
  styleUrl: './input-repeat.component.scss'
})
export class InputRepeatComponent extends InputField  {

  arrayFields = signal<any[]>([]);

  modelGroup = signal<any>([]);

  ngOnInit(){
    console.log(this.field.fields());
  }

  addGroup(value = {}){
    console.log('111')
    if(this.field.fields && this.field.key){
      const formGroup = new FormGroup({});
      formGroup.patchValue(value);
      const currentIndex = this.arrayFields().length || 0;

      const isExistArrayInModel = getDescendantProp(this.model(), this.field.key);
      if(!isExistArrayInModel){
        setDescendantProp(this.model(), this.field.key, []);
      }

      const model3:any = getDescendantProp(this.model(), this.field.key);
      const model4 = [
        ...model3,
        {}
      ]
      setDescendantProp(this.model(), this.field.key, model4);    

      const model2 = getDescendantProp(this.model(), this.field.key);
      
      const model = signal<any>(model2[currentIndex] );

      this.arrayFields.set([
        ...this.arrayFields(),
        {
          form: formGroup,
          model: model,
          fields: this.field.fields,
        }
      ]);

      const formArray = (this.form.get(this.field.key) as FormArray);
      formArray.push(formGroup);
    }
  }

}
