import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputField } from '../input-field.class';

@Component({
  selector: 'nq-input-switch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.scss'
})
export class InputSwitchComponent extends InputField {

}
