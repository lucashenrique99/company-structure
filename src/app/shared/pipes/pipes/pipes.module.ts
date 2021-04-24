import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { ActivePipe } from './pipes/active.pipe';
import { SquadRolePipe } from './pipes/squad-role.pipe';



@NgModule({
  declarations: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    SquadRolePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    SquadRolePipe,
  ],
  providers: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    PercentPipe,
    SquadRolePipe,
  ],
})
export class PipesModule { }
