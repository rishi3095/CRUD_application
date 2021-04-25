import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notifyEnableSpinnerSub: Observable<boolean>;
  private notifyEnableSpinnerSubject = new Subject<boolean>();

  constructor() {
    this.notifyEnableSpinnerSub = this.notifyEnableSpinnerSubject.asObservable();
   }

   notifyEnableSpinner(data: boolean) {
    this.notifyEnableSpinnerSubject.next(data);
   }
}
