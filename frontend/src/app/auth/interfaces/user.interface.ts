export interface User {
  id: number;
  user: string;
  email: string;
  password: string;
  position: string;
  type: type;
}

export enum type {
  Admin = "Administrador",
  Dev = "Desarrollador",
}
