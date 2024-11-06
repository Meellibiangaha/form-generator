import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AppStorageService } from '../../core/services/app-storage.service';
import { JsonForm } from '../../core/models/json-form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private storage: AppStorageService) {}
  readonly canEditStorageForm = signal<boolean>(false);
  ngOnInit(): void {
    this.canEditStorageForm.set(!this.storage.getItem<JsonForm>('WebForm'));
  }
}
