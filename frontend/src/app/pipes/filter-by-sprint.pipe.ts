import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Pipe({
  name: 'filterBySprint',
})
export class FilterBySprintPipe implements PipeTransform {
  transform(tasks: Task[], sprintId: number): Task[] {
    return tasks.filter((task) => task.idsprint === sprintId);
  }
}
