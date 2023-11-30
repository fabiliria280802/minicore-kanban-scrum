import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Users, type } from 'src/app/interfaces/users.interface';
import { CreateUpdateUsersComponent } from '../create-update-users/create-update-users.component';
import { UserService } from 'src/app/services/user.service';
//TODO: Arreglar errores de cargar (users)
/*const listUsers: Users[] =[
  {
    iduser: 1,
    fullname:"string",
    email: "string",
    type: type.Administrador,
    position: "string"
  }
];
*/
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent /*implements OnInit, AfterViewInit*/ {
  /*displayedColumns: string[] = ['fullname','email','type','position'];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private _userService: UserService){
    this.dataSource = new MatTableDataSource(listUsers);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    (this.paginator as MatPaginator)._intl.itemsPerPageLabel = "Items por pagina";
  }

  getUsers(){
    this._userService.getUsers().subscribe(data => {
      console.log(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditTask(){
    const dialogRef = this.dialog.open(CreateUpdateUsersComponent, {
      //data: {name: this.name, animal: this.animal},
      width:'550px',
      disableClose: true,
    });
  }

  activeUser: Users = {
    iduser: 1,
    fullname: "",
    email: "",
    type: type.Administrador,
    position: ""
  };

  isUserActive(element) {
    return element.id === this.activeUser.iduser;
 }*/
}

