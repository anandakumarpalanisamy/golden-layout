import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GoldenLayoutComponent } from './golden.layout.component';
import { LeftComponent } from './left.component';
import { RightTopComponent } from './right-top.component';
import { RightBottomComponent } from './right-bottom.component';
import { SecondLayoutComponent } from './second.layout.component';
import { BottomLeftComponent } from './bottom-left.component';
import { BottomRightComponent } from './bottom-right.component';

@NgModule({
  declarations: [
    AppComponent,
    GoldenLayoutComponent,
    LeftComponent,
    RightTopComponent,
    RightBottomComponent,
    SecondLayoutComponent,
    BottomLeftComponent,
    BottomRightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
