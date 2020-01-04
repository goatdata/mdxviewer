import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private _snackBar: MatSnackBar,private readonly zone: NgZone) {}

  handleError(error) {
    this.zone.run(() => {
        if (error.rejection && error.rejection.error && error.rejection.error.Message){
            this._snackBar.open(error.rejection.error.Message,"Close");
        }else if(error.rejection && error.rejection.message){
          this._snackBar.open(error.rejection.message,"Close");

        }
    });
    ;    
  }
}