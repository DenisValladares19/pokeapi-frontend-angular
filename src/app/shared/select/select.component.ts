import { Component, Input, forwardRef } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectOption } from '../../interfaces/SelectOption';
import { keysErrors } from '../../interfaces/KeysError.input';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, NgFor, MatIconModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss', '../input/input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() control?: AbstractControl;
  @Input() disable?: boolean;
  @Input() options?: SelectOption[] = [];

  value: string[] = [];
  onChange = (value: any) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  onInputChange(event: any) {
    if (this.disabled) return;
    this.value = event;
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

  isError(): boolean {
    if (!this.touched) return false;
    if (!this.control?.errors) return false;

    return true;
  }

  getClassName(): string {
    if (this.isError()) {
      return 'error mat-mdc-form-field w-100 mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary ng-tns-c2608167813-0 mat-form-field-hide-placeholder';
    }

    return 'mat-mdc-form-field w-100 mat-mdc-form-field-type-mat-select mat-form-field-appearance-fill mat-primary mat-form-field-hide-placeholder';
  }

  onClickRemove(event: MouseEvent, key: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.deleteItem(key);
  }

  deleteItem(key: string): void {
    if (!key) return;
    if (!this.value) return;
    if (this.value.length === 0) return;

    const result = this.value.filter((item) => item !== key);
    this.onInputChange(result);
  }

  getValueOption = (key: string): string => {
    if (!key) return '';

    const result = this.options?.find((item) => item.key === key);

    return result?.value || '';
  };
}
