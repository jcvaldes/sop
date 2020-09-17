import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { Input, Directive } from '@angular/core';

@Directive({
  selector: '[appPieceId]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PieceIdValidatorDirective, multi: true }
  ]
})
export class PieceIdValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const pattern = '^[A-Z]{1,2}\\d{9,9}AR$';
    if (!control.value) return;
    const re = new RegExp(pattern, 'i');
    const isValid = re.test(control.value);
    if (!isValid) {
      return { 'pieceIdInvalid': true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}
