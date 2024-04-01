import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent {

    backgroundUrl: any = 'assets/home/Vector.png';

    Doctors: IDoctor[] = [];

    constructor(private doctorService: DoctorService ,private router :Router) {}


    ngAfterViewInit(): void {
        this.loadDoctors();
      }
    
      loadDoctors(): void {
        this.doctorService.getAllDoctors().subscribe((doctors: IDoctor[]) => {
          this.Doctors = doctors;
          console.log(this.Doctors);
    
        });
      }

}
