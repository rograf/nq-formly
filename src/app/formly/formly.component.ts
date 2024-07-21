import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, Input, input, Signal } from '@angular/core';
import { FormlyFieldComponent } from './formly-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'nq-formly',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, FormlyFieldComponent, TranslatePipe, KeyValuePipe],
  template: `
  <div>
    <form [formGroup]="form">
      <nq-formly-field [form]="form" [fields]="fields" [model]="model"></nq-formly-field>
    </form>
  </div>
  `,
  styles: []
})
export class FormlyComponent {

  @Input() form!: any;
  @Input() model!: Signal<any>;
  @Input() fields!: Signal<any>;

}
