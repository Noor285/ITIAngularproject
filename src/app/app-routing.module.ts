import { DoctorAppointmentComponent } from './Components/Core/Doctor/doctor-appointment/doctor-appointment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { HomeComponent } from './Components/Shared/home/home.component';
import { NotfoundComponent } from './Components/Shared/notfound/notfound.component';
import { AllDoctorsComponent } from './Components/Core/Admin/Doc-crud/all-doctors/all-doctors.component';
import { AddDoctorComponent } from './Components/Core/Admin/Doc-crud/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './Components/Core/Admin/Doc-crud/edit-doctor/edit-doctor.component';
import { DoctorSignUpComponent } from './Components/Core/Doctor/doctor-sign-up/doctor-sign-up.component';
import { AllPatientsComponent } from './Components/Core/Admin/Pat-crud/all-patients/all-patients.component';
import { AddPatientComponent } from './Components/Core/Admin/Pat-crud/add-patient/add-patient.component';
import { EditPatientComponent } from './Components/Core/Admin/Pat-crud/edit-patient/edit-patient.component';
import { PatientSignInComponent } from './Components/Shared/sign-in/sign-in.component';
import { PatientSignUpComponent } from './Components/Core/Patient/patient-sign-up/patient-sign-up.component';
import { PatientProfileComponent } from './Components/Core/Patient/patient-profile/patient-profile.component';
import { PaymentComponent } from './Components/Core/Patient/payment/payment.component';
import { DoctorProfileComponent } from './Components/Core/Doctor/doctor-profile/doctor-profile.component';
import { PaymentDetailsComponent } from './Components/Core/Patient/payment-details/payment-details.component';
import { AppointmentRequestsComponent } from './Components/Core/Doctor/appointment-requests/appointment-requests.component';
import { UnauthorizedComponent } from './Components/Shared/unauthorized/unauthorized.component';
import { AllAppointmentsComponent } from './Components/Core/Patient/all-appointments/all-appointments.component';
import { EditDoctorProfileComponent } from './Components/Core/Doctor/edit-doctor-profile/edit-doctor-profile.component';
import { EditPatientProfileComponent } from './Components/Core/Patient/edit-patient-profile/edit-patient-profile.component';
import { PatientHomeComponent } from './Components/Core/Patient/patient-home/patient-home.component';
import { DoctorHomeComponent } from './Components/Core/Doctor/doctor-home/doctor-home.component';
import { ChangePasswordComponent } from './Components/Shared/change-password/change-password.component';
import { DoctorDetailsComponent } from './Components/Core/Patient/doctor-details/doctor-details.component';
import { BookAppointmentComponent } from './Components/Core/Patient/book-appointment/book-appointment.component';
import { EditScheduleComponent } from './Components/Core/Doctor/edit-schedule/edit-schedule.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactusComponent },

  {path: 'signin' , component:PatientSignInComponent, title:'Sign In' },
  {path: 'changepass' , component:ChangePasswordComponent, title:'change password' },

  { path: 'patient/signup', component: PatientSignUpComponent , title:'Patient Sign Up '},
  { path: 'patient/home', component: PatientHomeComponent , title:'Patient Home '},
  {path: 'patient/allpatients' , component:AllPatientsComponent, title:'Show All Patients' },
  {path:'patient/add', component: AddPatientComponent , title:'Add Patient'},
  {path: 'patient/edit/:patId' , component:EditPatientComponent },
  {path: 'patient/profile' , component:PatientProfileComponent },
  {path: 'patient/profile/edit/:patId' , component:EditPatientProfileComponent },
  {path: 'patient/docdetails' , component:DoctorDetailsComponent  },
  {path: 'patient/book' , component:BookAppointmentComponent  },
  {path: 'patient/patientprofial/payment' , component:PaymentComponent  },
  {path: 'patient/patientprofial/paymentdetails' , component:PaymentDetailsComponent },
  {path: 'patient/appointment' , component:AllAppointmentsComponent},

  {path: 'doctor/signup' , component:DoctorSignUpComponent, title:'Doctor Sign Up ' },
  {path: 'doctor/home' , component:DoctorHomeComponent, title:'Doctor Home' },
  {path: 'doctor/alldoctors' , component:AllDoctorsComponent, title:'Show All Doctors' },
  {path:'doctor/add', component: AddDoctorComponent , title:'Add Doctor'},
  {path: 'doctor/edit/:docId' , component:EditDoctorComponent },
  {path: 'doctor/appointment' , component:DoctorAppointmentComponent },
  {path: 'doctor/profile' , component:DoctorProfileComponent },
  {path: 'doctor/profile/edit/:docId' , component:EditDoctorProfileComponent },
  {path: 'doctor/appointment/req', component: AppointmentRequestsComponent},
  {path: 'doctor/schedule/edit', component: EditScheduleComponent},






  { path:'unauthorized', component:UnauthorizedComponent, title:'Unauthorized Access'},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
