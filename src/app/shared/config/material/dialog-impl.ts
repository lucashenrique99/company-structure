import { MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class DialogImpl extends MatDialogConfig {

    constructor(private breakpointObserver: BreakpointObserver) {
        super();
        // this.minWidth = '60%';
        // this.maxHeight = '90%';

        const isSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
        if (isSmall) {
            this.maxWidth = '100%';
        }
        this.autoFocus = false;
    }

}