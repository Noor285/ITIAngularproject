import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  id : number = parseInt(localStorage.getItem("id") ?? "");
  role : string = localStorage.getItem("role") ?? "";
  docProfileData:any;
  imgSrc : string = "assets/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
  constructor(private _DoctorService:DoctorService,private router:Router,private _snackBar: MatSnackBar){
  }
  ngOnInit(): void {
    if(Number.isNaN(this.id))
    {
      alert("you are not logged in");
      this.router.navigate(['patient/signin']);
      return;
    }
    else if (this.role != "doctor" && this.role != "patient" )
    {
      alert("you are not authorized to enter this page");
      this.router.navigate(['unauthorized']);
      return;
    }
    this._DoctorService.getProfileDoc(this.id).subscribe((res)=>{
      this.docProfileData=res;
      console.log(this.docProfileData);
    })
  }
}
