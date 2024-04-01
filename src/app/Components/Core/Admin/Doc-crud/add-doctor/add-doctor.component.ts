import { IDoctor } from 'src/app/Models/i-doctor';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor.service';
import { FormGroup , FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Enums/Gender';
import { Status } from 'src/app/Enums/Status';
import { Speciality } from 'src/app/Models/speciality';
import { IDoctorAdd } from 'src/app/Models/doctorAddDTO';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})


export class AddDoctorComponent implements OnInit ,  AfterViewInit {

    apiError:string = '';
    egyptGovernorates: string[] = [
    "Ad Dakahlia",
    "Al Bahr al Ahmar",
    "Al Buhayrah",
    "Al Fayoum",
    "Al Gharbia",
    "Alexandria",
    "Aswan",
    "Assyut",
    "Beni Suef",
    "Cairo",
    "Daqahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr el-Sheikh",
    "Luxor",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Red Sea",
    "Sharqia",
    "South Sinai",
    "Suez",
    "Suhag",
  ];
  constructor(private router: Router,private doctorService: DoctorService) { }
  ngAfterViewInit(): void {
    this.getSpecialities();
  }

  enforceMinMaxPhone(el : any) {
    el = el.target;
    console.log(el.value.split("").length);
    if(el.value.split("").length > 10)
    {
        console.log(el.value.split("").slice(0,11).join(""));
        let elBefore = el.value.split("").slice(0,11).join("");
        this.createForm.controls['Phone'].setValue(elBefore);
    }
  }

  enforceMinMaxNationalID(el : any) {
    el = el.target;
    console.log(el.value.split("").length);
    if(el.value.split("").length > 13)
    {
        console.log(el.value.split("").slice(0,14).join(""));
        let elBefore = el.value.split("").slice(0,14).join("");
        this.createForm.controls['NationalID'].setValue(elBefore);
    }
  }

  createForm:FormGroup = new FormGroup({
    Name : new FormControl(null , [Validators.required , Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    Email : new FormControl(null , [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password : new FormControl(null),
    NationalID : new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{14}$/)]),
    SpecialityID : new FormControl(null , [Validators.required]),
    DOB : new FormControl(null , [Validators.required]),
    Gender : new FormControl(Gender.Male , [Validators.required]),
    Governance : new FormControl("Monufia", [Validators.required]),
    Address : new FormControl(null , [Validators.required]),
    Phone : new FormControl(null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    AppointmentPrice : new FormControl(null , [Validators.required , Validators.min(100) , Validators.max(5000)]),
    Status : new FormControl(Status.Active),
  })

  specialities:any = [];
  selectedSpeciality!: number;
  date : Date = new Date();
  dateMax : string = new Date(this.date.getFullYear() - 25 , this.date.getMonth() , this.date.getDay()).toISOString().split("T")[0];
  dateMin : string = new Date(this.date.getFullYear() - 80 , this.date.getMonth() , this.date.getDay()).toISOString().split("T")[0];


  gov:any = [];
  ngOnInit(): void {
    this.dateMax = new Date(this.date.getFullYear() - 25 , this.date.getMonth() , this.date.getDay()).toISOString().split("T")[0];
    this.dateMin = new Date(this.date.getFullYear() - 80 , this.date.getMonth() , this.date.getDay()).toISOString().split("T")[0];

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
      createForm.value.password = "123456789sS";
      let doctor : IDoctor = createForm.value;
      let doctorAdd : IDoctorAdd = {
        Doctor : doctor,
        password : createForm.value.password
      };
     

       this.doctorService.addDoctor(doctorAdd).subscribe({
        next:(response) => {
          console.log('Doctor added successfully:', response);
          this.router.navigate(['/doctor/alldoctors']);
        },
        error:(error) =>
        {
          console.error(error);
          this.apiError = error.error;
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


