export interface userAuthenticationMiddlewareDto {
  id: string;
  fullname: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  address: string;
  role: 'user' | 'admin' | 'vendor';
}

export interface userAuthorizationMiddlewareDto {
  role: 'user' | 'admin' | 'vendor';
}

export interface UserDecodeTokenDto {
  id: string;
  fullname: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  address: string;
}
