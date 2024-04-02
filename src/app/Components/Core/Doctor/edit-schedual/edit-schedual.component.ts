import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/Services/doctor.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-schedual',
  templateUrl: './edit-schedual.component.html',
  styleUrls: ['./edit-schedual.component.css']
})
export class EditSchedualComponent {
    id: number = parseInt(localStorage.getItem('id') ?? '');
    role : string = localStorage.getItem("role") ?? "" ;
    editSchedualForm: FormGroup;
    recePat: any | null = null;
 
 
constructor(
    private router:Router , private _DoctorService:DoctorService , 
    private formBuilder: FormBuilder, 
    private activatedroute :ActivatedRoute,
){
    this.editSchedualForm = this.formBuilder.group({
        saturday: [null],
        sunday: [null, Validators.required],
        monday: [null, Validators.required],
        tuesday: [null, Validators.required],
        wednesday: [null, Validators.required],
        thursday: [null, Validators.required],
        friday: [null, Validators.required],
        doctorID: [null, Validators.required]
      });



}

    ngOnInit(): void {
        this.activatedroute.params.subscribe(params => {
            const patId = params['patId'];
            this._DoctorService.getSchedule(patId).subscribe(res => {
              this.recePat = res;
              this.editSchedualForm.patchValue(this.recePat);
            });
          });
    }


    handleEdit(): void {
        if (this.editSchedualForm.valid) {
          this._DoctorService.editSchedule(this.editSchedualForm.value).subscribe({
            next: (response) => {
              console.log('Edit added successfully:', response);
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/doctor/schedual/details']);
              });
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
        } else {
          this.editSchedualForm.markAllAsTouched();
        }
      }
}
