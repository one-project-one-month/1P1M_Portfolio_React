export interface CheckEmail {
  id: string;
}

export interface SendOTP {
  id: string;
}

export interface Profile {
  dev_id: string;
  name?: string;
  techStacks?: string[];
  github?: string;
  linkedIn?: string;
  aboutDev?: string;
  profilePictureUrl?: string;
}

export interface ProfileForm {
  name: string;
  techStacks: string[];
  github: string;
  linkedIn: string;
  aboutDev: string;
}
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T | null;
  error?: Error;
}
