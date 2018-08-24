import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public username: FormControl;
  public password: FormControl;
  public title: string = "Login";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.username.value, this.password.value);
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
