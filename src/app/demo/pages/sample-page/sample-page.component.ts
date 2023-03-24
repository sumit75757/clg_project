import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api/api.service';
import { SeoAnalyticChart1 } from './chart/seo-analytic-chart-1';
import { SeoAnalyticChart2 } from './chart/seo-analytic-chart-2';
import { SeoAnalyticChart3 } from './chart/seo-analytic-chart-3';
import { SeoAnalyticChart4 } from './chart/seo-analytic-chart-4';

@Component({

  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {
  products: any
  order:any
  services:any
  totalservicebook:any
  selse :any =0 
  revenyu:any =0
  cancelproduct:any =0
  feedback:any[]



  constructor(private api: ApiService,private spinner : NgxSpinnerService) {
  
  }

  ngOnInit() {
    this.spinner.show()
    let userinfo:any = JSON.parse(localStorage.getItem("userData")+"")
    if (userinfo.character == "seller") {
      this.product(userinfo._id)
      this.orders(userinfo._id)
      this.service(userinfo._id)
      this.bookservice(userinfo._id)
      this.getfeedback()

    }else if(userinfo.character == "admin"){
      this.product()
      this.orders()
      this.service()
      this.bookservice()
      this.getfeedback()
    }
    
  }
  product(id?:any){
    this.spinner.show()
    
    this.api.gettotalproduct(id).subscribe((res: any) => {
      this.products = res.response.count ?res.response.count :res.count
    this.spinner.hide()
      
    },(err:any)=>{
      console.log(err);
    this.spinner.hide()
      
    })

  }

  service(id?:any){
    this.spinner.show()

    this.api.getservice(id).subscribe((res: any) => {
      this.services = res.result?.length ? res.result?.length : res.count
      console.log(this.services);
      
    this.spinner.hide()

    },(err:any)=>{
      console.log(err);
    this.spinner.hide()
      
    })

  }
  orders(id?:any){

    this.api.gettotalorders(id).subscribe((res: any) => {
      this.order = res.count
      console.log(res);
    this.spinner.hide()

      res.data.forEach((element:any) => {
        if(element.cancel=="false"){
          this.selse ++
          this.revenyu =+ element.price
        } 
        else{
          this.cancelproduct ++
        }
      });
      

    },(err:any)=>{
    this.spinner.hide()

      console.log(err);
      
    })

  }
  getfeedback(){
    this.api.getfeedback().subscribe((res:any)=>{
      this.feedback = res.data
    },(err:any)=>{console.log(err);
    })
  }
  bookservice(id?:any){
    this.spinner.show()

    this.api.getbookservice(id).subscribe((res: any) => {
    this.spinner.hide()

      this.totalservicebook = res.data.length
    },(err:any)=>{
    this.spinner.hide()

      console.log(err);
      
    })

  }
  convert(number?:any){
    console.log(number);
    let num:string = number.toString()
    if (number == 0) {
      return "N/A";
    }
    else {
      if (number <= 999) {

        return "₹  " + num;
      }
      else if (number >= 1000 && number <= 9999) {


        return "₹  "+num.charAt(0) + ',' + num.slice(1, 4) ;
      }
      else if (number >= 10000 && number <= 99999) {


        return "₹  "+num.slice(0, 2) + ',' + num.slice(2, 5);
      }
      // millions
      else if (number >= 100000 && number <= 999999) {
        return "₹  " +num.charAt(0) + ',' + num.slice(1, 3) + ',' + num.slice(3, 6);
      }
      // billions
      // else if (number >= 1000000000 && number <= 999999999999) {
      //   return (number / 1000000000) + 'B';
      // }
      else
        return number;
    }
  }
  
}
