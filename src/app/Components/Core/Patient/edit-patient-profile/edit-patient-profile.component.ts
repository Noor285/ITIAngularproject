import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { IPatient } from 'src/app/Models/i-patient';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-edit-patient-profile',
  templateUrl: './edit-patient-profile.component.html',
  styleUrls: ['./edit-patient-profile.component.css']
})
export class EditPatientProfileComponent {

  patId :any = localStorage.getItem("id") ?? "";
  recePat : any;


//  handleUpdate(){}
  constructor(private router: Router, private activatedroute: ActivatedRoute, private PatientService: PatientService) {
    this.patId = this.activatedroute.snapshot.paramMap.get("patId");
    console.log(this.patId);

   }

  editForm = new FormGroup({
    id: new FormControl(''), // Assuming the patient ID is required for editing
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl(Gender.PreferNotToSay, [Validators.required]),
    status: new FormControl(Status.Active),
  });



  ngOnInit(): void {


    this.PatientService.getPatientById(this.patId).subscribe((res) => {
      console.log(res);
      this.recePat = res;
      this.editForm.controls['id'].setValue(this.recePat.id);
      this.editForm.controls['name'].setValue(this.recePat.name);
      this.editForm.controls['email'].setValue(this.recePat.email)
      this.editForm.controls['dateOfBirth'].setValue(this.recePat.dob)
      this.editForm.controls['gender'].setValue(this.recePat.gender)
      this.editForm.controls['phone'].setValue(this.recePat.phone)
      this.editForm.controls['status'].setValue(this.recePat.status)
    })
  }

  handleEdit(): void {
    if (this.editForm.valid) {
    console.log(this.editForm.value);
    this.editForm.value.gender = +this.editForm.value.gender!;
    this.editForm.value.status = +this.editForm.value.status!;

    console.log(this.editForm);
     this.PatientService.editPatient(this.editForm.value as IPatient).subscribe({
      next:(response) => {
        console.log('Edit added successfully:', response);
        // this.handleUpdate();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
         this.router.navigate(['/patient/profile']); // Replace '/your-route' with the route you want to navigate to after editing
        })
      },
      error:(error) =>
      {
        console.error(error);
      }
    });
  }
  else {
        this.editForm.markAllAsTouched();
      }

  }
}
