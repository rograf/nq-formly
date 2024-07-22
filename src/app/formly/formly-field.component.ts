import { JsonPipe, KeyValuePipe, NgComponentOutlet } from '@angular/common';
import { Component, effect, Input, signal, Signal } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getDescendantProp } from './helpers/getDescendantProp';
import { setDescendantProp } from './helpers/setDescendantProp';
import { checkFieldsExpressions } from './helpers/check-fields-expressions';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'nq-formly-field',
  standalone: true,
  imports: [JsonPipe, NgComponentOutlet, TranslatePipe, KeyValuePipe],
  templateUrl: './formly-field.component.html',
  styles: []
})
export class FormlyFieldComponent {

  @Input() form!: any;
  @Input() model!: Signal<any>;
  @Input() fields!: Signal<any>;
  
  fieldsToDisplay = signal<any>([]);

  private subscriptions: Subscription[] = [];

  private fieldsChangeEffect = effect(() => {
    this.fieldsToDisplay.set([]);
    const model = this.model();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    console.log(1111)
    this.fields().forEach((field: any) => {
      if(field.key && field.fields){
        this.form.removeControl(field.key);
        this.form.addControl(field.key || '', new FormArray(field.value || []));
      } else {
        if(!field.id){
          field.id = field.key + '_' + new Date().getTime();
        }
        this.form.removeControl(field.key);
        let modelValue = getDescendantProp(model, field.key) as any;
        if(modelValue === undefined){
          modelValue = field.value
        }
        const formControl = new FormControl(modelValue);
        this.form.addControl(field.key, formControl);
          const subscription = formControl.valueChanges.subscribe((value) => {
            const oldValue = getDescendantProp(model, field.key);
            if(value && field?.props?.type === 'number'){
              value = Number(value) as any;
            }
            if (oldValue !== value && (value !== null || oldValue !== undefined)) {
              console.log('value', field.id);
              if (field.key) {
                setDescendantProp(model, field.key, value);
              }
              checkFieldsExpressions(this.fields(), model, this.form, field.id);
            }
          });
          this.subscriptions.push(subscription);
        checkFieldsExpressions(this.fields(), model, this.form, field.id);
        setTimeout(() => {
          this.fieldsToDisplay.set(this.fields());
        });
      }
    });
  }, {
    allowSignalWrites: true
  });

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
