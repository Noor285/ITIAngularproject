import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor.service';
import { FormGroup , FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { Speciality } from 'src/app/Models/speciality';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit ,  AfterViewInit {

  apiError:string = '';

  constructor(private router: Router,private doctorService: DoctorService) { }
  ngAfterViewInit(): void {
    this.getSpecialities();
  }

  createForm:FormGroup = new FormGroup({
    Name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    Email : new FormControl(null , [Validators.required, Validators.email]),
    // password : new FormControl(null , [Validators.required, Validators.minLength(6)]),
    NationalID : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{14}$/)]),
    SpecialityID : new FormControl(null , [Validators.required]),
    DOB : new FormControl(null , [Validators.required , Validators.min(new Date(1960, 12, 1).getTime()), Validators.max(new Date(2024, 2, 29).getTime())]),
    Gender : new FormControl(Gender.PreferNotToSay , [Validators.required]),
    Governance : new FormControl("", [Validators.required]),
    Address : new FormControl(null , [Validators.required]),
    Phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    AppointmentPrice : new FormControl(null , [Validators.required , Validators.min(100) , Validators.max(5000)]),
    Status : new FormControl(Status.Active),
  })

  specialities:any = [];
  selectedSpeciality!: number;

  gov:any = [];
  ngOnInit(): void {

  }

  getSpecialities(): void {
    this.doctorService.getAllSpecialities().subscribe( (res) =>{


      this.specialities=res;


      console.log(res);
      console.log(this.specialities[0].Name);
    })
  }


  handleAdd(createForm:FormGroup)
  {
    console.log(createForm.value);
    if(createForm.valid)
    {
      createForm.value.Gender = +createForm.value.Gender;
      createForm.value.Status = +createForm.value.Status;
      createForm.value.SpecialityID = +createForm.value.SpecialityID;

       this.doctorService.addDoctor(createForm.value).subscribe({
        next:(response) => {
          console.log('Doctor added successfully:', response);
          this.router.navigate(['/doctor/alldoctors']);
        },
        error:(error) =>
        {
          console.error(error);
          this.apiError = error.message;
        }
      });
    }
    else
        {
          this.createForm.markAllAsTouched();
        }
    // if(createForm.valid)
    // {
    //   createForm.value.gender = +createForm.value.gender;
    //   createForm.value.status = +createForm.value.status;

    //   console.log(createForm.value);

    //   this.doctorService.addDoctor(createForm.value).subscribe({
    //     next:(response) => {
    //       console.log('Doctor added successfully:', response);
    //       this.router.navigate(['/doctor/alldoctors']);
    //     },
    //     error:(error) =>
    //     {
    //       console.error(error);
    //       this.apiError = error.message;
    //     }
    //   });
    // }
    // else
    // {
    //   this.createForm.markAllAsTouched();
    // }
}






  // addDoctor(formData: FormGroup): void {
  //   if (formData.valid) {
  //     const newDoctor: IDoctor = {
  //       id: 0,
  //       name: formData.value.name,
  //       email: formData.value.email,
  //       password: formData.value.password,
  //       rePassword: formData.value.rePassword,
  //       nationalId:formData.value.nationalId,
  //       speciality: formData.value.speciality,
  //       dateOfBirth: formData.value.dateOfBirth,
  //       gender: formData.value.gender,
  //       gov: formData.value.gov,
  //       address: formData.value.address,
  //       phone: formData.value.phone,
  //       price: formData.value.price
  //     };

  //     this.doctorService.addDoctor(newDoctor).subscribe(() => {
  //       this.Doctors.push();
  //       formData.reset();
  //       this.router.navigate(['/doctor/alldoctors']);
  //     });
  //   }
  //   else
  //   {
  //     this.createForm.markAllAsTouched();
  //   }
  // }


  // addDoctor(createForm:FormGroup)
  // {
  //   console.log(createForm.value);
  //   if (this.createForm.valid) {
  //     this.sendEvent.emit(this.createForm.value);
  //     console.log("Hello data");
  //     this.createForm.reset();
  //     this.router.navigate(['/doctor/alldoctors']);

  //   } else {
  //     this.createForm.markAllAsTouched();
  //   }
  // }






  // constructor(private doctorService: DoctorService){}

  // name : string = '';
  // nationalId : number = 0;
  // email : string = '';
  // DOB : string = '';
  // gov : string = '';
  // address : string = '';
  // speciality : string = '';
  // gender : string = '';
  // phone : string = '';
  // price : number = 0;

  // AddDoctor(){
  //   var inputData = {
  //     name : this.name,
  //     nationalId : this.nationalId,
  //     email : this.email,
  //     DOB : this.DOB,
  //     gov : this.gov,
  //     address : this.address,
  //     speciality : this.speciality,
  //     gender : this.gender,
  //     phone : this.phone,
  //     price : this.price
  //   }

  //   this.doctorService.AddDoctor(inputData).subscribe({
  //     next: (res : any) => {
  //       console.log(res , 'response');

  //     },
  //     error: (err : any) => {
  //       console.log(err , 'errors');

  //     }
  //   });
  }


