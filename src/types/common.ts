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

export interface PlatformLink {
  platformId: string | number;
  link: string;
}

export interface OpomRegisterForm {
  name: string;
  email: string;
  phone: string;
  telegram_username: string;
  github_url: string;
  role: string;
  status: string;
  platformLinks: PlatformLink[];
}

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T | null;
  error?: Error;
}
