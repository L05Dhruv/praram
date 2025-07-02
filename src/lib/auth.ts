import { User } from '@/types/auth';

// In a real app, this would be in a database
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@example.com',
    password: 'admin123', // In production, this would be hashed
    role: 'admin',
  },
  {
    id: 'user-1',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
  },
];

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find user by email (case insensitive)
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

  // Check if user exists and password matches
  if (user && user.password === password) {
    // Don't send password to client
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const user = mockUsers.find(u => u.id === userId);
  if (!user) return null;

  // Don't send password to client
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
} 