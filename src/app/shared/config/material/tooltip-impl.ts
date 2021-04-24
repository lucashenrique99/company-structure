import { MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { Injectable } from '@angular/core';


@Injectable()
export class TooltipImpl implements MatTooltipDefaultOptions {

    showDelay: number;
    hideDelay: number;
    touchendHideDelay: number;
    touchGestures?: import("@angular/material/tooltip").TooltipTouchGestures;
    position?: import("@angular/material/tooltip").TooltipPosition;

    constructor() {
        this.showDelay = 0;
        this.hideDelay = 0;
        this.touchendHideDelay = 1500;
        this.touchGestures = "off";
    }

}