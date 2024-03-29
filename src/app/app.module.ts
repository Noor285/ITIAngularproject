import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { DoctorSignUpComponent } from './Components/Core/Doctor/doctor-sign-up/doctor-sign-up.component';
import { DoctorSignInComponent } from './Components/Core/Doctor/doctor-sign-in/doctor-sign-in.component';
import { PatientSignInComponent } from './Components/Core/Patient/patient-sign-in/patient-sign-in.component';
import { PatientSignUpComponent } from './Components/Core/Patient/patient-sign-up/patient-sign-up.component';
import { RatedoctorComponent } from './Components/Core/Patient/ratedoctor/ratedoctor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GenderPipe } from './Pipes/gender.pipe';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { AppstatusPipe } from './Pipes/appstatus.pipe';

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
    RatedoctorComponent,
    GenderPipe,
    AppstatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    RatingModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
