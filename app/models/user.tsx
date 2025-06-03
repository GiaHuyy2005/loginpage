export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  banned: boolean;
  address: string;
  phone: string;
}
