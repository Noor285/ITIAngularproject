import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit  {
  openSnackBar() {
    throw new Error('Method not implemented.');
  }
  docId : any = 2;
  docProfileData:any;
  errRespon:any;
  comingAppoint:any=[];
  IsWait: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  observerForProfileDoc={
    next:(data:any)=>{
      if (data.message = 'Done') {
        this.docProfileData=data.doctor;
        this.IsWait=false;
        console.log(this.docProfileData);
      }
    },
    error:(err:any)=>{this.errRespon=err;this.openSnackBar()}
  }
  constructor(private _DoctorService:DoctorService,private _Router:Router,private _snackBar: MatSnackBar){
  }
  ngOnInit(): void {
    this._DoctorService.getProfileDoc(2).subscribe((res)=>{
      this.docProfileData=res;
      console.log(this.docProfileData);
    })
    this._DoctorService.getProfileDoc(this.docId).subscribe(this.observerForProfileDoc);
    console.log(this.docProfileData);
  //   this._DoctorService.getComingAppoint(1).subscribe((data)=>{
  //     if(data.message=='Done'){
  //       this.comingAppoint=data.appointments;
  //       console.log(this.comingAppoint);
  //     }
  // });
  }
  //handel error
  // openSnackBar() {
  //   this._snackBar.open(this.errRespon.error.message, 'retry', {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //   });
  // }
  // openPatientProfile(pID: any) {
  //   return this._Router.navigate(['/profile','Patient', pID]);
  // }

}
