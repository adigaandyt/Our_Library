import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private http: HttpClient
  ) {}
  isHidden: string = 'hidden';

  regForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  url = 'http://localhost:8000/api/users/register'; // Replace with your backend URL
  headers = new HttpHeaders({ 'Content-Type': 'any' });
  payload: any = {};

  ngOnInit(): void {}

  //Make the api call here
  save() {
    this.isHidden = 'hidden';
    if (
      //Check if user filled the entire form
      this.regForm.value.name == '' ||
      this.regForm.value.email == '' ||
      this.regForm.value.password2 == '' ||
      this.regForm.value.password == ''
    ) {
      alert('Please Fill The Entire Form');
      return;
    }
    //check if passwords match
    if (this.regForm.value.password != this.regForm.value.password2) {
      this.isHidden = '';
    } else {
      //send the POST request
      this.payload = <JSON>this.regForm.value;
      this.http.post<any>(this.url, this.payload).subscribe(
        (response) => {
          console.log('API response:', response);
          this.router.navigate(['login']);
        },
        (error) => {
          console.error('API error:', error);
          // Handle any errors that occurred
        }
      );
    }
  }
}
