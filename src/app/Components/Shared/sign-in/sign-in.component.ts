import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class PatientSignInComponent {

    isLoading: boolean = false;
    apiError: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    signInForm: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    showAlert: boolean = false;

    handleSignIn() {
        // this.showAlert = true;
        if (this.signInForm.valid) {
            console.log(this.signInForm.value);
            this.authService.PatientAndDoctorSignIn(this.signInForm.value).subscribe({
                next: (Response) => {
                    if (Response.role === 'doctor') {
                        this.showAlert = true;
                        localStorage.setItem('role', Response.role)
                        this.authService.setRole(Response.role);
                        localStorage.setItem("id", Response.id);
                        this.router.navigate(['/doctor/home'])
                    }
                    if (Response.role === 'patient') {
                        localStorage.setItem('role', Response.role)
                        localStorage.setItem("id", Response.id);
                        this.authService.setRole(Response.role);
                        this.router.navigate(['/patient/home'])
                    }
                    if (Response.role === 'admin') {
                        localStorage.setItem('role', Response.role)
                        this.authService.setRole(Response.role);
                        this.router.navigate(['/home'])
                    }
                },
                error: (errors: HttpErrorResponse) => {
                    console.log(errors);
                    this.apiError = errors.error;
                }

            })
        }
        else {
            this.signInForm.markAllAsTouched();
        }
    }

    showPassword: boolean = false;

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

}
