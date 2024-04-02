import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/Models/i-patient';
import { AuthService } from 'src/app/Services/auth.service';
import { ChangePass } from './../../../Models/changePass';
import { loginDTO } from 'src/app/Models/logindto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

    isLoading : boolean = false;
    apiError:string = '';
  
    id: any = localStorage.getItem("id") ?? "";
    role: any = localStorage.getItem("role") ?? "";

    changePass! : ChangePass [];
    loginDTO! :loginDTO [];


    updatedForm !:FormGroup;
    oldPass !: FormControl;
    newPass !: FormControl;
    confirmNewPass !: FormControl;

    // signInForm !: FormGroup;

    constructor(private fb: FormBuilder,private authService:AuthService , private router: Router) { 
        // this.signInForm = this.fb.group({
        //     password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]],
        //     newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*)(?=.*[^\s]).{8,}$/)]],
        //     confirmPassword: [null, [Validators.required]],
        // }, { validator: this.passwordMatchValidator });
    }
    ngOnInit(): void {
        this.oldPass = new FormControl('', [Validators.required]);
        this.newPass = new FormControl('', [Validators.required]);
        this.confirmNewPass = new FormControl('', [Validators.required]);
        

        this.updatedForm = this.fb.group({
            'oldPassword' : this.oldPass,
            'newPassword' : this.newPass,
            'confirmPassword' : this.confirmNewPass,
        });

    }
    
    onSubmit():void
    {
        if(this.updatedForm.valid){
            this.authService.PatientAndDoctorSignIn(this.id).subscribe((res) => {
                if(res.role){
                    let userData = this.updatedForm.value;
                    userData.role = res.role;
                    this.authService.changePassword(userData).subscribe((res) => {
                        console.log(res);
                        
                    })
                }
              
            })
        }
    };

  
    // onSubmit(): void {
    //   if (this.signInForm.valid) {
    //     const formData = this.signInForm.value;
    //     this.authService.changePassword(formData).subscribe(
    //       response => {
    //         console.log('Password changed successfully.');
    //         // Handle success response if needed
    //       },
    //       error => {
    //         console.error('Failed to change password:', error);
    //         // Handle error response if needed
    //       }
    //     );
    //   } else {
    //     this.signInForm.markAllAsTouched();
    //   }
    // }


  
     handleSignIn()
     {
    //    if (this.signInForm.valid) {
    //     console.log(this.signInForm.value);
    //    this.authService.changePassword(this.id).subscribe({
    //      next:(Response)=>{
    //        if(Response.role === 'doctor'){
    //        localStorage.setItem('role' , Response.role)
    //        this.authService.setRole(Response.role);
    //        localStorage.setItem("id",Response.id);
    //        this.router.navigate(['/doctor/home'])
    //        }
    //        if(Response .role === 'patient'){
    //          localStorage.setItem('role' , Response.role)
    //          localStorage.setItem("id",Response.id);
    //          this.authService.setRole(Response.role);
    //          this.router.navigate(['/patient/home'])
    //        }
    //        if(Response .role === 'admin'){
    //         localStorage.setItem('role' , Response.role)
    //         this.authService.setRole(Response.role);
    //         this.router.navigate(['/home'])
    //       }
    //     },
    //       error: (errors : HttpErrorResponse) => {
    //         console.log(errors);
    //         this.apiError = errors.error;
    //        }
  
    //    })
    //   }
    //   else
    //   {
    //     this.signInForm.markAllAsTouched();
    //   }
  
     }
  

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  togglePasswordVisibility(field: string): void {
    if (field === 'oldPassword') {
        this.showOldPassword = !this.showOldPassword;
    } else if (field === 'newPassword') {
        this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
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

}
