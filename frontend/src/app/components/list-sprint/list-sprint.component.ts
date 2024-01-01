//Angular adds
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

//interfaces
import { Sprint } from 'src/app/interfaces/sprint.interface';

//calling components
import { CreateUpdateSprintComponent } from '../create-update-sprint/create-update-sprint.component';

const listSprint: Sprint[] = [
{
  idsprint: 1,
  title: '',
  initialDate: new Date(),
  finalDate: new Date(),
  committedPoints: 0,
  fulfilledPoints: 0,
  noFulfilledPoints: 0,
  toDoPorcentage: 0,
  doingPorcentage: 0,
  donePorcentage: 0,
},
];

@Component({
  selector: 'app-list-sprint',
  templateUrl: './list-sprint.component.html',
  styleUrls: ['./list-sprint.component.css']
})

export class ListSprintComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'N° sprint',
    'title',
    'initialDate',
    'finalDate',
    'committedPoints',
    'fulfilledPoints',
    'noFulfilledPoints',
    'toDoPorcentage',
    'donePorcentage',
    'tools',
  ];
  dataSource: MatTableDataSource<Sprint>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(listSprint);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEditSprint() {
    const dialogRef = this.dialog.open(CreateUpdateSprintComponent, {
      width: '550px',
      disableClose: true,
      //data:{},
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log('hell no');
    });
  }
}
