import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable , BehaviorSubject} from 'rxjs';
import { userInfo } from '../Models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   userData!: userInfo;
   role : string = localStorage.getItem("role") ?? "";

  constructor(private httpClient:HttpClient) { }


 public returnRole(){
    return this.role;
  }

  public setRole(role:string){
    this.role = role;
  }

  PatientAndDoctorSignIn(userData:userInfo):Observable<any>
  {
    return this.httpClient.post(`https://localhost:7013/api/User/Login`, userData)
  }

  changePassword(userData:userInfo):Observable<any>
  {
    const resetPasswordViewModel = {
        OldPassword : userData.oldpass,
        Password : userData.newPass,
        ConfirmPassword : userData.newPass,
        Email : userData.email,
        Role : userData.role

    }
    return this.httpClient.patch(`https://localhost:7013/api/User/changepassword`, userData)
  }

}
