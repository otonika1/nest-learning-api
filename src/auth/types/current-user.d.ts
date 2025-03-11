import { Role } from "../enums/roles.enum";

export type CurrentUser = {
    id:number;
    role:Role;
}