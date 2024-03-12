import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router:Router){}
  grid(){
    this.router.navigate(['/grid']);
  }

  crossTab1(){
    this.router.navigate(['/crossTab1']);
  }

  crossTab2(){
    this.router.navigate(['/crossTab2']);
  }
}
