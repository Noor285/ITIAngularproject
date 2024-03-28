import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/patient.service';
import { Status } from 'src/app/Enums/Status';
import { Gender } from 'src/app/Enums/Gender';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  constructor(private router: Router,private patientService: PatientService) { }

  createForm:FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl(Gender.PreferNotToSay, [Validators.required]),
      status:new FormControl(Status.Active, [Validators.required]),
    })


handleAdd(createForm:FormGroup)
  {
    if(createForm.valid)
    {
      createForm.value.gender = +createForm.value.gender;
      createForm.value.status = +createForm.value.status;

      console.log(createForm.value);

      this.patientService.addPatient(createForm.value).subscribe({
        next:(response) => {
          console.log('Patient added successfully:', response);
          this.router.navigate(['/patient/allpatients']);
        },
        error:(error) =>
        {
          console.error('Error adding patient:', error);
        }
      });
    }
    else
    {
      this.createForm.markAllAsTouched();
    }
}


// addPatient(formData: FormGroup): void {
//   if (formData.valid) {
//     const newPatient: IPatient = {
//       Id: 0,
//       Name: formData.value.name,
//       Email: formData.value.email,
//       DOB: formData.value.dateOfBirth,
//       Gender: formData.value.gender,
//       Phone: formData.value.phone,
//       Status: formData.value.status,
//     };

//     console.log(newPatient);

//     this.patientService.addPatient(newPatient).subscribe(() => {
//       this.Patients.push();
//       formData.reset();
//       this.router.navigate(['/patient/allpatients']);
//     });
//   }
//   else
//   {
//     this.createForm.markAllAsTouched();
//   }
// }

}
