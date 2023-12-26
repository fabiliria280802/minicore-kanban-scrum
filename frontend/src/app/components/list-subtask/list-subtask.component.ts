import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subtask, subtaskstatus } from 'src/app/interfaces/subtask.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateSubtaskComponent } from '../create-update-subtask/create-update-subtask.component';

//TODO: Agregar funcionalidad de esta pestaña (subtask)

const listSubtack: Subtask[] = [
  {idsubtask: 1, idtask: 1, title: 'Crear repo', description: '1.0079', Subtaskstatus: subtaskstatus.todo, assignedUser:'hello'},
  {idsubtask: 2, idtask: 1, title: 'Configurar dependencias', description: '1.0079', Subtaskstatus: subtaskstatus.done, assignedUser:'-'},
  {idsubtask: 3, idtask: 1, title: 'Comprar licencia', description: '1.0079', Subtaskstatus: subtaskstatus.todo, assignedUser:'fabs'},
  {idsubtask: 4, idtask: 2, title: 'Resolver bug', description: '1.0079', Subtaskstatus: subtaskstatus.done, assignedUser:'-'},
  {idsubtask: 5, idtask: 2, title: 'Sprint #2', description: '1.0079', Subtaskstatus: subtaskstatus.done, assignedUser:'-'},
  {idsubtask: 6, idtask: 3, title: 'Sprint #1', description: '1.0079', Subtaskstatus: subtaskstatus.todo, assignedUser:'-'},
  {idsubtask: 7, idtask: 3, title: 'Sprint #1', description: '1.0079', Subtaskstatus: subtaskstatus.done, assignedUser:'-'},
  {idsubtask: 8, idtask: 3, title: 'Sprint #1', description: '1.0079', Subtaskstatus: subtaskstatus.todo, assignedUser:'-'}
];

@Component({
  selector: 'app-list-subtask',
  templateUrl: './list-subtask.component.html',
  styleUrls: ['./list-subtask.component.css'],
})
export class ListSubtaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['N° Subtask','N° Task', 'title', 'description', 'Subtaskstatus','assignedUser','tools'];
  dataSource: MatTableDataSource<Subtask>
  //dataSource = new MatTableDataSource(listSubtack);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog){
    this.dataSource =new MatTableDataSource(listSubtack);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //this.dataSource.paginator._intl. = "Item x pagina";
   /* this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter) || data.description.toLowerCase().includes(filter) || data.Subtaskstatus.toLowerCase().includes(filter) || data.assignedUser.toLowerCase().includes(filter);
    };*/
  }
  addEditSubtask(){
    const dialogRef =this.dialog.open(CreateUpdateSubtaskComponent,{
      width:'250px',
      //data:{},
    });
  }
}
