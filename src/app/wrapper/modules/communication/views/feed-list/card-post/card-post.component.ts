import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnInit {

  @Input() post!: PostResponse;

  _post!: PostData;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    moment.locale('pt-br')

    this._post = {
      ...this.post,
      content: this.sanitizer.bypassSecurityTrustHtml(this.post.content),
      lastModifiedDate: moment(this.post.lastModifiedDate).fromNow()
    }
  }

}

interface PostResponse {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  title: string;
  content: string;
}

interface PostData {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  title: string;
  content: SafeHtml;
}
