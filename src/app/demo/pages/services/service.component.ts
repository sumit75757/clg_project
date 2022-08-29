import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import Swal from 'sweetalert2';
import { environment } from "../../../../environments/environment.prod";
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  imgURL= environment.imageURL
  category: any;
  serch: string;
  items: any;
  count: any;
  sellerID: any;
  serviceForm: FormGroup;
  subcategory: any;
  files: any[];
  updateId: any;
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
  states: any[]=[];
  city: any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private api: ApiService, private activeRoute: ActivatedRoute,private route:Router) {
    // let user = JSON.parse(localStorage.getItem('userData'))
    // if (user.character == 'seller' && user) {
    //   route.navigate(['seller/prodects/' + user._id])
    // }
  }
  sta:any
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.sellerID = params.id
    })
    this.api.getState().subscribe((res: any) => {
      // for (let index = 0; index < 34; index++) {
      //   const element = array[index];

      // }
      this.sta = res
      this.states = Object.keys(res)
      console.log(this.states);

    })
    this.serviceForm = this.fb.group({
      // sellerId: new FormControl("", [Validators.required]),
      serviceName: new FormControl("", [Validators.required]),
      serviceInfo: new FormControl("", [Validators.required]),
      catogory: new FormControl("", [Validators.required]),
      nearLandMark: new FormControl("", [Validators.required]),
      area: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      pincode: new FormControl("", [Validators.required]),
      discrption: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
      closeTime: new FormControl("", [Validators.required]),
    })
    this.getservice()
    this.getcatogory()
  }
  reset() {

  }
  next() {

  }
  getcatogory() {
    this.api.getServiceCategory().subscribe((res: any) => {
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
  subcat(e) {
    let sub = e.target.value
    this.category.forEach(element => {
      if (element.catgory == sub) {
        this.subcategory = element.subcaetogorys
      }
    });
  }
  imageHandel(e) {
    let files: any[] = e.target.files
    this.files = files
  }
  edit(item) {
    this.serviceForm.patchValue(item)
    this.updateId = item._id
  }
  deletee(id) {
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
        this.api.serviceDelete(id).subscribe(res => {
          this.toastr.success('Seller Deleted!')
          this.getservice()
        })
      }
    });
  }
  getservice() {
    this.api.getservice().subscribe((res: any) => {
      if (this.serch != '' && res.result.length == 0) {
        this.toastr.error('Search result not found!')
      }
      if (res) {
        this.items = res.result
        this.count = res.count
      }

    })
  }
  setState(e) {
    let state = e.target.value

    this.city = this.sta[state]
    console.log(this.city);

  }

  addService() {
    let formdata = new FormData()
    formdata.set('serviceName', this.serviceForm.controls['serviceName'].value)
    formdata.set('serviceInfo', this.serviceForm.controls['serviceInfo'].value)
    formdata.set('sellerId', "62b0971fb7478deba4c1f7bb")
    formdata.set('catogory', this.serviceForm.controls['catogory'].value)
    formdata.set('nearLandMark', this.serviceForm.controls['nearLandMark'].value)
    formdata.set('area', this.serviceForm.controls['area'].value)
    formdata.set('city', this.serviceForm.controls['city'].value)
    formdata.set('state', this.serviceForm.controls['state'].value)
    formdata.set('pincode', this.serviceForm.controls['pincode'].value)
    formdata.set('startTime', this.serviceForm.controls['startTime'].value)
    formdata.set('closeTime', this.serviceForm.controls['closeTime'].value)
    formdata.set('discrption', this.serviceForm.controls['discrption'].value)
    if (this.files) {
      for (let index = 0; index < this.files.length; index++) {
        const element = this.files[index];
        formdata.append('serviceImage', element)
      }
    }
    if (this.updateId) {
      this.api.Updatesrvice(formdata, this.updateId).subscribe((res: any) => {
        if (res) {
          console.log(res);
        }
      })
    } else {
      this.api.addservice(formdata).subscribe((res: any) => {
        if (res) {
          console.log(res);
        }
      })
    }

  }

}
