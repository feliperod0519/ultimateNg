import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'letCHATbeta';
  hideArticle: boolean = true;
  hideMain: boolean = true;
  hideOurInfo: boolean = true;
  
  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.toggleVisual();
  }

  toggleVisual(){
    this.hideArticle = !this.hideArticle;
    this.hideMain = !this.hideMain;
    this.hideOurInfo = !this.hideOurInfo;
  }

  pasarAModoApp(){
    this.toggleVisual();
    this.router.navigateByUrl('/login');
  }
}
