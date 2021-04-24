import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-password-button',
  templateUrl: './toggle-password-button.component.html',
  styleUrls: ['./toggle-password-button.component.scss']
})
export class TogglePasswordButtonComponent implements OnInit {

  passwordType: string = '';

  @Input('input')
  input!: HTMLInputElement;

  constructor() { }

  ngOnInit(): void {
    this.input.type = 'password';
    this.passwordType = this.input.type;
  }

  tooglePasswordType() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.input.type = this.passwordType;
  }

}