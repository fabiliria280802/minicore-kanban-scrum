import { Subtask } from './../interfaces/subtask.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTask',
})
export class FilterByTaskPipe implements PipeTransform {
  transform(subtasks: Subtask[], taskId?: number): Subtask[] {
    if (typeof taskId !== 'number') {
      // Si sprintId no es un número, puedes decidir qué hacer.
      // Opción 1: Devolver un arreglo vacío si sprintId es undefined.
      // return [];

      // Opción 2: Devolver todas las tareas si no hay un sprintId válido.
      // Esto depende de cómo deseas manejar este caso en tu aplicación.
      return subtasks;
    }
    return subtasks.filter((subtask) => subtask.idtask === taskId);
  }
}
