import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from '@angular/forms';



@Component({
    selector: 'letsCHAT-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
    
    myForm: FormGroup;
    error: false;

    constructor(private fb:FormBuilder){
        this.error = false;
        this.myForm = fb.group({email:['',[Validators.required]],password:['',[Validators.required]]})
    }

    ngOnInit(): void {
    }

    login() {
    }
}