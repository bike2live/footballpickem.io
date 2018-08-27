import { Directive, Input, OnInit } from '@angular/core';
import {Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirm = control.get('confirm');

    // console.log('password: ', password ? password.value : undefined);
    // console.log('confirm: ', confirm ? confirm.value : undefined );

    return password && confirm && !(password.value === confirm.value) ? { 'notEqual': true } : null;
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
    return identityRevealedValidator(c);
  }

}
