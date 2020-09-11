export interface UserReq {
  username: string;
  password: string;
}
export class User implements UserReq {
  constructor(
    public uid: string,
    public firstname: string,
    public lastname: string,
    public username: string,
    public password: string,
    public email: string,
  ) {}
}

