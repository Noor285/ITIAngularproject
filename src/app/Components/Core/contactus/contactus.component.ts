import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:new FormControl ('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]),
      message: new FormControl('', [Validators.required,Validators.minLength(7)])
    });
  }
   get nameConttrol() {
    return this.contactForm.controls['name'];
  }
  get emailConttrol() {
    return this.contactForm.controls['email'];
  }
  get messageConttrol() {
    return this.contactForm.controls['message'];
  }

  
  onSubmit(): void {
    if (this.contactForm.valid) {
      // Process form submission (e.g., send email)
      console.log('Form submitted:', this.contactForm.value);

      // Reset form after submission
      this.contactForm.reset();
    } else {
      // Form is invalid, handle validation errors
      console.log('Form is invalid. Please fill in all required fields correctly.');
    }
  }
}
