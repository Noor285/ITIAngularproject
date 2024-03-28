import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  DoctorSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  DoctorSignIn(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  PatientSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  PatientSignIn(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }
}
