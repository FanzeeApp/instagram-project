export interface RegisterBody {
    username: string;
    password: string;
    email: string;
    birthDate: string;
    gender: string;
  }
  
  export interface LoginBody {
    login: string;
    password: string;
  }

  export interface Post {
    id: number;
    mediaUrl: string;
    description: string;
    userAvatar?: string;
    username?: string;
  }

  export interface UseFormRegister{
    username: string;
    email: string;
    password: string;
    birthDate: string;
    gender: NonNullable<"male" | "female" | undefined>;
}
  