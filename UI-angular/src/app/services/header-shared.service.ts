// header.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderSharedService {
  private showHeaderSubject = new BehaviorSubject<boolean>(true);
  showHeader$ = this.showHeaderSubject.asObservable();

  setShowHeader(show: boolean) {
    this.showHeaderSubject.next(show);
  }
}
