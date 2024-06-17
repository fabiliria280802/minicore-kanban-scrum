import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

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
