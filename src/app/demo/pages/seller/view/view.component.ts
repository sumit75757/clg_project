import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  productId: any;
  product: any;
  baseURL = environment.imageURL
  viewImage: number;

  constructor(private api: ApiService, private activeRoute: ActivatedRoute) {
    this.viewImage = 0;
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.productId = params.productId
    })
    this.getproduct()
  }
  getproduct() {
    this.api.getproductbyId(this.productId).subscribe(res => {
      this.product = res
    })
  }

}
