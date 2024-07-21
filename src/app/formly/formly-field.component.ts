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
    this.fields().forEach((field: any) => {
      field.id = field.key + '_' + new Date().getTime();
      this.form.removeControl(field.key);
      const modelValue = getDescendantProp(model, field.key);
      const formControl = new FormControl(modelValue || field.value);
      this.form.addControl(field.key, formControl);
      setTimeout(() => {
        const subscription = formControl.valueChanges.subscribe((value) => {
          const oldValue = getDescendantProp(model, field.key);
          if(value && field?.props?.type === 'number'){
            value = Number(value) as any;
          }
          if (oldValue !== value && (value !== null || oldValue !== undefined)) {
            if (field.key) {
              setDescendantProp(model, field.key, value);
            }
            checkFieldsExpressions(this.fields(), model, this.form);
          }
        });
        this.subscriptions.push(subscription);
      });
    });
    checkFieldsExpressions(this.fields(), model, this.form);
    setTimeout(() => {
      this.fieldsToDisplay.set(this.fields());
    });
  }, {
    allowSignalWrites: true
  });

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
