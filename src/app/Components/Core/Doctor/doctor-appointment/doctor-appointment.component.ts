import { IAppointment } from './../../../../Models/appointment';
import { Status } from './../../../../Enums/Status';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStatus } from 'src/app/Enums/AppStatus';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit ,AfterViewInit {

  id : number = parseInt(localStorage.getItem("id") ?? "");
  docID : number = parseInt(this.activatedroute.snapshot.paramMap.get("docId") ?? `${this.id}`) ;
  role : string = localStorage.getItem("role") ?? "";
  docProfileData:any;
  imgSrc : string = "assets/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
  dates : Date[] | null[] = [null,null,null,null,null,null,null]
  order : number | undefined ;
  constructor(private activatedroute: ActivatedRoute,private _DoctorService:DoctorService,private router:Router,private _snackBar: MatSnackBar, private _PatientService:PatientService){
  
}
    ngAfterViewInit(): void {
        let date : Date = new Date();
        let number = date.getDay();
        console.log(number);
        while(this.dates[number%7] == null)
        {
            this.dates[number%7] = new Date(date);
            
            number++;
            date.setDate(date.getDate() + 1);
        }
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
    this._DoctorService.getProfileDoc(this.docID).subscribe((res)=>{
      this.docProfileData=res;
      console.log(this.docProfileData);
    })
    
  }
  navDoc(docId :any)
  {
    console.log(docId);
    this.router.navigate([`/doctor/profile/edit/${docId}`]);

  }

  bookApp(day:number){
    let date = this.dates[day]!.toLocaleDateString("en-CA");
    let createdDate = new Date().toLocaleDateString("en-CA");
    let patientID = this.id;
    let doctorID = this.docProfileData.doctor.id;
    let status = AppStatus.Pending;


    this._PatientService.getOrder(date).subscribe((res)=>{
        let appointment : IAppointment = {
            doctorID : doctorID,
            status: status,
            patientID: patientID,
            date : date,
            createdDate : createdDate,
            order: parseInt(res),
            id : undefined
        }
        if(confirm(`Are you sure you want to book an appointment at ${this.dates[day]?.toDateString()} ?`))
        {
            this._PatientService.addAppointment(appointment).subscribe((res)=>{
                alert("Appointment made successfully, await the doctor's response")
            },
            (error)=>{
                alert(error.error); 
            })
        }
    })
    
    console.log();
  }

  
}
