import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username:string = '';
  password:string = '';
  confirmPassword:string = '';
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}
  addUser(){
    if(this.username=='' || this.password=='' || this.confirmPassword==''){
        this.toastr.error('Todos los campos son obligatorios','Error');
        return;
      }
    }
}
