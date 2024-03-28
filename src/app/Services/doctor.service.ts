import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor, IDoctor2 } from '../Models/i-doctor';
import { Observable } from 'rxjs';
import { Speciality } from './../Models/speciality';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) {}

  getAllDoctors(): Observable<IDoctor[]> {
    return this.httpClient.get<IDoctor[]>(`https://localhost:7013/api/Doctor/Details`)};

  addDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.httpClient.post<IDoctor>(`https://localhost:7013/api/Doctor/Create`, doctor);
  }

  editDoctor(updatedDoctor: IDoctor2): Observable<IDoctor2> {
    return this.httpClient.put<IDoctor2>(`https://localhost:7013/api/Doctor/Update`, updatedDoctor);
  }

  getDoctorById(doctortId: number): Observable<IDoctor2> {
    return this.httpClient.get<IDoctor2>(`https://localhost:7013/api/Doctor/${doctortId}`);
  }

  deleteDoctor(doctorId: number): Observable<void> {
    return this.httpClient.delete<void>(`https://localhost:7013/api/Doctor/Delete/${doctorId}`);
  }


  getAllSpecialities(): Observable<any> {
    return this.httpClient.get<any>(`https://localhost:7013/api/Doctor/Speciality`); // Adjust the URL as per your API endpoint
  }

}
