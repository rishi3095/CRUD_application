import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { NotifyService } from "../../services/notify.service";

@Component({
  selector: "spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  blnShowSpinner: boolean;
  objShowSpinnerSub: Subscription;

  constructor(
    private notifyService: NotifyService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.blnShowSpinner = false;
    this.showSpinner();
  }

  ngOnDestroy(): void {
    if (this.objShowSpinnerSub) {
      this.objShowSpinnerSub.unsubscribe();
    }
  }

  showSpinner() {
    this.objShowSpinnerSub = this.notifyService.notifyEnableSpinnerSub.subscribe(
      (data) => {
        this.blnShowSpinner = data;
        this.change.detectChanges();
      }
    );
  }
}
