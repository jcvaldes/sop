import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Input, Directive } from '@angular/core';
import { Product } from '../models/product.model';

@Directive({
  selector: '[appPieceId]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PieceIdValidatorDirective, multi: true }
  ]
})
export class PieceIdValidatorDirective implements Validator {
  @Input() products: Product[];
  validate(control: AbstractControl): { [key: string]: any } | null {
    const pattern = '^[A-Z]{1,2}\\d{9,9}AR$';
    if (!control.value) {
      return;
    }
    const re = new RegExp(pattern, 'i');
    const isValid = re.test(control.value) && this.checkProductCode(control);
    if (!isValid) {
      return { 'pieceIdInvalid': true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
  private checkProductCode(control: AbstractControl) {
//     const num = control.value.substr(3, )
    const code = control.value.substr(0, 2);
    return this.products['payload'].findIndex(p => p.code === code) >= 0;

  }
}
