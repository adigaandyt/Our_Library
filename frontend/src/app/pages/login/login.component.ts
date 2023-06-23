import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}
  //
  regForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  //
  url = 'http://localhost:8000/api/users/login'; // Replace with your backend URL
  headers = new HttpHeaders({ 'Content-Type': 'any' });
  payload: any = {};

  ngOnInit(): void {}

  login() {
    if (this.regForm.value.email == '' || this.regForm.value.password == '') {
      alert('Missing Credentials');
    } else {
      //send the POST request
      this.payload = <JSON>this.regForm.value;
      this.http.post<any>(this.url, this.payload).subscribe(
        (response) => {
          console.log('API response:', response);
          console.log('Name: ' + response.name);
          console.log('email: ' + response.email);
          console.log('password: ' + response.password);
          console.log('id: ' + response._id);
          console.log('token: ' + response.token);
        },
        (error) => {
          console.error('API error:', error);
          // Handle any errors that occurred
        }
      );
    }
  }
}
