import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title?: string;
  @Input('showNewButton') showNewButton?: boolean;
  @Input('newButton') newButton: NewButtonListConfig = { label: 'New' }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  disabledNewButton() {
    return this.newButton.roles && !this.auth.currentUserHasAnyAuthority(this.newButton.roles);
  }

}

export interface NewButtonListConfig {
  label: string;
  url?: string;
  roles?: string[];
}