import { Component, ViewChild, AfterViewInit, ElementRef, ViewContainerRef, ComponentFactoryResolver, HostListener } from '@angular/core';
import { BottomLeftComponent } from './bottom-left.component';
import { BottomRightComponent } from './bottom-right.component';
declare let GoldenLayout: any;


@Component({
    selector: 'app-second-layout',
    templateUrl: './second.layout.component.html',
    entryComponents: [ BottomLeftComponent, BottomRightComponent ]
})
export class SecondLayoutComponent implements AfterViewInit {

    private config: any;
    private bottomLayout: any;

    @ViewChild('btmLayout') private layoutElement: ElementRef;
    private bottomLeftComponent: BottomLeftComponent;
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
                            title: 'Bottom',
                            componentName: 'app-bottom-left',
                            width: 50
                        },
                        {
                            type: 'component',
                            isCloseable: false,
                            title: 'Bottom',
                            componentName: 'app-bottom-right',
                            width: 50
                        }
                    ]
                }
            ]
        };
    }

    @HostListener('window:resive', ['$event'])
    onResize(event) {
        this.bottomLayout.resize();
    }

    ngAfterViewInit() {

        this.bottomLayout = new GoldenLayout(this.config, this.layoutElement.nativeElement);

        this.bottomLayout.registerComponent('app-bottom-left', (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(BottomLeftComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.bottomLeftComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            componentReference.changeDetectorRef.detectChanges();
            this.bottomLeftComponent.setEventHub(this.bottomLayout.eventHub);
        });

        this.bottomLayout.registerComponent('app-bottom-right', (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(BottomRightComponent);
            const componentReference = this.viewContainerRef.createComponent(factory);
            this.bottomRightComponent = componentReference.instance;
            container.getElement().append(componentReference.location.nativeElement);
            container['componentReference'] = componentReference;
            componentReference.changeDetectorRef.detectChanges();
        });

        this.bottomLayout.init();

    }

    public popout() {
        this.bottomLayout.root.contentItems[0].contentItems[1].popout();
    }
}
