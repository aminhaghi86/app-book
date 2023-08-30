import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.authUrl;
  constructor(private http: HttpClient,private router:Router) {}

  register(userObj: any) {
    return this.http.post<any>(`${this.url}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.url}authenticate`, loginObj);
  }
  storeToken(tokenValue:string){
    localStorage.setItem('Token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('Token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('Token')
  }
  loggedOut():void{
    
    localStorage.removeItem('Token')
    this.router.navigate(['login'])

  }
}
