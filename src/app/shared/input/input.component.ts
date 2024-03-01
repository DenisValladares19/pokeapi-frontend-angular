import { Component, Input, forwardRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { keysErrors } from '../../interfaces/KeysError.input';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, MatFormField, NgIf, NgFor, MatDatepickerModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
    provideNativeDateAdapter(),
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() control?: AbstractControl;
  @Input() typeInput?: 'text' | 'date' | 'number' = 'text';

  value: any = '';
  onChange = (value: any) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  onInputChange(event: any) {
    console.log(event);

    if (this.disabled) return;
    this.value = event.target.value;
    this.onTouched();
    this.onChange(this.value);
    this.markAsTouched();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  getListErrors(errors?: { [key: string]: string } | null): string[] {
    if (!errors) return [];
    if (Object.keys(errors).length === 0) return [];

    return Object.keys(errors).map((key) =>
      this.getTraduction(key as keysErrors)
    );
  }

  getTraduction(error: keysErrors): string {
    if (error === 'required') return 'Campo requerido';
    return '';
  }

  isRequired(): boolean {
    if (!this.control?.errors) return false;
    if (this.control.errors['required']) return true;
    return false;
  }

  isError(): boolean {
    if (!this.touched) return false;
    if (!this.control?.errors) return false;

    return true;
  }

  getClassName(): string {
    if (this.isError()) {
      return 'error mat-mdc-form-field w-100 mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-hide-placeholder';
    }

    return 'mat-mdc-form-field mat-mdc-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-hide-placeholder';
  }
}
