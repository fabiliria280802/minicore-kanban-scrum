//Angular adds
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

//interfaces
import { Subtask, subtaskstatus } from 'src/app/interfaces/subtask.interface';

//Services
import { SubtaskService } from 'src/app/services/subtask.service';

//calling components
import { CreateUpdateSubtaskComponent } from '../create-update-subtask/create-update-subtask.component';
import { ToastrService } from 'ngx-toastr';

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
    'status',
    'tools',
  ];
  dataSource: MatTableDataSource<Subtask>;
  //dataSource = new MatTableDataSource(listSubtack);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _subtaskService: SubtaskService,
    private toastr: ToastrService,
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
    this.getSubtasks();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteSubtask(id: number) {
    this._subtaskService.deleteSubtask(id).subscribe(() => {
      this.getSubtasks();
      this.toastr.success('Se borro exitosamente el usuario', 'Eliminación');
    });
  }
  addEditSubtask(id?: number) {
    const dialogRef = this.dialog.open(CreateUpdateSubtaskComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getSubtasks();
      }
    });
  }
  getSubtasks(): void {
    this._subtaskService.getSubtasks().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
}
