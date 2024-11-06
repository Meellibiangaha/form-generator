import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-btn.component.html',
  styleUrl: './tab-btn.component.scss',
})
export class TabBtnComponent {
  @Input({ required: true })
  btnText: string = '';

  @Input()
  disabled = false;
}
