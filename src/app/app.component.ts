import { Component, ViewChild } from '@angular/core';
import { SecondLayoutComponent } from './second.layout.component';
import { GoldenLayoutComponent } from './golden.layout.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('mainLayout') mainLayoutComponent: GoldenLayoutComponent;
    @ViewChild('secondLayout') secondLayoutComponent: SecondLayoutComponent;

    popout(event) {
        this.secondLayoutComponent.popout();
    }
}
