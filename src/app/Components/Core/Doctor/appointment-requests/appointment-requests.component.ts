import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-appointment-requests',
  templateUrl: './appointment-requests.component.html',
  styleUrls: ['./appointment-requests.component.css']
})
export class AppointmentRequestsComponent implements OnInit {
  id:any;
  errRespon: any;
  IsWait: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  appoints: any = [];
  comingAppoint:any=[];
  backgroundUrl: any = 'assets/home/Vector.png';
  constructor(private _DoctorService: DoctorService, private _snackBar: MatSnackBar,private _Router:Router, private _ActivatedRoute:ActivatedRoute) { }
  ngAfterViewInit(): void {
    this.ngOnInit();
  }
  observerForAllAppoints = {
    next: (data: any) => {
      if (data.message == 'Done') {
        this.IsWait = false;
        this.appoints = data.appointments;
        // for (let i = 0; i < this.appoints.length; i++) {
        //   this.appointID = this.appoints[i]._id;
        //   console.log(this.appointID);
        // }
        //console.log(this.appoints);
        // console.log(this.appointID);
      }
    },
    error: (err: any) => { this.errRespon = err; this.openSnackBar() }
  }

  observerForAccept={
    next:(data:any)=> {console.log(data);this.msgOfAcc();this.ngOnInit();},
    error:(err:any)=>{/*this.errRespon=err*/ console.log(err)}
  };
  observerForCancel={
    next:(data:any)=> {console.log(data);this.msgOfRej();this.ngOnInit()},
    error:(err:any)=>{/*this.errRespon=err*/ console.log(err)}
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('doctorId'); // Assuming 'doctorId' is the parameter name
      if (this.id) {
        // this.loadAppointments();
        this._DoctorService.getAllAppoint(2).subscribe(this.observerForAllAppoints);
        console.log(this.observerForAllAppoints);

        this._DoctorService.getComingAppoint(2).subscribe((data)=>{
          console.log(data);

          if(data.message=='Done'){
            this.comingAppoint=data.appointments;
            console.log(this.comingAppoint);
        }
      });
      }
    });

  }

  acceptAppoint(id: any) {
    return this._DoctorService.acceptAppoint(2).subscribe(this.observerForAccept);
  }
  msgOfAcc(){
    this._snackBar.open('Appointment Accepted', 'done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  cancelAppoint(id:any){
    return this._DoctorService.cancelAppoint(2).subscribe(this.observerForCancel)
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
    return this._Router.navigate(['/profile','Patient', pID]);
  }

}
