import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/guard/auth.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownOpen = false;
  dropdownOpenTwo = false;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

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
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.navigate('/integrate-Ecoommerce');
    }
  }

}
