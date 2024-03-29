import { Component } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-patient-sign-in',
  templateUrl: './patient-sign-in.component.html',
  styleUrls: ['./patient-sign-in.component.css']
})
export class PatientSignInComponent {

  isLoading : boolean = false;
  apiError:string = '';

  constructor(private authService:AuthService , private router: Router) { }

  signInForm:FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required, Validators.email]),
    password : new FormControl(null , [Validators.required, Validators.minLength(6)]),
  })



  handleSignIn(signInForm:FormGroup)
  {
    console.log(signInForm.value)
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
   }
}
