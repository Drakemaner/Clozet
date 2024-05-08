import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IUser from '../../interfaces/IUser';
import IRoupas from '../../interfaces/IRoupas';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

   private readonly apiURL = "https://clozet.azurewebsites.net"

  Get(type : string) : Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${type}`)
  }

  Login(user : IUser) : Observable<IUser>{
    return this.http.post<IUser>(`${this.apiURL}/Usuario/Login`, user)
  }

  GetFor(type: string, nome : string) : Observable<IUser> {
    return this.http.get<IUser>(`${this.apiURL}/${type}/${nome}`)
  }

  Post(valor : any, type : string) : Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${type}`, valor)
  }

  Put(type : string, nome : string) : Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${type}/${nome}`, {})
  }

  Delete(type : string, nome : string, id? : number) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${type}/${nome}/${id}`)
  }
}
