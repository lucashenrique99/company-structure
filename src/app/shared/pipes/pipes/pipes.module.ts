import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { ActivePipe } from './pipes/active.pipe';
import { SquadRolePipe } from './pipes/squad-role.pipe';
import { ReleaseTrainRolePipe } from './pipes/release-train-role.pipe';



@NgModule({
  declarations: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    SquadRolePipe,
    ReleaseTrainRolePipe,
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
    ReleaseTrainRolePipe,
  ],
  providers: [
    StatusPipe,
    MaxLengthPipe,
    DynamicPipe,
    ActivePipe,
    PercentPipe,
    SquadRolePipe,
    ReleaseTrainRolePipe,
  ],
})
export class PipesModule { }
