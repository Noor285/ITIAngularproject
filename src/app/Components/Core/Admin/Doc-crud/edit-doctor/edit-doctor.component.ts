import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit  {




  docId :any;
  receDoc : any;

 handleUpdate(){}
  constructor(private router: Router, private activatedroute: ActivatedRoute, private doctorService: DoctorService) {
    this.docId = this.activatedroute.snapshot.paramMap.get("docId");
    console.log(this.docId);
   }

   editForm :FormGroup = new FormGroup({
    id : new FormControl(null),
    name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    email : new FormControl(null , [Validators.required, Validators.email]),
    nationalID : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{14}$/)]),
    specialityID : new FormControl(null , [Validators.required]),
    dob : new FormControl(null , [Validators.required ]),
    gender : new FormControl(Gender.PreferNotToSay , [Validators.required]),
    governance : new FormControl("", [Validators.required]),
    address : new FormControl(null , [Validators.required]),
    phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    appointmentPrice : new FormControl(null , [Validators.required , Validators.min(100) , Validators.max(5000)]),
    status : new FormControl(Status.Active),
  });

  ngOnInit(): void {

    this.getSpecialities()

    // this.editForm = new FormGroup({
    //   Name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    //   Email : new FormControl(null , [Validators.required, Validators.email]),
    //   NationalID : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{14}$/)]),
    //   SpecialityID : new FormControl(null , [Validators.required]),
    //   DOB : new FormControl(null , [Validators.required , Validators.min(new Date(1960, 12, 1).getTime()), Validators.max(new Date(2024, 2, 29).getTime())]),
    //   Gender : new FormControl(Gender.PreferNotToSay , [Validators.required]),
    //   Governance : new FormControl("", [Validators.required]),
    //   Address : new FormControl(null , [Validators.required]),
    //   Phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    //   AppointmentPrice : new FormControl(null , [Validators.required , Validators.min(100) , Validators.max(5000)]),
    //   Status : new FormControl(Status.Active),
    // });


    this.doctorService.getDoctorById(this.docId).subscribe((res) => {
      console.log();

      this.receDoc = res;
    this.editForm.controls['id'].setValue(this.receDoc.id);
    this.editForm.controls['name'].setValue(this.receDoc.name);
    this.editForm.controls['email'].setValue(this.receDoc.email)
    this.editForm.controls['nationalID'].setValue(this.receDoc.nationalID)
    this.editForm.controls['dob'].setValue(new Date(res.dob).toISOString().split("T")[0]);
    this.editForm.controls['governance'].setValue(this.receDoc.governance)
    this.editForm.controls['gender'].setValue(this.receDoc.gender)
    this.editForm.controls['address'].setValue(this.receDoc.address)
    this.editForm.controls['specialityID'].setValue(this.receDoc.specialityID)
    this.editForm.controls['phone'].setValue(this.receDoc.phone)
    this.editForm.controls['appointmentPrice'].setValue(this.receDoc.appointmentPrice)
    this.editForm.controls['status'].setValue(this.receDoc.status)
    })
  }

  // SetFrom(){
  //   this.editForm.controls['name'].setValue(this.receDoc.name);
  //   this.editForm.controls['email'].setValue(this.receDoc.email)
  //   this.editForm.controls['nationalID'].setValue(this.receDoc.nationalID)
  //   this.editForm.controls['dob'].setValue(this.receDoc.dob)
  //   this.editForm.controls['governance'].setValue(this.receDoc.governance)
  //   this.editForm.controls['gender'].setValue(this.receDoc.gender)
  //   this.editForm.controls['address'].setValue(this.receDoc.address)
  //   this.editForm.controls['specialityID'].setValue(this.receDoc.specialityID)
  //   this.editForm.controls['phone'].setValue(this.receDoc.phone)
  //   this.editForm.controls['appointmentPrice'].setValue(this.receDoc.appointmentPrice)
  //   this.editForm.controls['status'].setValue(this.receDoc.status)
  // }


  specialities:any = [];
  selectedSpeciality!: number;

  getSpecialities(): void {
    this.doctorService.getAllSpecialities().subscribe( (res) =>{


      this.specialities=res;


      console.log(res);
      console.log(this.specialities[0].name);
    })
  }


  // fetchPatientDetails(): void {
  //   const patientId = this.router.snapshot.params['id']; // Assuming the patient ID is retrieved from the route parameter
  //   this.doctorService.getDoctorById(patientId).subscribe({
  //     next: (doc) => {
  //       // Populate the form with the patient details
  //       this.editForm.patchValue(doctor);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching patient details:', error);
  //     }
  //   });
  // }

  handleEdit(): void {
    console.log( this.editForm.valid)
    if (this.editForm.valid) {


      this.editForm.value.gender = +this.editForm.value.gender;
      this.editForm.value.status = +this.editForm.value.status;
      this.editForm.value.specialityID = +this.editForm.value.specialityID;

      console.log(this.editForm);
        this.doctorService.editDoctor(this.editForm.value).subscribe({
        next:(response) => {
          console.log('Edit added successfully:', response);
          this.handleUpdate();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/doctor/alldoctors']); // Replace '/your-route' with the route you want to navigate to after editing
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

  //   if (this.editForm.valid) {
  //     this.editForm.value.gender = +this.editForm.value.gender;
  //     this.editForm.value.status = +this.editForm.value.status;

  //     this.doctorService.editDoctor(this.editForm.value).subscribe({
  //       next: (response) => {
  //         console.log('Doctor updated successfully:', response);
  //         this.router.navigate(['/doctor/alldoctors']);
  //       },
  //       error: (error) => {
  //         console.error('Error updating Doctor:', error);

  //       }
  //     });
  //   } else {
  //     this.editForm.markAllAsTouched();
  //   }
  }


}
