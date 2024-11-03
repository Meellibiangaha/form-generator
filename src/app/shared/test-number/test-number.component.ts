import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-number.component.html',
  styleUrl: './test-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestNumberComponent),
      multi: true,
    },
  ],
})
export class TestNumberComponent implements ControlValueAccessor {
  readonly isDisabled = signal(false);
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  placeholder: string | null = '';

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
