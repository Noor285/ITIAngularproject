import { ISingleDocAppointment } from './../../../../Models/SingleDoctorAppointment';
import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAppointment } from 'src/app/Models/appointment';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements AfterViewInit {
  constructor(private _PatientService:PatientService , private _DoctorService:DoctorService){}
  ngAfterViewInit(): void {

    this._PatientService.getAllAppointments(1).subscribe((res)=>{
      this.appointmentDocs = res;
      console.log(res);
    });
  }
  appointmentDocs! : ISingleDocAppointment[];
  id:any =1;
  patientProfile:any;
  rateDialog: boolean = false;
  selectedRating:any;
  additionalNotes: string = '';
  rateForm!: FormGroup;

  showDialog() {

    this.rateDialog= true;
  }

  submitRating(form: any, event: Event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Process your form submission here
    console.log("Submitted Rating:", this.selectedRating);
    console.log("Additional Notes:", this.additionalNotes);
    console.log(form.value);
    // Close the dialog
    this.rateDialog = false;
  
    // Reset the form after submission
    form.resetForm();
  }
}
