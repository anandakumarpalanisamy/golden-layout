import { Component, Output, ViewChild, AfterViewInit, ElementRef,
    ViewContainerRef, ComponentFactoryResolver, HostListener, EventEmitter } from '@angular/core';
import { AppComponent } from './app.component';
import { LeftComponent } from './left.component';
import { RightTopComponent } from './right-top.component';
import { RightBottomComponent } from './right-bottom.component';
import { BottomRightComponent } from './bottom-right.component';
declare let GoldenLayout: any;


@Component({
    selector: 'app-golden-layout',
    templateUrl: './golden.layout.component.html',
    entryComponents: [ LeftComponent, RightTopComponent, RightBottomComponent, BottomRightComponent ]
})
export class GoldenLayoutComponent implements AfterViewInit {

    private config: any;
    private layout: any;

    @ViewChild('layout') private layoutElement: ElementRef;
    @Output() popout: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() wish: EventEmitter<boolean> = new EventEmitter<boolean>();

    private leftComponent: LeftComponent;
    private rightTopComponent: RightTopComponent;
    private rightBottomComponent: RightBottomComponent;
    private bottomRightComponent: BottomRightComponent;

    constructor(private el: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.config = {
            settings: {
                popoutWholeStack: false,
            },
            content: [
                {
                    type: 'row',
                    width: 100,
                    height: 100,
                    isCloseable: false,
                    content: [
                        {
                            type: 'component',
                            isCloseable: false,
                            title: 'Left',
                            componentName: 'app-left',
                            width: 70
                        },
                        {
                            type: 'column',
                            isCloseable: false,
                            width: 30,
                            content: [
                                {
                                    type: 'component',
                                    title: 'Right Top',
                                    componentName: 'app-right-top',
                                    height: 70,
                                    isCloseable: false,
                                },
                                {
                                    type: 'component',
                                    title: 'Right Bottom',
                                    componentName: 'app-right-bottom',
                                    height: 30,
                                    isCloseable: false,
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
/* 
    @HostListener('window:resive', ['$event'])
    onResize(event) {
        this.layout.resize();
    }
 */
    ngAfterViewInit() {
        this.layout = new GoldenLayout(this.config, this.layoutElement.nativeElement);

        this.layout.registerComponent('app-left', (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(LeftComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.leftComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            componentReference.changeDetectorRef.detectChanges();
            this.leftComponent.setEventHub(this.layout.eventHub);
        });

        this.layout.registerComponent('app-right-top', (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(RightTopComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.rightTopComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            this.rightTopComponent.setEventHub(this.layout.eventHub);

            componentReference.changeDetectorRef.detectChanges();
        });

        this.layout.registerComponent('app-right-bottom', (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(RightBottomComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.rightBottomComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            componentReference.changeDetectorRef.detectChanges();
        });

        this.layout.registerComponent('app-bottom-right', (container, componentState) => {
            console.log('Executing Bottom Layout Registration');
            const factory = this.componentFactoryResolver.resolveComponentFactory(BottomRightComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.bottomRightComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            componentReference.changeDetectorRef.detectChanges();
        });


        this.layout.init();

        this.layout.eventHub.on('POPOUT_RIGHT_TOP', data => {
            this.layout.root.contentItems[0].contentItems[1].contentItems[0].popout();
        });

        this.layout.eventHub.on('POPOUT_BOTTOM', data => {
            this.popout.emit(true);
        });

    }

}
