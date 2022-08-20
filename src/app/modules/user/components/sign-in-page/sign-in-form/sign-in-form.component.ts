import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

type SignInType = 'Sign In' | 'Sign Up' | 'Reset';
interface FeedBackMsgs  {
  [key: string]:  string;
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent implements OnInit {
  form!: FormGroup;
  type: SignInType = 'Sign In';
  isLoading = false;
  errorMessage = '';

  feedbacks: FeedBackMsgs = {
    email: 'Please enter a valid email.'
  }

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.email]),
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    })
  }

  changeType(val: SignInType) {
    this.type = val;
    this.form.reset({
      'email': '',
      'password': '',
      'confirmPassword': ''
    })
  }

  get isSignIn() {
    return this.type === 'Sign In'
  }

  get isSignUp() {
    return this.type === 'Sign Up'
  }

  get isReset() {
    return this.type === 'Reset'
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')
  }

  get passwordMatches() {
    if(this.type === 'Sign Up') {
      return this.password?.value === this.confirmPassword?.value;
    } else {
      return true
    }

  }

  onSubmit() {

  }

}
