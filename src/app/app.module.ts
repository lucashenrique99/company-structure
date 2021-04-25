import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { GlobalErrorHandler } from './shared/config/errors/global-error-handler';
import { DialogImpl } from './shared/config/material/dialog-impl';
import { FormFieldImpl } from './shared/config/material/form-field-impl-config';
import { TooltipImpl } from './shared/config/material/tooltip-impl';
import { PaginatorIntl } from './shared/config/material/paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    { provide: MatPaginatorIntl, useClass: PaginatorIntl },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useClass: FormFieldImpl },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useClass: DialogImpl },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MaskPipe, useClass: MaskPipe },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useClass: TooltipImpl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
