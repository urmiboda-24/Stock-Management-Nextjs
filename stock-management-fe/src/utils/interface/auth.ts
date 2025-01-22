export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
}

export interface ILoginResponseAttr {
  id: number;
  full_name: string;
  email: string;
  created_at: number;
  updated_at: number;
}

export interface ILoginResponse {
  success: boolean;
  status: number;
  data?: ILoginResponseAttr[];
  token?: string;
  message: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export interface IRegisterResponse {
  success: boolean;
  status: number;
  message: string;
}
