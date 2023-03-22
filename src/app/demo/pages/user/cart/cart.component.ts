import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId: any;
  cart: any;
   imageUrl = environment.imageURL
  constructor(private activeRoute : ActivatedRoute, private api : ApiService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: any) => {
      this.userId = param.id
    })
    this.getcart()
  }
  getcart() {
    this.api.getUsercart(this.userId).subscribe((res:any) => {
     this.cart = res.data
   })
  }

}
