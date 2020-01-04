import { Injectable, Inject, Optional } from '@angular/core';
import { verifyHostBindings } from '@angular/compiler';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

  export class MDXApiService extends ApiService {      
    constructor(http: HttpClient,
        @Inject('ServerURL') @Optional() public ServerURL: string ="http://localhost:53023/",
        ) {
        super(http);
    }

    Query(query : string){
        return this.post('api/mdx/query', {
            Query:query
        });
    }

  }