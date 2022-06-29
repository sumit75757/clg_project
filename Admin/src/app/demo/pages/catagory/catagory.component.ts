import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api/api.service';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss']
})
export class CatagoryComponent implements OnInit {
  imageURL = environment.imageURL
  tableData: any;
  file: any;
  id: any;
  constructor(public toastEvent: ToastService,private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) { }
  catogory: FormGroup;
  subCatogory: FormGroup;
  ngOnInit(): void {
    this.catogory = this.fb.group({
      name: new FormControl("", [Validators.required]),
    })
    this.subCatogory = this.fb.group({
      name: new FormControl("", [Validators.required]),
      perent: new FormControl("", [Validators.required]),
    })
    this.getcatogory()
  }

  getcatogory() {
    this.clearForm()
    this.spiner.show()
    this.api.getCatogory().subscribe((res: any) => {

      if (res.response == 'sucsess') {
        console.log(res);
        this.tableData = res.data
        console.log(this.tableData);

        this.spiner.hide()
      } else {
        this.spiner.hide()
      }
      if (res.count == 0) {
        this.spiner.hide()
        Swal.fire('Sorry!', 'Catogory Not Found!', 'info');
      }

    })

  }
  update(item) {
    this.id = item._id
    this.catogory.patchValue(item)
    console.log(item);
  }
  updateSub(item) {
    this.id = item._id
    this.subCatogory.patchValue(item)
    console.log(item);
  }
  clearForm() {
    this.catogory.reset()
    this.subCatogory.reset()
    this.id =null

  }
  submit() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.catogory.value);
    if (this.catogory.valid) {
      let formdata = {
        name: this.catogory.controls['name'].value,
        catgory: this.catogory.controls['name'].value
      };
      if (this.id) {
        this.api.updateCatogory(formdata, this.id).subscribe((res: any) => {
          if (res.response = 'success') {
            console.log(res);
            this.spiner.hide()
            this.getcatogory()
            this.id = ''
            Swal.fire('Update!', 'catogory Updated!', 'success');
          } else {
            Swal.fire('Error!', 'Somthing Wrong!', 'error');
          }
          this.id = ''
        })
      }
      else {
      this.api.addCatogory(formdata).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getcatogory()
          Swal.fire('Create!', 'catogory created!', 'success');
        } else {
          Swal.fire('Error!', 'Somthing Wrong!', 'error');
        }

      })
    }
  }
    this.spiner.hide()
  }


  submitSub() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.subCatogory.value);
    let formdata = {
      name: this.subCatogory.controls['name'].value,
      catgory: this.subCatogory.controls['name'].value,
      perent: this.subCatogory.controls['perent'].value
    };
    if (this.id) {
      this.api.updateSubCatogory(formdata, this.id).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getcatogory()
          this.id = ''
          Swal.fire('Update!', 'Catogory Updated!', 'success');
        } else {
          Swal.fire('Error!', 'Somthing Wrong!', 'error');
        }
        this.id = ''
      })
    }
    else {
      this.api.addSubCatogory(formdata).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getcatogory()
          Swal.fire('Create!', 'Catogory created!', 'success');
        } else {
          Swal.fire('Error!', 'Somthing Wrong!', 'error');
        }

      })
    }
    this.spiner.hide()
  }

  number = 5
  lodemor() {

    this.number+=5
    console.log(this.number);

  }
  reset() {
    this.number = 5
    console.log(this.number);

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
        this.api.removeCatogory(id).subscribe(res => {
          Swal.fire('', '! Catogory has been deleted!', 'success');
          this.getcatogory()
        })
      }
    });
  }
  subremove() {
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
        this.api.removeSubCatogory(this.id).subscribe(res => {
          Swal.fire('', '! Catogory has been deleted!', 'success');
          this.getcatogory()
        })
      }
    });
  }
}
