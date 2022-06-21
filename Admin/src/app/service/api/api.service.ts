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

  getSeller() {
    return this.http.get(this.baseUrl + 'api/sellers', { headers: this.header })
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




  getproduct(id:any) {
    return this.http.get(this.baseUrl + 'api/seller/product/' + id,{ headers: this.header })
  }

  addproduct(data: any) {
    return this.http.post(this.baseUrl + 'api/product/',data, { headers: this.header })
  }






  getcatogory() {
    return this.http.get(this.baseUrl +'api/catogory', { headers: this.header })
  }

  addcatogory(data) {
    return this.http.post(this.baseUrl + 'api/catogory', { headers: this.header })
  }

  updatecatogory(data,id) {
    return this.http.put(this.baseUrl + 'api/catogory', { headers: this.header })
  }

  removecatogory(id) {
    return this.http.delete(this.baseUrl + 'api/catogory', { headers: this.header })
  }

}
