import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) {

  }

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted', this.loginForm.value);
      this.authService.login(this.username.value, this.password.value);
      // this.httpClient.post("http://localhost:61796/api/auth/login", this.loginForm.value, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      //   .toPromise()
      //   .then(response => {
      //     console.log(response);
      //     this.loginForm.reset();
      //   });
    }
  }

  private createFormControls() {
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
  }

  private createForm() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

}
