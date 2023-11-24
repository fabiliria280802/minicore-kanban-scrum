export enum type {
  Administrador = "Administrador",
  Desarrollador = "Desarrollador",
}

export interface Users{
  iduser?: number,
  fullname: string,
  username: string,
  password: string,
  //password_confirm?: string,
  email: string,
  type: type,
  position: string,
}

