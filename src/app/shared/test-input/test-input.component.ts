import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestInputComponent),
      multi: true,
    },
  ],
})
export class TestInputComponent implements ControlValueAccessor {
  readonly isDisabled = signal(false);

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  @Output()
  removeInput: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @Output()
  addInput: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @Input() value: string = null;

  @Input()
  placeholder: string = null;

  @Input()
  summary: string = null;

  @Input()
  canRemoveControl = false;

  @Input()
  canAddControl = false;

  inputChangeHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value ? input.value : null;
    this.onChange(this.value);
  }

  removeInputHandler(): void {
    this.removeInput.emit(true);
  }

  addInputHandler(): void {
    this.addInput.emit(true);
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.input) {
      this.input.nativeElement.value = value;
    }
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
