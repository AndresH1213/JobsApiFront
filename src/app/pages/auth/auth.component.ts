import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public register: boolean = false;
  public hasError: boolean = false;
  public classSignIn: string = 'active';
  public classSignUp: string = 'inactive underlineHover';

  authForm: FormGroup = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required] ]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  createUser() {

    if (this.authForm.invalid || this.authForm.get('name')?.value.length < 3) {
      this.hasError = true;
      return
    }

    this.authService.createUser(this.authForm.value).subscribe(resp => {
      // navigate dashboard
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      Swal.fire('Oops!', err.msg, 'error');
      console.warn(err)
    }
    )
  }

  logIn() {

    if (this.authForm.invalid) {
      this.hasError = true;
      return
    }

    this.authService.loginUser(this.authForm.value)
                    .subscribe(resp => {
                      
                      if (resp.token) {
                        this.router.navigateByUrl('/dashboard')
                      }

                    }, (err) => {
                      Swal.fire('Error', err.msg, 'error')
                    })

  }

  signInForm() {
    this.register = false;
    this.classSignIn = 'active';
    this.classSignUp = 'inactive underlineHover';
  }

  signUpForm() {
    this.register = true;
    this.classSignUp = 'active';
    this.classSignIn = 'inactive underlineHover'
  }
}
