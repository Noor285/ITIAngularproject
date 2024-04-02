import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent {
    id:number = parseInt(localStorage.getItem("id") ?? "");
    role:string = localStorage.getItem("role") ?? "";
    errRespon: any;
    IsWait: boolean = true;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    appoints: any = [];
    comingAppoint:any=[];
    backgroundUrl: any = 'assets/home/Vector.png';
    constructor(private _DoctorService: DoctorService, private _snackBar: MatSnackBar,private router:Router, private _ActivatedRoute:ActivatedRoute) { }
  
    observerForAccept={
      next:(data:any)=> {console.log(data);this.msgOfAcc();this.ngAfterViewInit();},
      error:(err:any)=>{/*this.errRespon=err*/ console.log(err)}
    };
    observerForCancel={
      next:(data:any)=> {console.log(data);this.msgOfRej();this.ngAfterViewInit()},
      error:(err:any)=>{/*this.errRespon=err*/ console.log(err)}
    };
  
    ngAfterViewInit(): void
    {
      if(Number.isNaN(this.id))
      {
        alert("you are not logged in");
        this.router.navigate(['signin']);
        return;
      }
      else if (this.role != "doctor")
      {
        alert("you are not authorized to enter this page");
        this.router.navigate(['unauthorized']);
        return;
      }
      // this.loadAppointments();
      this._DoctorService.getAllAppointNoReq(this.id).subscribe((res)=>{
        this.IsWait = false;
        console.log(res);
        this.comingAppoint = res;
      });
  
    }
  
    acceptAppoint(id: any) {
      return this._DoctorService.acceptAppoint(id).subscribe((res)=>{
        console.log(res);
        this.ngAfterViewInit();
      });
    }
    msgOfAcc(){
      this._snackBar.open('Appointment Accepted', 'done', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    cancelAppoint(id:any){
      return this._DoctorService.cancelAppoint(id).subscribe((res)=>{
        console.log(res);
        this.ngAfterViewInit();
      });;
    }
    msgOfRej(){
      this._snackBar.open('Appointment Canceled', 'done', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    openSnackBar() {
      this._snackBar.open(this.errRespon.error.message, 'retry', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    openSnackBarForSuccess() {
      this._snackBar.open('Appoint is confirmed', 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    openSnackBarForCancel() {
      this._snackBar.open('Appoint is Canceld', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  
    openPatientProfile(pID: any = 1) {
      return this.router.navigate(['/profile','Patient', pID]);
    }
}
