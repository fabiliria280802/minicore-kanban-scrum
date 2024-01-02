//Angular adds
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

//interfaces
import { Sprint } from 'src/app/interfaces/sprint.interface';

//services
import { SprintService } from 'src/app/services/sprint.service';

//calling components
import { CreateUpdateSprintComponent } from '../create-update-sprint/create-update-sprint.component';


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
    'tools',
  ];
  dataSource: MatTableDataSource<Sprint>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _sprintService: SprintService
    ) {
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getSprints();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSprints(){
    this._sprintService.getSprints().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    })
  }

  addEditSprint() {
    const dialogRef = this.dialog.open(CreateUpdateSprintComponent, {
      width: '550px',
      disableClose: true,
      //data:{},
    });
    dialogRef.afterClosed().subscribe(result=>{
      if (result) {
        this.getSprints();
      }
    });
  }
}
