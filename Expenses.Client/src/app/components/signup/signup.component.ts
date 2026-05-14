import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: this.passwordMatchValidator
     }
     );
    }

    haserror(controlName: string, errorName: string): boolean {
      const control = this.signupForm.get(controlName);
      return !!(control && control.hasError(errorName) && control.touched);
    }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  } 
   onSubmit():void {
    this.errorMessage = null;
    if (this.signupForm.valid) {
      const signupData = {
        email: this.signupForm.value.email as string,
        password: this.signupForm.value.password as string,
        confirmpassword: this.signupForm.value.confirmpassword as string
      };
      this.authService.register(signupData).subscribe({
        next: () => {        
          this.router.navigate(['/transactions']);
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error?.message || 'An error occurred during registration. Please try again.';
        }
      });
    }
  }
    
}
