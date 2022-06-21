import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api/api.service';
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
  constructor(private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) { }
  catogory: FormGroup;

  ngOnInit(): void {
    this.catogory = this.fb.group({
      name: new FormControl("", [Validators.required]),
    })
    this.getcatogory()
  }

  getcatogory() {
    this.clearForm()
    this.spiner.show()
    this.api.getcatogory().subscribe((res: any) => {

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
  clearForm() {
    this.catogory.reset()
  }
  submit() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.catogory.value);
    let formdata = {
      name: this.catogory.controls['name'].value,
      catogory: this.catogory.controls['name'].value
    };
    if (this.id) {
      this.api.updatecatogory(formdata, this.id).subscribe((res: any) => {
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
      this.api.addcatogory(formdata).subscribe((res: any) => {
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
    this.spiner.hide()
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
        this.api.removecatogory(id).subscribe(res => {
          Swal.fire('', '! catogory has been deleted!', 'success');
          this.getcatogory()
        })
      }
    });
  }
}
