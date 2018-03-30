import { Component } from '@angular/core';

@Component({
    selector: 'app-bottom-left',
    templateUrl: './bottom-left.component.html'
})
export class BottomLeftComponent {

    private eventHub: any;

    setEventHub(hub: any) {
        this.eventHub = hub;
    }
}

