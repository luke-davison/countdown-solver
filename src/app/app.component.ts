import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { findBestSolution } from '../lib/findBestSolution';
import { convertStringToNums } from '../lib/text';
import { mustContainNumber, mustContainSixNumbers } from '../lib/validation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main>
      <section class="content">
        <h1>Countdown Numbers Game Solver</h1>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <p>
            <label for="nums">Numbers:</label>
            <input
              id="nums"
              type="text"
              formControlName="nums"
              placeholder="Enter six numbers"
            />
            <span
              *ngIf="nums.invalid && (nums.dirty || nums.touched)"
              class="alert"
            >
              <div *ngIf="nums.errors?.['mustContainSixNumbers']">
                Must contain six positive integers
              </div>
            </span>
          </p>

          <p>
            <label for="target">Target:</label>
            <input
              id="target"
              type="text"
              formControlName="target"
              placeholder="Enter a target number"
            />
            <span
              *ngIf="target.invalid && (target.dirty || target.touched)"
              class="alert"
            >
              <div *ngIf="target.errors?.['mustContainNumber']">
                Must contain a postive integer
              </div>
            </span>
          </p>

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
    nums: new FormControl('', [mustContainSixNumbers()]),
    target: new FormControl('', [mustContainNumber()]),
  });

  answer: string = '';

  get nums() {
    return this.form.get('nums')!;
  }

  get target() {
    return this.form.get('target')!;
  }

  onSubmit() {
    this.answer = JSON.stringify(
      findBestSolution(
        convertStringToNums(this.form.value.nums || ''),
        Number(this.form.value.target)
      )
    );
  }
}
