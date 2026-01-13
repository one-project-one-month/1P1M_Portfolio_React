
import type React from "react";

export interface NavLink {
  id: number;
  name: string;
  path: string;
  icon?:React.ElementType
}



export interface AdminNavLink {
  id: number;
  name: string;
  path: string;
  icon:React.ElementType
}

export type UserRole = 'ADMIN' | 'USER';
