import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dropdownOpen = false;
  dropdownOpenTwo = false;
  /*constructor(private router: Router) {}

  ngOnInit(): void {}*/
  toggleDropdownTwo() {
    this.dropdownOpenTwo = !this.dropdownOpenTwo;
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigate(path: string) {
    //this.router.navigate([path]);
    this.dropdownOpen = false;
  }


  constructor(private msalService: MsalService){
    this.msalService.instance.handleRedirectPromise().then(res=>{
      if(res !=null && res.account !=null){
        this.msalService.instance.setActiveAccount(res.account);
      }
    })
  }
  ngOnInit(): void{
    this.msalService.instance.handleRedirectPromise().then(res=>{
      if(res){
        console.log(res);
      }
    })

  }
  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    this.msalService.loginRedirect();
  }
  logout(){
    this.msalService.logout();
  }
}
