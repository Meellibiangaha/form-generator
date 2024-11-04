import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../core/models/select-option';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  value: number = null;

  @Input({ required: true })
  options: SelectOption[] = [];

  onSelectChangeHandler(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = +selectElement.value;
    this.onChange(this.value);
  }

  writeValue(value: number): void {
    this.value = value;
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
