import { ISingleDocAppointment } from './../../../../Models/SingleDoctorAppointment';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAppointment } from 'src/app/Models/appointment';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements AfterViewInit {

    appointmentDocs! : ISingleDocAppointment[];
    id: any = localStorage.getItem("id") ?? "";


    constructor(private _PatientService:PatientService , private _DoctorService:DoctorService){}

    ngAfterViewInit(): void {
  
      this._PatientService.getAllAppointments(1).subscribe((res)=>{
        this.appointmentDocs = res;
        console.log(res);
      });
    }
   
    public rateForm:FormGroup = new FormGroup({
        rating:new FormControl(""),
        discription:new FormControl(""),
      });
    
    
    
      submitRating(formData:FormGroup){
        console.log(formData.value.rating);
        console.log("Additional Notes:", formData.value.discription);
        this._PatientService.postpatientRate(formData.value).subscribe((res)=>{
                console.log(res);
              });

        formData.reset();

      }
  

    // showDialog() {
  
    //   this.rateDialog= true;
    // }
  
  
    // submitRating(form: any) {
    //   // Process your form submission here
    //   console.log("Submitted Rating:", this.selectedRating);
    //   console.log("Additional Notes:", this.additionalNotes);
    //   console.log(form.value);
    //   // this._PatientService.postpatientRate(form.value).subscribe((res)=>{
    //   //   console.log(res);
    //   // });
  
  
    //   // Reset the form after submission
    //   form.resetForm();
  
    // }


}
