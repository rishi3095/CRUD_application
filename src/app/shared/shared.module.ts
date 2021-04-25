import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { CardComponent } from "./components/card/card.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material";
import { ConfirmationModalComponent } from "./components/modals/components/confirmation-modal/confirmation-modal.component";
import { NotifyService } from "./services/notify.service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";

@NgModule({
  declarations: [
    CardComponent,
    ConfirmationModalComponent,
    SpinnerComponent,
    SearchbarComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    CardComponent,
    SpinnerComponent,
    SearchbarComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    DragDropModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    NotifyService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
    DatePipe,
  ],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedModule {}
