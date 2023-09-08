import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { convertStringToNums, isValidInteger } from './text';

export function mustContainSixNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCorrect = convertStringToNums(control.value).length !== 6;
    return isCorrect
      ? { mustContainSixNumbers: { value: control.value } }
      : null;
  };
}

export function mustContainNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const num = Number(control.value);
    const isCorrect = isValidInteger(num);
    return isCorrect ? { mustContainNumber: { value: control.value } } : null;
  };
}
