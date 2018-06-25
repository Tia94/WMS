import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private returnUrl: string;
  public registerForm: FormGroup;
  public username: FormControl;
  public password: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public telephoneNumber: FormControl;
  public address: FormControl;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }


  private createFormControls() {
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.email = new FormControl("", Validators.required);
    this.telephoneNumber = new FormControl("", Validators.required);
    this.address = new FormControl("", Validators.required);
  }

  private createForm() {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      telephoneNumber: this.telephoneNumber,
      address: this.address
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(
        this.username.value, 
        this.password.value, 
        this.firstName.value, 
        this.lastName.value, 
        this.email.value,
        this.telephoneNumber.value,
        this.address.value,);
    }
  }

}
