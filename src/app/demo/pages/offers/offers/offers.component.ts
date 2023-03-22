import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api/api.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  imageURL = environment.imageURL
  tableData: any;
  id: any;
  file: any;

  category: any;
  subcategory: any;
  item: any;
  productId: any;
  nextpage: boolean = false;
  baseURL = environment.imageURL
  htmlContent = '';
  serch: any;
  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, public spiner: NgxSpinnerService) { }
  offer: FormGroup;

  ngOnInit() {

    this.offer = this.fb.group({
      offername: new FormControl("", [Validators.required]),
      productId: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      OffferImage: new FormControl(this.file),


    })
  }

  skip = 0
  limit = 10
  nexta = 0
  count: any;

  clearForm() {

    this.id = null
    console.log(this.id);
    this.offer.reset()

  }

  fileHendler(e: any) {
    debugger
    let file = e.target.files[0]
    this.file = file
    this.offer.controls['offerImage'].setValue(this.file)
  }
  update(item) {
    this.id = item._id
    if (this.id) {
      this.offer.patchValue(item)
      this.offer.controls['productId'].disable()
      this.offer.controls['offername'].disable()
      console.log(item);
    }
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
        this.api.removeOffers(id).subscribe(res => {
          this.toastr.success('Offer Deleted!')
        })
      }
    });
  }
  subcat(e) {
    let sub = e.target.value
    this.category.forEach(element => {
      if (element.catgory == sub) {
        this.subcategory = element.subcaetogorys
      }
    });
  }
  Search(e) {
    this.serch = e.target.value
    this.getoffer()
  }

  getoffer() {
    this.api.getproduct(this.id, this.skip, this.limit, this.serch).subscribe((res: any) => {
      if (this.serch != '' && res.product.length == 0) {
        this.toastr.error('Search result not found!')
      }
      this.item = res.product
      this.count = res.count
    })
  }
  next() {
    this.nextpage = this.nextpage ? false : true
  }
  reset() {
    this.nextpage = false
    this.offer.reset()
    this.productId = null
  }
  submit() {
  


  }

  statusHandel(e) {
    console.log(e.target.checked);
    console.log(e.target.id);

    let obj ={
      satate: e.target.checked
    }
    this.api.updateOffers(obj, e.target.id).subscribe((res: any) => {
      if (res.response = 'success') {
        console.log(res);
        this.spiner.hide()
        this.toastr.success('Offer Update!')
        this.getoffer()
        this.id = null

      } else {
        this.spiner.hide()
        this.toastr.error('Somthing Wrong!')

      }
      this.id = null
    })
  }

}


