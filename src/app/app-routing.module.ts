import { DoctorAppointmentComponent } from './Components/Core/Doctor/doctor-appointment/doctor-appointment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { HomeComponent } from './Components/Shared/home/home.component';
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { LogInComponent } from './Components/Shared/log-in/log-in.component';
import { AllDoctorsComponent } from './Components/Core/Admin/Doc-crud/all-doctors/all-doctors.component';
import { AddDoctorComponent } from './Components/Core/Admin/Doc-crud/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './Components/Core/Admin/Doc-crud/edit-doctor/edit-doctor.component';
import { DoctorSignUpComponent } from './Components/Core/Doctor/doctor-sign-up/doctor-sign-up.component';
import { AllPatientsComponent } from './Components/Core/Admin/Pat-crud/all-patients/all-patients.component';
import { AddPatientComponent } from './Components/Core/Admin/Pat-crud/add-patient/add-patient.component';
import { EditPatientComponent } from './Components/Core/Admin/Pat-crud/edit-patient/edit-patient.component';
import { DoctorSignInComponent } from './Components/Core/Doctor/doctor-sign-in/doctor-sign-in.component';
import { PatientSignInComponent } from './Components/Core/Patient/patient-sign-in/patient-sign-in.component';
import { PatientSignUpComponent } from './Components/Core/Patient/patient-sign-up/patient-sign-up.component';
import { PatientProfileComponent } from './Components/Core/Patient/patient-profile/patient-profile.component';
import { PaymentComponent } from './Components/Core/Patient/payment/payment.component';
import { RatedoctorComponent } from './Components/Core/Patient/ratedoctor/ratedoctor.component';
import { DoctorProfileComponent } from './Components/Core/Doctor/doctor-profile/doctor-profile.component';
import { PaymentDetailsComponent } from './Components/Core/Patient/payment-details/payment-details.component';
import { AllAppointmentsComponent } from './Components/Core/Patient/all-appointments/all-appointments.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactusComponent },

  { path: 'login', component: LogInComponent },

  { path: 'patient/signup', component: PatientSignUpComponent , title:'Patient Sign Up '},
  {path: 'patient/signin' , component:PatientSignInComponent, title:'Patient Sign In ' },
  {path: 'patient/allpatients' , component:AllPatientsComponent, title:'Show All Patients' },
  {path:'patient/add', component: AddPatientComponent , title:'Add Patient'},
  {path: 'patient/edit/:patId' , component:EditPatientComponent , },
  {path: 'patient/appointments' , component:AllAppointmentsComponent, title:'Appointments'},
  {path: 'patient/profile' , component:PatientProfileComponent , },
  {path: 'patient/patientprofial/payment' , component:PaymentComponent , },
  {path: 'patient/patientprofial/paymentdetails' , component:PaymentDetailsComponent },
  {path: 'patient/patientprofial/rateDoctor' , component:RatedoctorComponent , },

  {path: 'doctor/signup' , component:DoctorSignUpComponent, title:'Doctor Sign Up ' },
  {path: 'doctor/signin' , component:DoctorSignInComponent, title:'Doctor Sign In ' },
  {path: 'doctor/alldoctors' , component:AllDoctorsComponent, title:'Show All Doctors' },
  {path:'doctor/add', component: AddDoctorComponent , title:'Add Doctor'},
  {path: 'doctor/edit/:docId' , component:EditDoctorComponent },
  {path: 'doctor/appointment' , component:DoctorAppointmentComponent },
  {path: 'doctor/profile' , component:DoctorProfileComponent },


  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
