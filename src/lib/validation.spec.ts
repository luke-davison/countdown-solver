import { FormControl } from '@angular/forms';
import { mustContainSixNumbers } from './validation';

describe('mustContainSixNumbers', function () {
  it('should return an error if input is blank', function () {
    const input = new FormControl('');
    expect(mustContainSixNumbers()(input)).toEqual({});
  });
});
