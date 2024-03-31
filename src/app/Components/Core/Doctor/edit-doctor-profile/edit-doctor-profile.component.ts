import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-edit-doctor-profile',
  templateUrl: './edit-doctor-profile.component.html',
  styleUrls: ['./edit-doctor-profile.component.css']
})
export class EditDoctorProfileComponent {

  docId :any = localStorage.getItem("id") ?? "";
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


  specialities:any = [];
  selectedSpeciality!: number;

  getSpecialities(): void {
    this.doctorService.getAllSpecialities().subscribe( (res) =>{


      this.specialities=res;


      console.log(res);
      console.log(this.specialities[0].name);
    })
  }


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
            this.router.navigate(['/doctor/profile']); // Replace '/your-route' with the route you want to navigate to after editing
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
