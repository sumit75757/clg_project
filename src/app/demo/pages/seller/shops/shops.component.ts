import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import 'sweetalert2/src/sweetalert2.scss';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.prod'
import { ApiService } from 'src/app/service/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  imageURL = environment.imageURL
  tableData: any;
  file: any;
  id: any;
  serch: any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) {
    let user =  JSON.parse(localStorage.getItem('userData'))
    if (user.character == 'seller' && user) {
      route.navigate(['seller/prodects/' + user._id])
    }
   }
  seller: FormGroup;

  ngOnInit(): void {
    this.seller = this.fb.group({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      zender: new FormControl("", [Validators.required]),
      character: new FormControl("", [Validators.required]),
      userImage: new FormControl(this.file),

    })
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
  fileHendler(e: any) {
    debugger
    let file = e.target.files[0]
    this.file = file
    this.seller.controls['userImage'].setValue(this.file)
  }

  Search(e) {
    this.serch = e.target.value
    this.getseller()
  }

  getseller() {
    this.clearForm()
    if (!this.serch) {
      this.spiner.show()
    }
    this.api.getSeller(this.skip, this.limit, this.serch).subscribe((res: any) => {

      if (res.response == 'success') {
        if (this.serch != '' && res.sellers.length == 0) {
          this.toastr.error('Search result not found!')
        }
        console.log(res);
        this.tableData = res.sellers
        this.count = res.count
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
    this.id = item._id
    if (this.id) {
      this.seller.patchValue(item)
      this.seller.controls['email'].disable()
      this.seller.controls['password'].disable()
      console.log(item);
    }
  }

  clearForm() {

    this.id = null
    console.log(this.id);
    this.seller.reset()
    this.seller.controls['email'].enable()
    this.seller.controls['password'].enable()
  }

  submit() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.seller.controls['zender'].value);
    let formdata = new FormData();
    // formdata.set('data',this.seller.)
    formdata.set('username', this.seller.controls['username'].value ? this.seller.controls['username'].value : '');
    formdata.set('email', this.seller.controls['email'].value ? this.seller.controls['email'].value : '');
    formdata.set('password', this.seller.controls['password'].value ? this.seller.controls['password'].value : '');
    formdata.set('phone', this.seller.controls['phone'].value ? this.seller.controls['phone'].value : '');
    formdata.set('address', this.seller.controls['address'].value ? this.seller.controls['address'].value : '');
    formdata.set('city', this.seller.controls['city'].value ? this.seller.controls['city'].value : '');
    formdata.set('zip', this.seller.controls['zip'].value ? this.seller.controls['zip'].value : '');
    formdata.set('age', this.seller.controls['age'].value ? this.seller.controls['age'].value : '');
    formdata.set('state', this.seller.controls['state'].value ? this.seller.controls['state'].value : '');
    formdata.set('zender', this.seller.controls['zender'].value ? this.seller.controls['zender'].value : '');
    formdata.set('character', 'seller');
    formdata.append('userImage', this.file);
    if (this.id) {
      formdata.delete('password');
      this.api.updateSeller(formdata, this.id).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.toastr.success('Seller Update!')
          this.getseller()
          this.id = null

        } else {
          this.spiner.hide()
          this.toastr.error('Somthing Wrong!')

        }
        this.id = null
      })
    }
    else {
      this.api.addSeller(formdata).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getseller()
          this.toastr.success('Seller Created!')

        } else {
          this.spiner.hide()
          this.toastr.error('Somthing Wrong!')
        }

      })
    }
    this.spiner.hide()

  }
  statusHandel(e) {
    console.log(e.target.checked);
    console.log(e.target.id);

    let obj ={
      satate: e.target.checked
    }
    this.api.updateSeller(obj, e.target.id).subscribe((res: any) => {
      if (res.response = 'success') {
        console.log(res);
        this.spiner.hide()
        this.toastr.success('Seller Update!')
        this.getseller()
        this.id = null

      } else {
        this.spiner.hide()
        this.toastr.error('Somthing Wrong!')

      }
      this.id = null
    })
  }

  remove(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Somthing Wrong !', 'error');
      } else {
        this.api.removeSeller(id).subscribe(res => {
          this.toastr.success('Seller Deleted!')
          this.getseller()
        })
      }
    });
  }
}
