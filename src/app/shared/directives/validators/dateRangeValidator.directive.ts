import moment from 'moment';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
const FORMAT_DATE = 'dd/MM/yyyy';
// Forma de Uso:
// this.form = new FormGroup({
//   fecha: new FormControl(fromDate, [
//     Validators.required,
//     dateRangeValidator(toDate) // <-- Here's how you pass in the custom validator.
//   ]),
// });

export function dateRangeValidator(fromDate: Date, toDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let isValid = false;
    if (toDate <= fromDate ) {
      isValid = true;
    }
    const dateControl = control.value;
    return isValid ? {'dateRangeValidator': {dateControl} } : null;
  };
}

