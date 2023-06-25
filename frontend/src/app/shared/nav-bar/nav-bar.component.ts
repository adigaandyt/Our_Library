import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {}
  isHidden: string = 'hidden';
  ngOnInit() {
    var p = this.location.path();
    if (p == '') {
      this.isHidden = '';
    } else {
      this.isHidden = 'hidden';
    }
  }
  //name: string = localStorage.['name']

  logout() {
    this.userService.logoutUser();
    this.toastr.success(`You've logged out`, '', { timeOut: 3000 });
  }
}
