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
  
      this._PatientService.getAllAppointments(this.id).subscribe((res)=>{
        this.appointmentDocs = res;
        console.log(res);
      });
    }
   
    public rateForm:FormGroup = new FormGroup({
        score:new FormControl(""),
        notes:new FormControl(""),
      });
    
    
    
      submitRating(formData:FormGroup){
        console.log(formData.value.score);
        console.log("Additional Notes:", formData.value.notes);
        this._PatientService.postpatientRate(formData.value).subscribe((res)=>{
                console.log(res);
              });

        formData.reset();

      }

}
