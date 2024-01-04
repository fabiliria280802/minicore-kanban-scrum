import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Pipe({
  name: 'filterBySprint',
})
export class FilterBySprintPipe implements PipeTransform {
  transform(tasks: Task[], sprintId?: number, status?: string): Task[] {
    if (typeof sprintId !== 'number') {
      // Si no se proporciona un sprintId válido, retorna un arreglo vacío o todas las tareas.
      // Depende de tu lógica de negocio.
      return [];
    }

    return tasks.filter((task) => {
      const isSprintMatch = task.idsprint === sprintId;
      const isStatusMatch = !status || status === 'Iniciado' || status === null;

      return isSprintMatch && isStatusMatch;
    });
  }
}


