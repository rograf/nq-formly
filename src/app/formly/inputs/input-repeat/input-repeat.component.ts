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
      const currentValues = getDescendantProp(this.model(), this.field.key) as any;
      const currentLenght = this.arrayFields().length;
      const currentModelLenght = currentValues?.length || 0;
      console.log('currentLenght', currentLenght);
      console.log('currentModelLenght', currentModelLenght);
      if(currentValues && currentValues.length){
        for(let i = 0; i < currentValues.length; i++){
          if(currentLenght <= i){
            this.addGroup(currentValues[i]);
          }
        }
      }
  }

  addGroup(value = {}){
    if(this.field.fields && this.field.key){
      const formGroup = new FormGroup({});
      formGroup.patchValue(value);
      const currentIndex = this.arrayFields().length || 0;

      const isExistArrayInModel = getDescendantProp(this.model(), this.field.key);
      if(!isExistArrayInModel){
        setDescendantProp(this.model(), this.field.key, []);
      }

      let existModel = getDescendantProp(this.model(), this.field.key)[currentIndex];
      if(!existModel){
        isExistArrayInModel[currentIndex] = {};
        setDescendantProp(this.model(), this.field.key, isExistArrayInModel);
        existModel = getDescendantProp(this.model(), this.field.key)[currentIndex];
      }

      const model = signal<any>(existModel);

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
