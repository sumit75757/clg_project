import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import '../../../../../../node_modules/tinymce/tinymce.min.js';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  baseURL = environment.imageURL
  id: any;
  product: FormGroup;
  category: any;
  files: any[];
  subcategory: any;
  items:any
  editorConfig: AngularEditorConfig = {
       editable: true,
      spellcheck: true,
      height: '600px  ',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]

  };
  nextpage: boolean = false;
  htmlContent = '';
  productId: any;
  serch: any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private api: ApiService, private activeRoute: ActivatedRoute) { }

  @ViewChild('keywords-input') keywordsInput
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params.id
    })
    this.product = this.fb.group({
      productName: new FormControl("", [Validators.required]),
      productInfo: new FormControl("", [Validators.required]),
      sellerId: new FormControl(this.id, [Validators.required]),
      price: new FormControl("", [Validators.required]),
      catogory: new FormControl("", [Validators.required]),
      inStock: new FormControl("", [Validators.required]),
      subCatogory: new FormControl("", [Validators.required]),
      delevery: new FormControl("", [Validators.required]),
      discrption: new FormControl("", [Validators.required])
    })
    this.getcatogory()
    this.getproducta()
  }
  skip = 0
  limit = 10
  nexta = 0
  count: any;
  previeus() {
    let l: any = this.limit;
    let s: any = this.skip;
    this.skip = s - l;
    if (this.skip >= 0) {
      this.nexta = this.skip
      this.getproducta()
    }
    this.counts()

    console.log(this.next);
  }
  nexts() {
    let l: any = this.limit;
    let s: any = this.skip;
    this.skip = s + l;
    this.nexta = this.skip
    this.getproducta()
    console.log(this.next);
    this.counts()
  }
  counts() {
    if (this.nexta + 10 > this.count) {
      return this.count
    } else {
      return this.nexta + 10
    }
  }
  getcatogory() {
    this.api.getCatogory().subscribe((res: any) => {
      if (res.response == 'sucsess') {
        console.log(res);
        this.category = res.data
        console.log(this.category);
      }
      if (res.count == 0) {
        this.toastr.error('Catogory Not Found!')

      }
    })

  }

  Search(e) {
    this.serch = e.target.value
    this.getproducta()
  }

  getproducta() {
    this.api.getproduct(this.id, this.skip, this.limit, this.serch).subscribe((res: any) => {
      if (this.serch != '' && res.product.length == 0) {
        this.toastr.error('Search result not found!')
      }
      this.items = res.product
      this.count = res.count
    })
  }
  imageHandel(e) {
    let files: any[] = e.target.files
    this.files = files
  }
  subcat(e) {
    let sub = e.target.value
    this.category.forEach(element => {
      if (element.catgory == sub) {
        this.subcategory = element.subcaetogorys
      }
    });
  }
  next() {
    this.nextpage = this.nextpage ? false : true
  }
  reset() {
    this.nextpage = false
    this.product.reset()
    this.productId = null
  }

  update(item) {
    this.productId = item._id
    this.product.patchValue(item)

  }



  async addProduct() {
    if (this.product.valid) {
      let formdata = new FormData()
      formdata.set('productName', this.product.controls['productName'].value)
      formdata.set('productInfo', this.product.controls['productInfo'].value)
      formdata.set('sellerId', this.product.controls['sellerId'].value)
      formdata.set('price', this.product.controls['price'].value)
      formdata.set('catogory', this.product.controls['catogory'].value)
      formdata.set('inStock', this.product.controls['inStock'].value)
      formdata.set('subCatogory', this.product.controls['subCatogory'].value)
      formdata.set('delevery', this.product.controls['delevery'].value)
      formdata.set('discrption', this.product.controls['discrption'].value)
      if (this.files) {
        for (let index = 0; index < this.files.length; index++) {
          const element = this.files[index];
          formdata.append('productImage', element)
        }
      }
      if (this.productId) {
        this.api.updateproduct(formdata,this.productId).subscribe(res => {
          this.toastr.success('Product Update!')
          this.getproducta()
          console.log(res);
        })
      } else {
        this.api.addproduct(formdata).subscribe(res => {
          this.toastr.success('Product Add!')
          console.log(res);
          this.getproducta()
        })
      }
    }
    this.reset()
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

      } else {
        this.api.removeproduct(id).subscribe(res => {
          this.toastr.success('Product has been deleted!!')
          this.getproducta()
        })
      }
    });
  }

}
