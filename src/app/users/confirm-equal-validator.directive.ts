import { Directive, Input, OnInit } from '@angular/core';
import {Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirm');

    console.log('password: ', password ? password.value : undefined);
    console.log('confirm: ', confirm ? confirm.value : undefined );

    if (password && confirm) {
        console.log('password.value === confirm.value', password.value === confirm.value );
    }

    let result =  password && confirm && !(password.value === confirm.value) ? { 'notEqual': true } : null;

    console.log('identityRevealedValidator result: ', result);
    return result;
};

@Directive({
  selector: '[fpConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  // @Input() field1: string;
  // @Input() field2: string;

 validate(c: AbstractControl): ValidationErrors {
    console.log('c: ', c);

/*
    // if (c instanceof FormGroup) {
      // validate
      console.log('abstract control is an instance of FormGroup: ');
      // const control1 = c.get(this.field1);
      // const control2 = c.get(this.field2);
      const control1 = c.get('password');
      const control2 = c.get('confirm');
      if (control1 && control2 && control1.value !== control2.value) {
          console.log('not equal!!!!');
        return { 'notEqual': true };
      }
      return null;
    // }

    // return { 'incorrect usage': true };
*/
    return identityRevealedValidator(c);
  }

}
