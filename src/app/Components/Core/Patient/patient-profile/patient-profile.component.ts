import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  id:any =1;
  patientProfile:any;
  rateDialog: boolean = false;
  selectedRating:any;
  additionalNotes: string = '';
  rateForm!: FormGroup;
  constructor(private _PatientService:PatientService) {



  }
  ngOnInit(): void {
    this._PatientService.getpatientProfileById(1).subscribe((res)=>{
      this.patientProfile=res;
      console.log(this.patientProfile);

    });


  }
  showDialog() {

    this.rateDialog= true;
  }


  submitRating(form: any) {
    // Process your form submission here
    console.log("Submitted Rating:", this.selectedRating);
    console.log("Additional Notes:", this.additionalNotes);
    console.log(form.value);
    // this._PatientService.postpatientRate(form.value).subscribe((res)=>{
    //   console.log(res);
    // });


    // Reset the form after submission
    form.resetForm();

  }

}
