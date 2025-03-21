import { afterNextRender, Component, DestroyRef, signal, viewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-templatedriven',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponentTemplateDriven {

  //email = signal<string>('');

  private form = viewChild.required<NgForm>('myForm');
  private destroyRef = inject(DestroyRef);

  constructor(){
    //We are using afternextRender because angular creates the form because is Template driven
    afterNextRender(()=>{
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm){
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        //this.form().setValue({email:savedEmail,password:''}) //easier way in the next line
        setTimeout(()=>{this.form().controls['email'].setValue(savedEmail);},1)//setTimeout is workaround... it's a downsize for Template driven
        
      }
      const subscription = this.form().valueChanges?.pipe( debounceTime(500)) //the subscribing funcition will run every 500 ms
      .subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      });
      this.destroyRef.onDestroy(()=>subscription?.unsubscribe())
    });
    
  }

  onSubmit(formData: NgForm){

    if (formData.form.invalid){
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(formData);
    console.log(enteredEmail,enteredPassword);

    formData.form.reset();

  }


}