import { Injectable } from '@angular/core';
import {ApplicationData} from 'src/app/models/ApplicationData';

@Injectable({
    providedIn: 'root',
  })

export class ApplicationService {
    data : ApplicationData = new ApplicationData("");

    public setToken(token : string){        
        this.data.token = token;
        localStorage.setItem("token",token);
    }

    public getToken() : string{
        if (this.data && this.data.token && this.data.token!=""){
            return this.data.token;
        }else{
            var istoken = localStorage.getItem("token");
            if (istoken){
                this.data.token = istoken;
            }
            return this.data.token;
        }
        return null;
    }
}