import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStorageService } from '../../core/services/app-storage.service';
import { JsonForm } from '../../core/models/json-form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly canEditStorageForm = !!inject(AppStorageService).getItem<JsonForm>('WebForm');
}
