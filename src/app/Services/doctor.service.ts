import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctor, IDoctor2 } from '../Models/i-doctor';
import { Observable } from 'rxjs';
import { Speciality } from './../Models/speciality';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  // httpOption: { headers: HttpHeaders; };

  constructor(private httpClient: HttpClient) {
    // this.httpOption={
    //   headers:new HttpHeaders({
    //     'Content-Type':'application/json',
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    //     Authorization: `https://localhost:7013/api/User/Login__${localStorage.getItem('token')}`
    //   })
    // };
  }

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

  // https://localhost:7013/api/Doctor/Appointment/Others/doctor=1

  /* Start edit appoint component */
  getAllAppoint(id:any):Observable<any>
  {
    return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Requested/doctor/${id}`)
  }
  acceptAppoint(id:any):Observable<any>
  {
    return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Confirm/${id}`)
  }
  cancelAppoint(id:any):Observable<any>
  {
    return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Reject/${id}`)
  }
  getComingAppoint(id:any):Observable<any>
  {
    return this.httpClient.get(`https://localhost:7013/api/Doctor/Appointment/Accepted/doctor/${id}`);
  }
  /* End edit appoint component */

  getProfileDoc(id:any):Observable<any>
  {
    return this.httpClient.get(`https://localhost:7013/api/Doctor/${id}`)
  }

}
