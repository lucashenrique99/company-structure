import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent extends AbstractForm<PostRequest, PostResponse> {

  constructor(
    protected fb: FormBuilder,
    protected service: PostsService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
  ) {
    super(
      fb,
      service,
      messages,
      router,
      activatedRoute,
      errorHandler
    );

  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      content: [null],
    });

    this.form.valueChanges.subscribe(s => console.log(s))
  }

  updateForm(value: PostResponse): void {
    this.form?.patchValue(value);
  }


  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Novo Post" : "Editar Post";
  }


  getSuccessMessage(res: any): string {
    return `Post salvo com sucesso`;
  }

  getListRoute(): string {
    return 'comunicados/feed';
  }


}

interface PostRequest {
  id?: number;
  title: string;
  content: string;
}

interface PostResponse {
  id?: number;
  title: string;
  content: string;
}
