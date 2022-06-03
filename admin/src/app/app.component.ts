import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet> <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#3c4b64" type = "ball-scale-ripple-multiple" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner></router-outlet>',
})
export class AppComponent implements OnInit {
  placement = ToasterPlacement.TopEnd;
  title  = 'CoreUI Free Angular Admin Template';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
