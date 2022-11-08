import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //form declareds
  user: string;
  name: string;
  email: string;
  password: string;
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private builder: FormBuilder,
    private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;
    else {
      if (this.user.includes("@") && this.user.includes(".")) {
        this.name = ''
        this.email = this.user
      } else {
        this.name = this.user
        this.email = ''
      }
      this.service.loginUser(this.name, this.email, this.password).subscribe(x => {
        console.log(x, x._id, x.name)
        localStorage.setItem('g_uid', x._id)
        localStorage.setItem('g_uname', x.name)
      });
      this.router.navigate(['home']);
    }
  }

}
