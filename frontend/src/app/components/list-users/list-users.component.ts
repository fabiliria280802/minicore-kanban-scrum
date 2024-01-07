//Angular adds
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//interfaces
import { User, type } from '../../interfaces/user.interface';

//services
import { UserService } from '../../services/user.service';

//calling components
import { CreateUpdateUsersComponent } from '../create-update-users/create-update-users.component';
import { ToastrService } from 'ngx-toastr';

interface JwtPayload {
  iduser?: number;
  username?: string;
  type?: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'N° User',
    'fullname',
    'email',
    'type',
    'position',
    'tools',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private toastr: ToastrService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    //(this.paginator as MatPaginator)._intl.itemsPerPageLabel = "Items por pagina";
  }

  getUsers() {
    this._userService.getUsers().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditUser(id?: number) {
    const dialogRef = this.dialog.open(CreateUpdateUsersComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('hell no');
    });
  }
  deleteUser(id: number) {
    this._userService.deleteUsers(id).subscribe(() => {
      this.getUsers();
      this.toastr.success('Se borro exitosamente el usuario', 'Eliminación');
    });
  }
  IsAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      //const decodedToken = jwtDecode<JwtPayload>(token); // Usar 'any' para evitar problemas de tipado
      //return decodedToken.type === 'Administrador';
      return true;
    } catch (error) {
      console.error('Error decodificando el token', error);
      return false;
    }
  }
  ItsMe(iduserToCheck: number): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      //const decodedToken = jwtDecode<JwtPayload>(token);
      //return decodedToken.iduser === iduserToCheck;
      return true;
    } catch (error) {
      console.error('Error decodificando el token', error);
      return false;
    }
  }
  //no te puedes eliminar de la base bro
  ItsYou(iduserToCheck: number): boolean {
    return true;
  }
}
