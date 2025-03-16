import { Directive, effect, inject, input, TemplateRef, ViewContainerRef  } from '@angular/core';
import { type Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  usetType = input.required<Permission>({alias:'appAuth'});
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() { 
    effect(()=>{
      console.log('su madre',this.usetType())
      if (this.authService.activePermission()===this.usetType()){
        console.log('SHOW ELEMENT');
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
      else{
        console.log('DO NOT SHOW ELEMENT');
        this.viewContainerRef.clear();
      }
    })
  }

}
