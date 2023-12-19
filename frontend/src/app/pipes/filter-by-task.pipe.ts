import { Subtask } from './../interfaces/subtask.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTask',
})
export class FilterByTaskPipe implements PipeTransform {
  transform(subtasks: Subtask[], taskId: number): Subtask[] {
    return subtasks.filter((subtask) => subtask.idtask === taskId);
  }
}
