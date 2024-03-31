import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatSnackBar,  MatSnackBarModule, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { HomeComponent } from './Components/Shared/home/home.component';
import { DoctorAppointmentComponent } from './Components/Core/Doctor/doctor-appointment/doctor-appointment.component';
import { DoctorProfileComponent } from './Components/Core/Doctor/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './Components/Core/Patient/patient-profile/patient-profile.component';
import { PaymentComponent } from './Components/Core/Patient/payment/payment.component';
import { PaymentDetailsComponent } from './Components/Core/Patient/payment-details/payment-details.component';
import { AppointmentDetailsComponent } from './Components/Core/Patient/appointment-details/appointment-details.component';
import { BookAppointmentComponent } from './Components/Core/Patient/book-appointment/book-appointment.component';
import { AllAppointmentsComponent } from './Components/Core/Patient/all-appointments/all-appointments.component';
import { ShowAllDoctorsComponent } from './Components/Core/Patient/show-all-doctors/show-all-doctors.component';
import { DoctorDetailsComponent } from './Components/Core/Patient/doctor-details/doctor-details.component';
import { LogInComponent } from './Components/Shared/log-in/log-in.component';
import { AddDoctorComponent } from './Components/Core/Admin/Doc-crud/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './Components/Core/Admin/Doc-crud/edit-doctor/edit-doctor.component';
import { AllDoctorsComponent } from './Components/Core/Admin/Doc-crud/all-doctors/all-doctors.component';
import { AllPatientsComponent } from './Components/Core/Admin/Pat-crud/all-patients/all-patients.component';
import { AddPatientComponent } from './Components/Core/Admin/Pat-crud/add-patient/add-patient.component';
import { EditPatientComponent } from './Components/Core/Admin/Pat-crud/edit-patient/edit-patient.component';
import { LogOutComponent } from './Components/Shared/log-out/log-out.component';
import { AppointmentRequestsComponent } from './Components/Core/Doctor/appointment-requests/appointment-requests.component';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { NotfoundComponent } from './Components/Shared/notfound/notfound.component';
import { DoctorSignUpComponent } from './Components/Core/Doctor/doctor-sign-up/doctor-sign-up.component';
import { DoctorSignInComponent } from './Components/Core/Doctor/doctor-sign-in/doctor-sign-in.component';
import { PatientSignInComponent } from './Components/Shared/sign-in/sign-in.component';
import { PatientSignUpComponent } from './Components/Core/Patient/patient-sign-up/patient-sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GenderPipe } from './Pipes/gender.pipe';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { AppstatusPipe } from './Pipes/appstatus.pipe';
import { UnauthorizedComponent } from './Components/Shared/unauthorized/unauthorized.component';
import { EditPatientProfileComponent } from './Components/Core/Patient/edit-patient-profile/edit-patient-profile.component';
import { EditDoctorProfileComponent } from './Components/Core/Doctor/edit-doctor-profile/edit-doctor-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    DoctorAppointmentComponent,
    DoctorProfileComponent,
    PatientProfileComponent,
    PaymentComponent,
    PaymentDetailsComponent,
    AppointmentDetailsComponent,
    BookAppointmentComponent,
    AllAppointmentsComponent,
    ShowAllDoctorsComponent,
    DoctorDetailsComponent,
    LogInComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    AllDoctorsComponent,
    AllPatientsComponent,
    AddPatientComponent,
    EditPatientComponent,
    LogOutComponent,
    AppointmentRequestsComponent,
    ContactusComponent,
    NotfoundComponent,
    DoctorSignUpComponent,
    DoctorSignInComponent,
    PatientSignInComponent,
    PatientSignUpComponent,
    GenderPipe,
    AppstatusPipe,
    UnauthorizedComponent,
    EditPatientProfileComponent,
    EditDoctorProfileComponent
  ],
  imports: [
    RatingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    MatProgressSpinnerModule, MatIconModule, MatSlideToggleModule, MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    NgxMatFileInputModule,
    MatNativeDateModule,
    MatDialogModule,
    MatOptionModule,
    DatePipe,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
