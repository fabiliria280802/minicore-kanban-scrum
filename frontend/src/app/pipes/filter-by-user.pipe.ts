import { User } from './../interfaces/user.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUser',
})
export class FilterByUserPipe implements PipeTransform {
  transform(users: User[], taskId?: number): User[] {
    if (typeof taskId !== 'number') {
      // Si sprintId no es un número, puedes decidir qué hacer.
      // Opción 1: Devolver un arreglo vacío si sprintId es undefined.
      // return [];

      // Opción 2: Devolver todas las tareas si no hay un sprintId válido.
      // Esto depende de cómo deseas manejar este caso en tu aplicación.
      return users;
    }
    return users.filter((user) => user.id === taskId);
  }
}
