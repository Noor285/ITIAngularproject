import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor, IDoctor2 } from '../Models/i-doctor';
import { Observable } from 'rxjs';
import { Speciality } from './../Models/speciality';
import { IDoctorAdd } from '../Models/doctorAddDTO';


@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    constructor(private httpClient: HttpClient) { }

    getAllDoctors(): Observable<IDoctor[]> {
        return this.httpClient.get<IDoctor[]>(`https://localhost:7013/api/Doctor/Details`)
    };

    addDoctor(doctor: IDoctorAdd): Observable<IDoctorAdd> {
        return this.httpClient.post<IDoctorAdd>(`https://localhost:7013/api/Doctor/Create`, doctor);
    }

    editDoctor(updatedDoctor: IDoctor2): Observable<any> {
        console.log(updatedDoctor)
        return this.httpClient.put<IDoctor2>(`https://localhost:7013/api/Doctor/Update`, updatedDoctor);
    }

    getDoctorById(doctortId: number): Observable<IDoctor2> {
        return this.httpClient.get<IDoctor2>(`https://localhost:7013/api/Doctor/${doctortId}`);
    }

    deleteDoctor(doctorId: number): Observable<void> {
        return this.httpClient.delete<void>(`https://localhost:7013/api/Doctor/Delete/${doctorId}`);
    }


    getAllSpecialities(): Observable<any> {
        return this.httpClient.get<any>(`https://localhost:7013/api/Doctor/Speciality`);
    }


    /* Start edit appoint component */
    getAllAppoint(id: any): Observable<any> {
        return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Requested/doctor=${id}`)
    }
    acceptAppoint(id: any): Observable<any> {
        return this.httpClient.patch(`https://localhost:7013/api/Doctor/Appointment/Confirm/${id}`, "")
    }
    cancelAppoint(id: any): Observable<any> {
        return this.httpClient.patch(`https://localhost:7013/api/Doctor/Appointment/Reject/${id}`, "")
    }
    getComingAppoint(id: any): Observable<any> {
        return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Accepted/doctor/${id}`);
    }
    /* End edit appoint component */

    getProfileDoc(id: any): Observable<any> {
        return this.httpClient.get<IDoctor>(`https://localhost:7013/api/Doctor/Details/${id}`)
    }

}
