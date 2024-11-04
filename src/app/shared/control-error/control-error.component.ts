import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-error.component.html',
  styleUrl: './control-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  /** Вообще компонент задумывался для отображения error_message для отдельных контролов
   *  Но времени у меня не так много, чтобы это реализовывать
   *  Поэтому я буду его использовать, чтобы просто показать, что форма не валидна
   */
  @Input()
  message: string;
}
