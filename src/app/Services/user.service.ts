import { loginDTO } from './../Models/logindto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInfo } from '../Models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  Login(loginInfo: loginDTO) : Observable<userInfo>{
    return this.httpClient.post<userInfo>('https://localhost:7013/api/User/Login',loginInfo);
  }
}
