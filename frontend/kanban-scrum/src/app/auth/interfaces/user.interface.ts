export interface User {
  id: number;
  user: string;
  email: string;
  password: string;
  cargo: string;
  tipo: tipo;
}

export enum tipo {
  Admin = "Administrador",
  Dev = "Desarrollador",
}
