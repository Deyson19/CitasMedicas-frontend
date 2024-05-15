import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shared-spinner',
  standalone: true,
  template: `
    <div class="text-center">
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-border spinner-border-lg"
          role="status"
          aria-hidden="true"
        >
        </span>
      </button>
      <h3 class="text-center">
        {{ mensaje }}
      </h3>
      <mat-spinner class="mx-auto" />

      <svg
        width="250"
        height="150"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .spinner_qM83 {
            animation: spinner_8HQG 1.05s infinite;
          }
          .spinner_oXPr {
            animation-delay: 0.1s;
          }
          .spinner_ZTLf {
            animation-delay: 0.2s;
          }
          @keyframes spinner_8HQG {
            0%,
            57.14% {
              animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
              transform: translate(0);
            }
            28.57% {
              animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
              transform: translateY(-6px);
            }
            100% {
              transform: translate(0);
            }
          }
        </style>
        <circle class="spinner_qM83" cx="4" cy="12" r="3" />
        <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" />
        <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" />
      </svg>
    </div>
  `,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class SpinnerComponent {
  @Input({ required: true }) mensaje!: string;
}
