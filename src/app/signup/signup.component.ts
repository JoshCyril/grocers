import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ApiService } from '../api.service';
import { UserDB } from '../models/userDB.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //form declareds
  user: User = new User();
  userDB: UserDB[];
  registerForm: FormGroup;
  submitted: boolean = false;
  isUserExist: boolean = false;
  forUser: number;
  userExistMsg: string = "";

  constructor(private builder: FormBuilder,
    private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    })
    this.service.chkUserExist().subscribe(x => { this.userDB = x });
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    this.userDB.forEach((e: { name: string; email: string; }) => {
      if (e.name === this.user.name) {
        this.isUserExist = true
        this.forUser = 0
        this.userExistMsg = "Username already taken";
        return;
      } else if (e.email === this.user.email) {
        this.isUserExist = true
        this.forUser = 1
        this.userExistMsg = "Email already taken";
        return;
      } else {
        this.isUserExist = false
        this.userExistMsg = "";
        //return;
      }
    });
    console.log(this.isUserExist, this.forUser, this.userExistMsg)
    if (this.registerForm.invalid)
      return;
    else {
      console.log(this.user)
      if (!this.isUserExist) {
        this.service.addUser(this.user).subscribe(x => console.log(x));
        this.router.navigate(['login']);
      }
    }
  }

}
