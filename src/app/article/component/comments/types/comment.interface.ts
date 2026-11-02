import { ProfileInterface } from "../../../../shared/types/profile.interface";

export interface CommentInterface{
  id:number
  createdAt:string
  updatedAt:string
  body:string
  author:ProfileInterface
}
