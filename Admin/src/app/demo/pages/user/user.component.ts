import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  tableData: any;
  imageURL = environment.imageURL
  file: any;
  id: any;
  serch: any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getseller()
  }
  skip = 0
  limit = 10
  next = 0
  count: any;
  previeus() {
    let l: any = this.limit;
    let s: any = this.skip;
    this.skip = s - l;
    if (this.skip >= 0) {
      this.next = this.skip
      this.getseller()
    }
    this.counts()

    console.log(this.next);
  }
  nexts() {
    let l: any = this.limit;
    let s: any = this.skip;
    this.skip = s + l;
    this.next = this.skip
    this.getseller()
    console.log(this.next);
    this.counts()
  }
  counts() {
    if (this.next + 10 > this.count) {
      return this.count
    } else {
      return this.next + 10
    }
  }
  Search(e) {
    this.serch = e.target.value
    this.getseller()
  }
  getseller() {
    if (!this.serch) {
      this.spiner.show()
    }
    this.api.getUser(this.skip, this.limit, this.serch).subscribe((res: any) => {
      console.log(this.skip);
      if (res.response == 'success') {
        console.log(res);
        if (this.serch != '' && res.users.length == 0) {
          this.toastr.error('Search result not found!')
        }
        this.tableData = res
        this.count = res.count
        console.log(this.tableData.count);
        this.spiner.hide()
      } else {
        this.spiner.hide()
        this.toastr.error('Somthing Wrong!')
      }
      if (res.count == 0) {
        this.spiner.hide()
        this.toastr.info('Seller Not Found!')
      }

    })
  }
  update(item) {

  }
  remove(id) {

  }

}
