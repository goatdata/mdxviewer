import { Component } from '@angular/core';
import { ApplicationService } from './service/application.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private appdata: ApplicationService)
  { 
    
  }

  title = 'Pivotal Cube Viewer';
}
