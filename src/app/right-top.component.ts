import { Component } from '@angular/core';

@Component({
    selector: 'app-right-top',
    templateUrl: './right-top.component.html'
})
export class RightTopComponent {

    public count = 0;
    private eventHub: any;

    constructor() {
    }

    setEventHub(hub: any) {
        this.eventHub = hub;
        this.eventHub.on('WISH', (data) => {
            console.log('Inside Wish Event');
            this.count += 1;
        });
    }

}
