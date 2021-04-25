import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit {

  posts: PostResponse[] = [];

  isLoading: boolean = false;

  constructor(
    private postsService: PostsService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.findAll<PostResponse>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        posts => this.posts = (posts as PostResponse[]),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

}

interface PostResponse {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  title: string;
  content: string;
}
