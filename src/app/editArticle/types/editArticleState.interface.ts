import { ArticleInterface } from "../../shared/types/article.interface"
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface"

export interface EditArticleStateInterface{
  article:ArticleInterface| null
  isLoading:boolean
  isSubmitting:boolean
  ValidationErrors:BackendErrorsInterface | null
}
