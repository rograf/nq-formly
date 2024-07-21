import { JsonPipe } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputField } from '../input-field.class';

@Component({
  selector: 'nq-input-text',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent extends InputField {

}
