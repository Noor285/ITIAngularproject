import { Component } from '@angular/core';

@Component({
  selector: 'app-ratedoctor',
  templateUrl: './ratedoctor.component.html',
  styleUrls: ['./ratedoctor.component.css']
})
export class RatedoctorComponent {

  selectedRating: string = '';
  additionalNotes: string = '';

  constructor() { }

  submitRating(form: any) {
    // Process your form submission here
    console.log("Submitted Rating:", this.selectedRating);
    console.log("Additional Notes:", this.additionalNotes);

    // Reset the form after submission
    form.resetForm();
  }
}