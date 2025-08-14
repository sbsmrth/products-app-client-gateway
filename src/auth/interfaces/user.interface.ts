import { ValidRoles } from '../enum/valid-roles.enum';

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: ValidRoles[];
}
