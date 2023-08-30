import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderSharedService } from './services/header-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public headerService: HeaderSharedService,
    private router: Router
  ) {}

  title = 'book-app';
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const shouldShowHeader = !['/login', '/register'].includes(event.url);
        this.headerService.setShowHeader(shouldShowHeader);
      }
    });
  }
}
