import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPatient } from 'src/app/Models/i-patient';
import { PatientService } from 'src/app/Services/patient.service';
import { Status } from 'src/app/Enums/Status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  headElements = ['Name','Email','Phone','DOB', 'Gender', 'Edit', 'Remove'];
  patients: IPatient[] = [];
  pagedPatients: IPatient[] = [];
  currentPage = 1;
  pageSize = 10; // Number of items per page
  totalPages = 1;

  constructor(private fb: FormBuilder, private patientService: PatientService,private router :Router) { }


  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe((Patients: IPatient[]) => {
      this.patients = Patients;
      console.log(this.patients);

    });
  }

  navDoc(patId :any)
  {
    console.log(patId);
    this.router.navigate([`/doctor/edit/${patId}`]);

  }

  deletePat(patId: any): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(patId).subscribe({
        next: (response) => {
          console.log('Patient deleted successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting doctor:', error);
        }
      });
    }
  }


}
