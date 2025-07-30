export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullname: string;
  email: string;
  password: string;
  country: string;
  phoneNumber?: string;
  address?: string;
  role: 'user' | 'admin' | 'vendor';
}
