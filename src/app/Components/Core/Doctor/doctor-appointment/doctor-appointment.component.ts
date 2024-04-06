import { scheduleDay } from './../../../../Models/scheduleDay';
import { UserService } from './../../../../Services/user.service';
import { IAppointment } from './../../../../Models/appointment';
import { Status } from './../../../../Enums/Status';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStatus } from 'src/app/Enums/AppStatus';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient.service';
import { changePic } from 'src/app/Models/changePic';
import { userInfo } from 'src/app/Models/userInfo';
import { userBasicInfo } from 'src/app/Models/userBasicInfo';
import { CarouselModule } from 'primeng/carousel';
import { IAddDocument } from 'src/app/Models/DocAddDocument';
import { DocumentType } from 'src/app/Enums/DocumentType';

@Component({
    selector: 'app-doctor-appointment',
    templateUrl: './doctor-appointment.component.html',
    styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit, AfterViewInit {

    id: number = parseInt(localStorage.getItem("id") ?? "");
    docID: number = parseInt(this.activatedroute.snapshot.paramMap.get("docId") ?? `${this.id}`);
    role: string = localStorage.getItem("role") ?? "";
    docProfileData: any;
    imgSrc: string = "assets/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
    dates: scheduleDay[] | null[] | undefined | null = [null, null, null, null, null, null, null]
    order: number | undefined;
    constructor(private _userService: UserService, private activatedroute: ActivatedRoute, private _DoctorService: DoctorService, private router: Router, private _snackBar: MatSnackBar, private _PatientService: PatientService) {

    }
    weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    weekSchedule: string[] = [];
    ngAfterViewInit(): void {

    }
    ngOnInit(): void {
        this._DoctorService.getProfileDoc(this.docID).subscribe((res) => {
            this.docProfileData = res;
            console.log(this.docProfileData);
            this.weekSchedule.push(this.docProfileData.schedule.sunday)
            this.weekSchedule.push(this.docProfileData.schedule.monday)
            this.weekSchedule.push(this.docProfileData.schedule.tuesday)
            this.weekSchedule.push(this.docProfileData.schedule.wednesday)
            this.weekSchedule.push(this.docProfileData.schedule.thursday)
            this.weekSchedule.push(this.docProfileData.schedule.friday)
            this.weekSchedule.push(this.docProfileData.schedule.saturday)
            let date: Date = new Date();
            let number = date.getDay();
            console.log(this.docProfileData);
            while (this.dates![number % 7] == null) {
                this.dates![number % 7] = {
                    date: new Date(date),
                    day: this.weekdays[number % 7],
                    time: this.weekSchedule[number % 7]
                };

                number++;
                date.setDate(date.getDate() + 1);
            }
            this.dates?.sort((a : any,b : any)=>{
                return a?.date - b?.date;
            })
        })

    }
    navDoc(docId: any) {
        console.log(docId);
        this.router.navigate([`/doctor/profile/edit/${docId}`]);

    }
    status: Status = parseInt(localStorage.getItem("status")??"") as Status;
    bookApp(day: number | undefined) {
        

        if (isNaN(this.id)) this.router.navigate(['signin']);
        if (day == undefined) return;
        let date = this.dates![day]!.date.toLocaleDateString("en-CA");
        let createdDate = new Date().toLocaleDateString("en-CA");
        let patientID = this.id;
        let doctorID = this.docProfileData.doctor.id;
        let status = AppStatus.Pending;


        this._PatientService.getOrder(date).subscribe((res) => {
            let appointment: IAppointment = {
                doctorID: doctorID,
                status: status,
                patientID: patientID,
                date: date,
                createdDate: createdDate,
                order: parseInt(res),
                id: undefined
            }
            if (confirm(`Are you sure you want to book an appointment at ${this.dates![day]?.date.toDateString()} ?`)) {
                this._PatientService.addAppointment(appointment).subscribe((res) => {
                    alert("Appointment made successfully, await the doctor's response")
                },
                    (error) => {
                        alert(error.error);
                    })
            }
        })

        console.log();
    }



    @ViewChild("file") file: ElementRef | undefined;
    uploadEvent() {

        this.file?.nativeElement.click()
    }
    @ViewChild("certAdd") certAdd: ElementRef | undefined;
    uploadCertEvent() {

        this.certAdd?.nativeElement.click()
    }


    uploadCert(e: Event) {
        let target = e.target as HTMLInputElement;

        let upload: IAddDocument = {
            doctorID: this.id,
            document: target.files == null ? null : target.files[0],
            type: DocumentType.Certificate
        }
        let form: FormData = new FormData();
        form.append("doctorID", `${this.id}`);
        if (target.files)
            form.append("document", target.files[0]);
        form.append("type", `${DocumentType.Certificate}`);
        this._DoctorService.addCertificate(form).subscribe((res) => {
            console.log(res)
            this._DoctorService.getProfileDoc(this.docID).subscribe((res) => {
                this.docProfileData = res;
                console.log(this.docProfileData);

            })
        },
            (error) => {
                console.log(error)
            })
    }

    deleteCert(certID: number) {
        if (confirm("Are You sure you want to delete this certificate ?")) {
            this._DoctorService.deleteCertificate(certID).subscribe((res) => {
                console.log(res)
                this._DoctorService.getProfileDoc(this.docID).subscribe((res) => {
                    this.docProfileData = res;
                    console.log(this.docProfileData);

                })
            },
                (error) => {
                    alert(error.error);
                })
        }
    }

    uploadPicture(e: Event) {
        let target = e.target as HTMLInputElement;

        let upload: changePic = {
            id: this.id,
            role: this.role,
            file: target.files == null ? null : target.files[0]
        }
        let form: FormData = new FormData();
        form.append("id", `${this.id}`);
        form.append("role", this.role);
        if (target.files)
            form.append("file", target.files[0]);
        this._userService.ChangeProfilePicture(form).subscribe((res) => {
            console.log(res)
            this._DoctorService.getProfileDoc(this.docID).subscribe((res) => {
                this.docProfileData = res;
                console.log(this.docProfileData);
            })
        },
            (error) => {
                console.log(error)
            })

    }

    deletePicture() {
        let user: userBasicInfo = {
            id: this.id,
            role: this.role
        }

        this._userService.DeleteProfilePicture(user).subscribe((res) => {
            console.log(res)
            this._DoctorService.getProfileDoc(this.docID).subscribe((res) => {
                this.docProfileData = res;
                console.log(this.docProfileData);
            })
        },
            (error) => {
                console.log(error)
            }
        )
    }



    responsiveOptions: any[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}
