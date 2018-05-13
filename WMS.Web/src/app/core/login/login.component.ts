import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  public loginForm: FormGroup;
  public username: FormControl;
  public password: FormControl;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
