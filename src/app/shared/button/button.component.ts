import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type?: 'submit' | 'reset' | 'button' = 'button';
  @Input() outline?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() label?: string = '';
  @Input() suffixIcon?: string = '';
  @Input() prefixIcon?: string = '';
}
