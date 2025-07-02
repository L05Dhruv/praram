export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  password?: string; // Only used internally, never sent to client
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  firstName: string;
  lastName: string;
} 