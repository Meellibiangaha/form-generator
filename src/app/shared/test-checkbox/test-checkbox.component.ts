import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
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
  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;

  @HostListener('click')
  toggle() {
    if (!this.disabled()) {
      this.onTouched();
      this.isChecked.set(!this.isChecked());
      this.onChange(this.isChecked());
      this.change.emit(this.isChecked());
    }
  }

  @Input({ required: true })
  item?: CheckboxItem;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  change: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  writeValue(value: boolean): void {
    this.onChange(value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
