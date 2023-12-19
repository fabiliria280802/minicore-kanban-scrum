export enum type {
  Administrador = 'Administrador',
  Desarrollador = 'Desarrollador',
}

export interface User {
  iduser?: number;
  fullname: string;
  username: string;
  password: string;
  email: string;
  type: type;
  position: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}
