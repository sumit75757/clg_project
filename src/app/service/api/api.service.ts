import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl
  token: any = localStorage.getItem('token');

  constructor(private http: HttpClient) { }
  header = new HttpHeaders({
    Authorization: 'Bearer ' + this.token,
  });

  header2 = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  getSeller(skip, limit, serch) {
    serch = serch ? serch : '';
    console.log(serch);

    return this.http.get(this.baseUrl + 'api/sellers?skip=' + skip + "&limit=" + limit + "&serch=" + serch, { headers: this.header })
  }
  addSeller(data:any) {
    return this.http.post(this.baseUrl + 'api/auth/singup', data)
  }

  updateSeller(data:any,id:any) {
    return this.http.put(this.baseUrl + 'api/auth/userUpdate/'+id, data, { headers: this.header })
  }

  removeSeller(id:any) {
    return this.http.delete(this.baseUrl + 'api/auth/seller/' + id, { headers: this.header })
  }



  getproduct(id: any, skip, limit, serch) {
    serch = serch ? serch : '';
    console.log(serch);

    return this.http.get(this.baseUrl + 'api/seller/product/' + id + '?skip=' + skip + "&limit=" + limit + "&serch=" + serch ,{ headers: this.header })
  }
  getproductbyId(id: any) {
    return this.http.get(this.baseUrl + 'api/product/' + id, { headers: this.header })
  }

  addproduct(data: any) {
    return this.http.post(this.baseUrl + 'api/product/',data, { headers: this.header })
  }
  updateproduct(data: any,id) {
    return this.http.put(this.baseUrl + 'api/product/'+id, data, { headers: this.header })
  }
  removeproduct(id: any) {
    return this.http.delete(this.baseUrl + 'api/product/'+id, { headers: this.header })
  }






  getCatogory() {
    return this.http.get(this.baseUrl +'api/catogory', { headers: this.header })
  }

  addCatogory(data) {
    console.log(this.token);

    return this.http.post(this.baseUrl + 'api/catogory', data,{ headers: this.header })
  }

  updateCatogory(data,id) {
    return this.http.put(this.baseUrl + 'api/catogory/'+id,data, { headers: this.header })
  }

  removeCatogory(id) {
    return this.http.delete(this.baseUrl + 'api/catogory/'+id, { headers: this.header })
  }



  getSubCatogory() {
    return this.http.get(this.baseUrl +'api/subcatogory', { headers: this.header })
  }

  addSubCatogory(data) {
    return this.http.post(this.baseUrl + 'api/subcatogory', data, { headers: this.header })
  }

  updateSubCatogory(data,id) {
    return this.http.put(this.baseUrl + 'api/subcatogory/' + id, data,{ headers: this.header })
  }

  removeSubCatogory(id) {
    return this.http.delete(this.baseUrl + 'api/subcatogory/'+id, { headers: this.header })
  }



  getUser(skip, limit, serch) {
    serch = serch ? serch : '';
    console.log(serch);

    return this.http.get(this.baseUrl + 'api/users?skip=' + skip + "&limit=" + limit + "&serch=" + serch  , { headers: this.header })
  }

}
