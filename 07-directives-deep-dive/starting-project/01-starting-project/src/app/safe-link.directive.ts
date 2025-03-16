import { Directive, ElementRef, input, inject } from "@angular/core";
import { LogDirective } from "./log.directive";


@Directive({ 
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)':'onConfirmLeavePage($event)',
    },
    hostDirectives: [LogDirective]

})
export class SafeLinkDirective{
    
    queryParam = input('myapp')
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log('SafeLink is active')
    }
    
    onConfirmLeavePage(event: MouseEvent){
        const wantsToLeave = window.open('Do you want to leave?');
        if (wantsToLeave){
            // const address = (event.target as HTMLAnchorElement).href;
            // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam;
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam;
            return;
        }
        event.preventDefault();
    }
}
//Alternatively you can use @HostListener instead of host in config object