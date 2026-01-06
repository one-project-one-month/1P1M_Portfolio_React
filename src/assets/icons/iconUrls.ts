import sampleUser from "../sample-user-img.jpg";
import arrowLeftIcon from "./arrowLeft.svg";
import arrowRightIcon from "./arrowRight.svg";
import editIcon from "./edit.svg";
import emailIcon from "./email.svg";
import filterIcon from "./filter.svg";
import githubProfileIcon from "./github-icon.svg";
import githubSvg from "./github.svg";
import googleSvg from "./google.svg";
import imagePlaceholder from "./image-placeholder.svg";
import linkedinProfileIcon from "./linkedin-icon.svg";
import opomSvg from "./opom.svg";
import plusIcon from "./plus.svg";
import searchIcon from "./search.svg";


export const googleIconUrl = googleSvg;
export const githubIconUrl = githubSvg;
export const opomIconUrl = opomSvg;

export const sampleUserImgUrl = sampleUser;
export const imagePlaceholderUrl = imagePlaceholder;

export const plusIconUrl = plusIcon;
export const searchIconUrl = searchIcon;
export const filterIconUrl = filterIcon;

export const arrowRightIconUrl = arrowRightIcon;
export const arrowLeftIconUrl = arrowLeftIcon;

export const emailIconUrl = emailIcon;
export const githubProfileIconUrl = githubProfileIcon;
export const linkedinProfileIconUrl = linkedinProfileIcon;
export const editIconUrl = editIcon;



export const iconUrls = {
  github: githubSvg,
  linkedin: linkedinProfileIcon,
  opom: opomIconUrl, 
} as const;
