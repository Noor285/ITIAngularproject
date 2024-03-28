import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup , FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-doctor-sign-up',
  templateUrl: './doctor-sign-up.component.html',
  styleUrls: ['./doctor-sign-up.component.css']
})
export class DoctorSignUpComponent {

  isLoading : boolean = false;
  apiError:string = '';

  constructor(private authService:AuthService , private router: Router) { }

  signUpForm:FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    email : new FormControl(null , [Validators.required, Validators.email]),
    password : new FormControl(null , [Validators.required, Validators.minLength(6)]),
    rePassword : new FormControl(null , [Validators.required, Validators.minLength(6)]),
    nationalId : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{14}$/)]),
    speciality : new FormControl(null , [Validators.required]),
    dateOfBirth : new FormControl(null , [Validators.required , Validators.min(new Date(1960, 12, 1).getTime()), Validators.max(new Date(2024, 2, 29).getTime())]),
    gender : new FormControl(null , [Validators.required]),
    gov : new FormControl(null , [Validators.required]),
    address : new FormControl(null , [Validators.required]),
    phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    price : new FormControl(null , [Validators.required , Validators.min(100) , Validators.max(5000)]),
  },{ validators : this.passwordmatch});
  // { validators: this.passwordmatch }


  // passwordMatchValidator(signUpForm: FormGroup)
  // {
  //   const password = signUpForm.get('password')?.value;
  //   const confirmPassword = signUpForm.get('confirmPassword')?.value;

  //   return password === confirmPassword ? null : { passwordmatch: 'Passwords do not match' };
  // }

  passwordmatch(signUpForm: any) {
    const passwordControl = signUpForm.get('password')?.value;
    const rePasswordControl = signUpForm.get('rePassword')?.value;

    if (passwordControl !== rePasswordControl )
    {
      rePasswordControl.setErrors({passwordmatch : 'Not Matched'})
      return {passwordmatch : 'Not Matched'}

    }
    else
    {
      return null;
    }
    }


  handleSignUp(signUpForm:FormGroup)
  {
    this.isLoading = true;
    if (signUpForm.valid) {
      console.log(signUpForm.value);
      this.authService.DoctorSignUp(signUpForm.value).subscribe({
        next:(response) =>
        {
          if(response.message === 'success')
          {
            // this.isLoading = false;
            // this.router.navigate(['/doctor/signin']);
          }
        },
        error:(err) =>
        {
          this.isLoading = false;
          this.apiError = err.error.msg;
          console.log(err.error.msg);
        }
      });
    this.signUpForm.reset();
    this.router.navigate(['/doctor/signin']);

    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
