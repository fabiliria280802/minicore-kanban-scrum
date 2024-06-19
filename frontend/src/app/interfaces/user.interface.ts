export enum type {
  Admin = 'Administrador',
  Dev = 'Desarrollador',
  Viewer = 'Visualizador',
}

export enum position{
  ScrumMaster = 'Scrum Master',
  ProductOwner = 'Product Owner',
  DeveloperBackend = 'Desarrollador Backend',
  DeveloperFrontend = 'Desarrollador Frontend',
  DeveloperFullStack = 'Desarrollador FullStack',
  QualityAssurance = 'QA',
  UXDesigner = 'UX Designer',
  UXWriter = 'UX Writer',
  Architect = 'Arquitecto',
  Intern= 'Pasante',
}

export interface User {
  id?: number;
  fullname: string;
  username: string;
  password: string;
  email: string;
  type: type;
  position: position;
}

export interface LoginPayload {
  login: string;
  password: string;
}
