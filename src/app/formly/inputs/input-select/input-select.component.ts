import { Component, Input, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputField } from '../input-field.class';

@Component({
  selector: 'nq-input-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent extends InputField {

}
