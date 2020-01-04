import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec } from '@angular/common/http';

class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
      }
    
      encodeValue(value: string): string {
        return encodeURIComponent(value);
      }
    
      decodeKey(key: string): string {
        return decodeURIComponent(key);
      }
    
      decodeValue(value: string): string {
        return decodeURIComponent(value);
      }
}

@Injectable()
export class ApiService {
    headers: HttpHeaders;
    constructor(private http: HttpClient,
        @Inject('ServerURL') @Optional() public ServerURL: string ="http://localhost:53023/") {
            this.headers = new HttpHeaders()
            //.set('Authorization', this.token)
            .set('Content-Type', 'application/json')            
         }


    _sanitizeUrl(url: string) {
        return this.ServerURL + url;
    }

    _setParams(params) {
        let httpParams = new HttpParams({encoder: new CustomEncoder()});
        for(let key in params) {
            if(params[key] instanceof Object) {
                httpParams = httpParams.set(key, JSON.stringify(params[key]));
            }
            else{
                httpParams = httpParams.set(key, params[key]);
            }
        }

        return httpParams;
    }

    get(url, params) {        
        return this.http.get(this._sanitizeUrl(url), { headers: this.headers, params }).toPromise();
    }
    
    post(url, body) {
        return this.http.post(this._sanitizeUrl(url),body, { headers: this.headers }).toPromise();
    }

    put(url, body) {
        return this.http.put(this._sanitizeUrl(url), this._setParams(body), { headers: this.headers }).toPromise();
    }

}