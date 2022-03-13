import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  ngOnInit(){  }
  closeNav(){
    document.getElementById('navbarSupportedContent')?.classList.remove('show')
  }
}
