import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form?: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private message: SnackbarUtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated()
      .pipe(first())
      .subscribe(auth => {
        if (auth) {
          this.redirectToLogged();
        }
      })

    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    if (!this.isLoading) {
      const { email, password } = this.form?.value;
      this.isLoading = true;
      this.auth.handleLogin(email, password)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(res => {
          if (res.auth) {
            this.redirectToLogged();
          } else {
            this.message.showErrorMessage('Invalid username and/or password');
          }

        });
    }
  }

  private redirectToLogged() {
    this.router.navigate(['/']);
  }

}
