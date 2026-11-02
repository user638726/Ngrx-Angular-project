import { BackendErrorsInterface } from "../../../../shared/types/backendErrors.interface"
import { CommentInterface } from "./comment.interface"

export interface CommentsStateInterface{
  isLoading:boolean
  isSubmitting:boolean
  data:CommentInterface[]
  validationErrors:BackendErrorsInterface | null
}
