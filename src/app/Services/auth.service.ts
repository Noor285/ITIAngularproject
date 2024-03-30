import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { userInfo } from '../Models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  // saveUserData(){

  //   let codedToken = JSON.stringify(localStorage.getItem('role') )
  //   let decoded = jwtDecode(codedToken)
  //   this.userData.next(decoded)

  // }


  DoctorSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  DoctorSignIn(userData:object):Observable<any>
  {
    return this.httpClient.post(`https://localhost:7013/api/User/Login`, userData)
  }

  PatientSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  PatientSignIn(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }


  PatientAndDoctorSignIn(userData:userInfo):Observable<any>
  {
    return this.httpClient.post(`https://localhost:7013/api/User/Login`, userData)
  }


}
