// services/userService.ts
import { User } from '../models/user';

const API_URL = 'http://localhost:3001/users';

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}?email=${email}`);
    const users: User[] = await res.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
