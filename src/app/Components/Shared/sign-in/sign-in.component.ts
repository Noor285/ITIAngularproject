import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class PatientSignInComponent {

  isLoading : boolean = false;
  apiError:string = '';

  constructor(private authService:AuthService , private router: Router) { }

  signInForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required, Validators.email]),
    password : new FormControl(null , [Validators.required, Validators.minLength(6)]),
  })



  // handleSignIn(signInForm:FormGroup)
  // {
  //   console.log(signInForm.value)
  //   this.isLoading = true;
  //   if (signInForm.valid) {
  //     console.log(signInForm.value);
  //     // this.authService.PatientSignIn(signInForm.value).subscribe({
  //     //   next:(response) =>
  //     //   {
  //     //     if(response.message === 'success')
  //     //     {
  //     //       // this.isLoading = false;
  //     //       // this.router.navigate(['/home']);
  //     //     }
  //     //   },
  //     //   error:(err) =>
  //     //   {
  //     //     this.isLoading = false;
  //     //     this.apiError = err.error.msg;
  //     //     console.log(err.error.msg);
  //     //   }
  //     // });
  //   this.signInForm.reset();
  //   this.router.navigate(['/home']);

  //   }
  //   else {
  //     this.isLoading = false;
  //     this.signInForm.markAllAsTouched();
  //   }
  //  }

   handleSignIn()
   {
    //  this.isLoading =true;
     if (this.signInForm.valid) {
      console.log(this.signInForm.value);
     this.authService.PatientAndDoctorSignIn(this.signInForm.value).subscribe({
       next:(Response)=>{
        //  this.isLoading=false;
         if(Response.role === 'doctor'){
         localStorage.setItem('role' , Response.role)
         localStorage.setItem("id",Response.id);
         this.router.navigate(['/doctor/profile'])
         }
         if(Response .role === 'patient'){
           localStorage.setItem('role' , Response.role)
           localStorage.setItem("id",Response.id);
           this.router.navigate(['/patient/profile'])
         }
         if(Response .role === 'admin'){
          localStorage.setItem('role' , Response.role)
          this.router.navigate(['/admin/profile'])
        }
      },
        error: (errors : HttpErrorResponse) => {
          //  this.isLoading = false;
          //  if (error.status === 401) {
          //    this.apiError = 'Unauthorized. Please check your credentials.';
          //  } else if (error.status === 403) {
          //    this.apiError = 'Forbidden. You are not allowed to access this resource.';
          //  } else {
          //    this.apiError = 'An unexpected error occurred. Please try again later.';
          //  }
          console.log(errors);
          this.apiError = errors.error;
         }

     })
    }
    else
    {
      this.signInForm.markAllAsTouched();
    }

   }



}
