import { Component } from '@angular/core';

@Component({
    selector: 'app-left',
    templateUrl: './left.component.html'
})
export class LeftComponent {

    private eventHub: any;

    popoutRightTop() {
        this.eventHub.emit('POPOUT_RIGHT_TOP');
    }

    popoutBottom() {
        this.eventHub.emit('POPOUT_BOTTOM');
    }

    setEventHub(hub: any) {
        this.eventHub = hub;
    }

    wish() {
        this.eventHub.emit('WISH');
    }
}
