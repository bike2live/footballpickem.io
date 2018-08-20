import { Directive, Input, OnInit } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[fpConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true }]
})
export class ConfirmEqualValidatorDirective implements Validator, OnInit {
  @Input() field1: string;
  @Input() field2: string;

  constructor() {
    console.log('created in instance of ConfirmEqualValidatorDirective');
  }

  ngOnInit(): void {
    console.log('ConfirmEqualValidatorDirective->ngOnInit()');
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('c: ', c);

    if (c instanceof FormGroup) {
      // validate
      console.log('abstract control is an instance of FormGroup');
      const control1 = c.get(this.field1);
      const control2 = c.get(this.field2);
      if (control1 && control2 && control1.value !== control2.value) {
        return { 'notEqual': true };
      }
      return null;
    }

    return { 'incorrect usage': true };
  }

}
