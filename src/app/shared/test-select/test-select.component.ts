import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../core/models/select-option';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectComponent),
      multi: true,
    },
  ],
})
export class TestSelectComponent implements ControlValueAccessor {
  readonly isDisabled = signal(false);
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  options: SelectOption[] = [];

  @Input()
  placeholder: string | null = null;

  writeValue(value: string): void {
    this.onChange(value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
