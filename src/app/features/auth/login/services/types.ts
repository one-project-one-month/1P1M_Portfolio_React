export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
  roleId: number;
  role: 'ADMIN' | 'USER';
  isNewUserLogin: boolean;
}
