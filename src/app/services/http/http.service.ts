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

   private readonly apiURL = "https://clozet-api.azurewebsites.net"

  Get(type : string) : Observable<IUser[]> {
   
    return this.http.get<IUser[]>(`${this.apiURL}/${type}`)
  
  }

  Login(user : IUser) : Observable<IUser>{
    return this.http.post<IUser>(`${this.apiURL}/Usuario/Login`, user)
  }

  GetFor(type: string, nome : string) : Observable<IUser> {
    return this.http.get<IUser>(`${this.apiURL}/${type}/${nome}`)
  }

  Post(valor : IUser | IRoupas, type : string) : Observable<IUser | IRoupas> {
    if(type == 'Usuario'){
      return this.http.post<IUser>(`${this.apiURL}/${type}`, valor)
    }
    else {
      return this.http.post<IRoupas>(`${this.apiURL}/${type}`, valor)
    }
  }

  Put(type : string, nome : string) : Observable<IUser> {
    return this.http.put<IUser>(`${this.apiURL}/${type}/${nome}`, {})
  }

  Delete(type : string, nome : string, id? : number) : Observable<IUser | IRoupas> {
    if(type == "Usuario"){
      return this.http.delete<IUser>(`${this.apiURL}/${type}/${nome}`)
    }
    else{
      return this.http.delete<IRoupas>(`${this.apiURL}/${type}/${nome}/${id}`)
    }
  }
}
