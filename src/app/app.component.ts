import { Component } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
template: `
  <main>
    <section class="content">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div>
          <label for="nums">Numbers:</label>
          <input id="nums" formControlName="nums" placeholder="Enter six numbers">
          <span *ngIf="nums.invalid && (nums.dirty || nums.touched)" class="alert">
            <div *ngIf="nums.errors?.['mustContainSixNumbers']">
              Must contain six positive integers
            </div>
          </span>
        </div>

        <div>
          <label for="target">Target:</label>
          <input id="target" formControlName="target" placeholder="Enter a target number">
          <span *ngIf="target.invalid && (target.dirty || target.touched)" class="alert">
            <div *ngIf="target.errors?.['mustContainNumber']">
              Must contain a postive integer
            </div>
          </span>
        </div>

        <button type="submit">Calculate</button>
      </form>
      <div>{{ answer }}</div>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calculator';

  form = new FormGroup({
    nums: new FormControl("", [
      mustContainSixNumbers()
    ]),
    target: new FormControl("", [
      mustContainNumber()
    ]),
  })

  answer: string = ""

  get nums() {
    return this.form.get("nums")!
  }

  get target() {
    return this.form.get("target")!
  }
  
  onSubmit() {
    this.answer = getAnswer(convertStringToNums(this.form.value.nums || ""), Number(this.form.value.target))
  }
}

export function isValidInteger(num: number): boolean {
  return !isNaN(num) && num > 0 && Number.isInteger(num);
}

export function mustContainSixNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCorrect = convertStringToNums(control.value).length !== 6;
    return isCorrect ? {mustContainSixNumbers: {value: control.value}} : null;
  };
}

export function mustContainNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const num = Number(control.value)
    const isCorrect = isValidInteger(num)
    return isCorrect ? {mustContainNumber: {value: control.value}} : null;
  };
}

function convertStringToNums(str: string): number[] {
  return str.split(" ").map(subStr => Number(subStr)).filter(isValidInteger)
}

function getAnswer(nums: number[], target: number): string {
  const add = (nums: number[], target: number): string => {
    for (let positionA = 0; positionA < nums.length - 1; positionA++) {
      for (let positionB = positionA + 1; positionB < nums.length; positionB++) {
        const numA = nums[positionA]
        const numB = nums[positionB]
        const numC = numA + numB
        if (numC === target) {
          return `${numA} + ${numB} = ${numC}`
        }
  
        const newNums = nums.filter((num, index) => index !== positionA && index !== positionB)
        if (newNums.length > 0) {
  
          const answer = solve([numC, ...newNums], target)
          if (answer) {
            return `${numA} + ${numB} = ${numC}, ${answer}`
          }
        }
      }
    }
  
    return ""
  }
  
  const subtract = (nums: number[], target: number): string => {
    for (let positionA = 0; positionA < nums.length; positionA++) {
      for (let positionB = positionA + 1; positionB < nums.length; positionB++) {
        if (positionA !== positionB) {
          const numA = nums[positionA]
          const numB = nums[positionB]
          const numC = numA - numB
          if (numC > 0) {
            if (numC === target) {
              return `${numA} - ${numB} = ${numC}`
            }
      
            const newNums = nums.filter((num, index) => index !== positionA && index !== positionB)
            if (newNums.length > 0) {
      
              const answer = solve([numC, ...newNums], target)
              if (answer) {
                return `${numA} - ${numB} = ${numC}, ${answer}`
              }
            }
          }
        }
      }
    }
  
    return ""
  }
  
  const multiply = (nums: number[], target: number): string => {
    for (let positionA = 0; positionA < nums.length - 1; positionA++) {
      for (let positionB = positionA + 1; positionB < nums.length; positionB++) {
        const numA = nums[positionA]
        const numB = nums[positionB]
        const numC = numA * numB
        if (numC === target) {
          return `${numA} * ${numB} = ${numC}`
        }
  
        const newNums = nums.filter((num, index) => index !== positionA && index !== positionB)
        if (newNums.length > 0) {
  
          const answer = solve([numC, ...newNums], target)
          if (answer) {
            return `${numA} * ${numB} = ${numC}, ${answer}`
          }
        }
      }
    }
  
    return ""
  }
  
  const divide = (nums: number[], target: number): string => {
    for (let positionA = 0; positionA < nums.length; positionA++) {
      for (let positionB = positionA + 1; positionB < nums.length; positionB++) {
        if (positionA !== positionB) {
          const numA = nums[positionA]
          const numB = nums[positionB]
          const numC = numA / numB
          if (numC > 0 && numC - Math.round(numC) === 0) {
            if (numC === target) {
              return `${numA} / ${numB} = ${numC}`
            }
      
            const newNums = nums.filter((num, index) => index !== positionA && index !== positionB)
            if (newNums.length > 0) {
      
              const answer = solve([numC, ...newNums], target)
              if (answer) {
                return `${numA} / ${numB} = ${numC}, ${answer}`
              }
            }
          }
        }
      }
    }
  
    return ""
  }
  
  const solve = (nums: number[], target: number): string => {
    let answer = ""
  
    answer = add(nums, target)
  
    if (answer) {
      return answer
    }
  
    answer = subtract(nums, target)
  
    if (answer) {
      return answer
    }
  
    answer = multiply(nums, target)
  
    if (answer) {
      return answer
    }
  
    answer = divide(nums, target)
  
    if (answer) {
      return answer
    }
  
    return ""
  }

  return solve(nums, target)
}