export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IPersonRequest {
  firstname: string;
  lastname: string;
  document: string;
  idTypeDocument: number;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
  lastname: string;
  person: IPersonRequest;
  idAffiliate: number;
  idRole: number;
}