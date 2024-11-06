import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, HostListener, Input, Output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CheckboxItem } from '../../core/models/checkbox-item';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-checkbox.component.html',
  styleUrl: './test-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestCheckboxComponent),
      multi: true,
    },
  ],
})
export class TestCheckboxComponent implements ControlValueAccessor {
  readonly disabled = signal<boolean>(false);
  readonly isChecked = signal<boolean>(false);
  readonly isDisabled = signal(false);

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @HostListener('click')
  toggle() {
    if (!this.disabled()) {
      this.onTouched();
      this.isChecked.set(!this.isChecked());
      this.item.checked = this.isChecked()
      if (this.isChecked()) {
        this.onChange(this.item.id);
        this.change.emit(this.item);
      } else {
        this.onChange(null);
        this.change.emit(null);
      }
    }
  }

  @Input()
  item: CheckboxItem;

  @Output()
  change: EventEmitter<CheckboxItem> = new EventEmitter<CheckboxItem>(null);

  writeValue(value: number): void {
    if(this.item?.checked){
      this.isChecked.set(this.item?.checked);
      this.onChange(this.item.id);
      this.change.emit(this.item);
    }
    this.onChange(value);
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
