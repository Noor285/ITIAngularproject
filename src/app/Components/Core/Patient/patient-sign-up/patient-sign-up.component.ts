import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-patient-sign-up',
  templateUrl: './patient-sign-up.component.html',
  styleUrls: ['./patient-sign-up.component.css']
})
export class PatientSignUpComponent {
  RegistrationForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private authService:AuthService ,
              private router: Router) { }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      phone : new FormControl('' , [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    }, { validator: this.passwordMatchValidator });
  }

  get nameControl() {
    return this.RegistrationForm.controls['name'];
  }

  get emailControl() {
    return this.RegistrationForm.controls['email'];
  }
  get phoneControl() {
    return this.RegistrationForm.controls['phone'];
  }

  get passwordControl() {
    return this.RegistrationForm.controls['password'];
  }

  get confirmPasswordControl() {
    return this.RegistrationForm.controls['confirmPassword'];
  }

  get dobControl() {
    return this.RegistrationForm.controls['dob'];
  }

  get genderControl() {
    return this.RegistrationForm.controls['gender'];
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword && confirmPassword !== '') {
      formGroup.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
    } else {
      // Check if both password and confirm password are filled before resetting error
      if (password !== '' && confirmPassword !== '') {
        formGroup.get('confirmPassword')?.setErrors(null);
      }
    }
}


handleSignUp(RegistrationForm:FormGroup)
{
  if (RegistrationForm.valid) {
    console.log(RegistrationForm.value);
    this.authService.DoctorSignUp(RegistrationForm.value).subscribe({
      next:(response) =>
      {
        if(response.message === 'success')
        {
          // this.router.navigate(['/doctor/signin']);
        }
      },
      error:(err) =>
      {

        console.log(err.error.msg);
      }
    });
  this.RegistrationForm.reset();
  this.router.navigate(['/patient/signin']);

  }
  else {
    this.RegistrationForm.markAllAsTouched();
  }
}
}
