import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:any = environment.baseUrl
  constructor(private http: HttpClient) { }
  adminLogin(data:any){
    return this.http.post(this.url+"api/admin/auth/singin",data)
  }

}
