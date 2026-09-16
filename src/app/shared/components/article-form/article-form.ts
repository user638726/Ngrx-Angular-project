import { Component, inject, input, OnInit, output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessages } from '../backend-error-messages/backend-error-messages';

@Component({
  imports: [BackendErrorMessages,ReactiveFormsModule],
  selector: 'app-article-form',
  styleUrl: './article-form.css',
  templateUrl: './article-form.html',
})
export class ArticleForm implements OnInit{
  initialValues = input<ArticleFormValuesInterface | undefined>();
  isSubmitting = input<boolean>(false);
  errors = input<BackendErrorsInterface | null>(null);

  articleSubmit = output<ArticleFormValuesInterface>();
  private fb=inject(FormBuilder)
  form=this.fb.nonNullable.group({
    title:'',
    description:'',
    body:'',
    tagList:'',
  })
  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm():void{
    if(!this.initialValues()){
      throw new Error('Inputs are not provided')
    }
    this.form.patchValue({
      title:this.initialValues()?.title,
      description:this.initialValues()?.description,
      body:this.initialValues()?.body,
      tagList:this.initialValues()?.tagList.join(' '),
    })
  }
  onSubmit():void{
    const formValue = this.form.getRawValue()
    const articleFormValues:ArticleFormValuesInterface={
      ...formValue,
      tagList:formValue.tagList.split(' '),
    }
    this.articleSubmit.emit(articleFormValues)
  }
}
