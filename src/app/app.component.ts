import { Component, signal } from '@angular/core';
import { InputTextComponent } from './formly/inputs/input-text/input-text.component';
import { FormlyComponent } from './formly/formly.component';
import { AbstractControl, AsyncValidatorFn, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { InputSelectComponent } from './formly/inputs/input-select/input-select.component';
import { InputSwitchComponent } from './formly/inputs/input-switch/input-switch.component';
import { Observable, of, delay } from 'rxjs';

export function hasUpperCaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && /[A-Z]/.test(value)) {
      return null;
    }
    return { hasUpperCase: true };
  };
}

export function containsNumberValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;
    const hasNumber = /\d/.test(value);
    return of(hasNumber ? null : { containsNumber: true }).pipe(
      delay(1 * 1000)
    );
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormlyComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup = new FormGroup({});

  readonly model = signal<any>({});

  fields = signal<any>([]);

  ngOnInit() {

    this.initFields();

    setTimeout(() => {
      this.model.set({ 
        name: '2',
        min: 1,
       });
    }, 100);

    setTimeout(() => {
      this.model.set({ 
        name: '123',
        min: 2,
       });
    }, 200);

  }

  initFields() {

    const options = signal<any>([]);

    this.fields.set([
      {
        key: 'name',
        component: InputTextComponent,
        asyncValidators: {
          containsNumber: containsNumberValidator,
        },
        customValidators: {
          hasUpperCase: hasUpperCaseValidator,
        },
        validators: {
          required: true,
          hasUpperCase: true,
          containsNumber: true,
          minLength: (model:any)=>{
            return model.min;
          },
        },
        props: {
          label: 'Name',
        }
      },
      {
        key: 'min',
        component: InputTextComponent,
        validators: {
          required: (model:any)=>{
            return model.name !== '123';
          },
          min: 2,
          max: 9,
        },
        props: {
          label: 'Min Name Length',
          type: 'number',
        }
      },
      {
        key: 'Disabled',
        component: InputTextComponent,
        expressions: {
          disabled: (model:any) => {
            return model.name === '123';
          }
        },
        props: {
          label: 'Disabled',
          // options: options,
        }
      },
      {
        key: 'isDev',
        component: InputSwitchComponent,
        props: {
          label: 'Is developer',
          customLabel: true,
        },
        change: (model:any, value:any) => {
          console.log('isDev', model);
          // model.name = 'a'
            this.model.set({
              ...this.model(), 
              name: 'abc',
              // minLength: 2,
            });
            console.log('value', value);
            if(model.isDev){
              this.fields.set([
                ...this.fields(),
                {
                  key: 'added',
                  component: InputTextComponent,
                  props: {
                    label: 'added',
                  },
                  validators: {
                    required: true,
                  }
                }
              ]);
            } else {
              this.fields.set(this.fields().filter((field:any)=>field.key !== 'added'));
            }
        }
      },
      {
        key: 'option',
        component: InputSelectComponent,
        clearHidden: true,
        expressions: {
          hidden: (model:any)=>{
            return !model.isDev;
          }
        },
        props: {
          label: 'option',
          required: true,
          options: options,
        }
      },
    ]);

    setTimeout(() => {
      options.set([
        { label: 'Angular 2', value: 'angular-2' },
        { label: 'Angular 4', value: 'angular-4' },
        { label: 'Angular 6', value: 'angular-6' },
        { label: 'Angular 8', value: 'angular-8' },
        { label: 'Angular 10', value: 'angular-10' },
      ]);
    }, 2000);

  }

  onSubmit() {
    console.log(this.form.pending) // async validators
    console.log(this.form.valid)
    console.log(this.form.value)
    // alert(JSON.stringify(this.model()));
  }

}
