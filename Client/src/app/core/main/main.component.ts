import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/service/application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private appdata: ApplicationService,
    private activeRoute: ActivatedRoute,
    private router : Router
  ) { 

  }

  token: string = "";

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams;
    const routeParams = this.activeRoute.snapshot.params;    
    if (queryParams.token){
      this.appdata.setToken(queryParams.token);
      this.router.navigate(['/main']);
    }      
    this.token = this.appdata.getToken();
  }

}
