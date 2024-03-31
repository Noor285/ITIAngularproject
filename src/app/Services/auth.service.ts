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

  // userData = new BehaviorSubject(null);

  // userId = new BehaviorSubject(null);
  // userRole = new BehaviorSubject(null);

  constructor(private httpClient:HttpClient) { }

  // saveUserData(){

  //   let codedToken = JSON.stringify(localStorage.getItem('role') )
  //   let decoded = jwtDecode(codedToken)
  //   this.userData.next(decoded)

  // }


//   IsLogin()
//   {
//     return localStorage.getItem('role');
//   }

 public returnRole(){
    return this.role;
  }

  public setRole(role:string){
    this.role = role;
  }


  DoctorSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  PatientSignUp(userData:object):Observable<any>
  {
    return this.httpClient.post(`Api`, userData)
  }

  PatientAndDoctorSignIn(userData:userInfo):Observable<any>
  {
    return this.httpClient.post(`https://localhost:7013/api/User/Login`, userData)
  }


}

// this.authService.PatientAndDoctorSignIn(this.id).subscribe({
//   next:(Response)=>{
//     if(Response.role === 'doctor'){
//       localStorage.setItem('role' , Response.role)
//       localStorage.setItem("id",Response.id);
//       this.router.navigate(['/doctor/profile'])
//       }
//       if(Response .role === 'patient'){
//         localStorage.setItem('role' , Response.role)
//         localStorage.setItem("id",Response.id);
//         this.router.navigate(['/patient/profile'])
//       }
//       if(Response .role === 'admin'){
//        localStorage.setItem('role' , Response.role)
//        this.router.navigate(['/home'])
//      }

//     }
// })






// this.authService.userData.subscribe({
//   next:() => {
//     if(this.authService.userData.getValue() === "")
//     {
//       this.isLogin = false;
//     }
//     if(this.authService.userData.getValue() === "admin")
//     {
//       this.isLogin = true;
//     }
//     if(this.authService.userData.getValue() === "doctor")
//     {
//       this.isLogin = true;
//     }
//     if(this.authService.userData.getValue() === "patient")
//     {
//       this.isLogin = true;
//     }
//   }
// })
