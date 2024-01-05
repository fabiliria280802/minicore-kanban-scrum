import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownOpen = false;
  dropdownOpenTwo = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  toggleDropdownTwo() {
    this.dropdownOpenTwo = !this.dropdownOpenTwo;
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.dropdownOpen = false;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
