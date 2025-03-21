import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
  if (control.value.includes('?')){
    return null;
  }
  return { doesNotContainQuestionMark:true }
}

function dummyAsyncFEmailIsUnique(control:AbstractControl){
  if (control.value === 'minou@cats.ca'){
    return of(null); //of instantly emits a value
  }
  return of({notUnique:true})
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit { //you can use OnInit because the form is created by code... in TD is on afterRender
  
  private destroyRef = inject(DestroyRef);
  
  form = new FormGroup({
    email: new FormControl('',{
      validators: [ Validators.email, Validators.required ]
    }),
    password: new FormControl('',{
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      asyncValidators: [dummyAsyncFEmailIsUnique]
    })
  });

  get emailIsInvalid(){
    return ( this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid)
  }

  get passwordIsInvalid(){
    return ( this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid)
  }

  ngOnInit(): void {

    const savedForm = window.localStorage.getItem('saved-login-form-reactive');
    if (savedForm){
      const loadedForm = JSON.parse(savedForm)
      this.form.patchValue({ email: loadedForm.email })
    }
    
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form-reactive',JSON.stringify({ email:value.email }))
      }
    })
    this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail,enteredPassword);
  }
}
