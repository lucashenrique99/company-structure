import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { ActivePipe } from './pipes/active.pipe';



@NgModule({
  declarations: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
  ],
  providers: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    PercentPipe,
  ],
})
export class PipesModule { }
