import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  pieceError(control: FormControl): ErrorValidate {
    debugger
    const pattern = /^[A-Z]{1,2}-\\d{9,9}-AR$/;
    let re = new RegExp(pattern);
    if (control.value && re.exec(control.value)) {
    if ( control.value?.toLowerCase() === 'herrera' ){
      return {
        pieceError: true
      }
    }
    }

    return null;
  }
}
