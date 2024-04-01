
export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    is_admin: boolean,
    token: string
  }
  
export type LoginResponse = {
    data: User,
    status: number,
    message: string,
  };