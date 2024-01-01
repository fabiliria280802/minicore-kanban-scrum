//Angular adds
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

//interfaces
import { Subtask, subtaskstatus } from 'src/app/interfaces/subtask.interface';

//calling components
import { CreateUpdateSubtaskComponent } from '../create-update-subtask/create-update-subtask.component';

//TODO: Agregar funcionalidad de esta pestaña (subtask)

const listSubtask: Subtask[] = [
  {
    idtask: 1,
    idsubtask: 1,
    title: 'Crear repo',
    description: '1.0079',
    subtaskstatus: subtaskstatus.todo,
    assignedUser: 'hello',
  },
  {
    idtask: 1,
    idsubtask: 2,
    title: 'Configurar dependencias',
    description: '1.0079',
    subtaskstatus: subtaskstatus.done,
    assignedUser: '-',
  },
  {
    idtask: 1,
    idsubtask: 3,
    title: 'Comprar licencia',
    description: '1.0079',
    subtaskstatus: subtaskstatus.todo,
    assignedUser: 'fabs',
  },
  {
    idtask: 2,
    idsubtask: 4,
    title: 'Resolver bug',
    description: '1.0079',
    subtaskstatus: subtaskstatus.done,
    assignedUser: '-',
  },
  {
    idtask: 2,
    idsubtask: 5,
    title: 'Sprint #2',
    description: '1.0079',
    subtaskstatus: subtaskstatus.done,
    assignedUser: '-',
  },
  {
    idtask: 3,
    idsubtask: 6,
    title: 'Sprint #1',
    description: '1.0079',
    subtaskstatus: subtaskstatus.todo,
    assignedUser: '-',
  },
  {
    idtask: 3,
    idsubtask: 7,
    title: 'Sprint #1',
    description: '1.0079',
    subtaskstatus: subtaskstatus.done,
    assignedUser: '-',
  },
  {
    idtask: 3,
    idsubtask: 8,
    title: 'Sprint #1',
    description: '1.0079',
    subtaskstatus: subtaskstatus.todo,
    assignedUser: '-',
  },
];

@Component({
  selector: 'app-list-subtask',
  templateUrl: './list-subtask.component.html',
  styleUrls: ['./list-subtask.component.css'],
})
export class ListSubtaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'N° Task',
    'N° Subtask',
    'title',
    'description',
    'Subtaskstatus',
    'assignedUser',
    'tools',
  ];
  dataSource: MatTableDataSource<Subtask>;
  //dataSource = new MatTableDataSource(listSubtack);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(listSubtask);
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
  addEditSubtask() {
    const dialogRef = this.dialog.open(CreateUpdateSubtaskComponent, {
      width: '550px',
      disableClose: true,
      //data:{},
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('hell no');
    });
  }
}
