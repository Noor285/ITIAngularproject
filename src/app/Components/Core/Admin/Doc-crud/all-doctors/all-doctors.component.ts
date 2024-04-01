import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDoctor } from 'src/app/Models/i-doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import { Status } from 'src/app/Enums/Status';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent implements  AfterViewInit {

  headElements = ['Name', 'Email','password','National ID', 'Specialty', 'DOB','Gender','Governorate','Address', 'Phone', 'AppointmentPrice','Edit', 'Remove'];

  Doctors: IDoctor[] = [];
  // pagedDoctors: IDoctor[] = [];
  // currentPage = 1;
  // pageSize = 10; // Number of items per page
  // totalPages = 1;


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

  navDoc(docId :any)
  {
    console.log(docId);
    this.router.navigate([`/doctor/edit/${docId}`]);

  }


  deleteDoc(docId: any): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(docId).subscribe({
        next: (response) => {
          console.log('Doctor deleted successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting doctor:', error);
          // Handle error accordingly (e.g., display error message)
        }
      });
    }
  }

}
