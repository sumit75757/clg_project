import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() { }
  logOut() {
    this.spinner.show()
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    setTimeout(() => {
      this.route.navigate(['/login'])
      this.spinner.hide()
    }, 600);
  }
}
