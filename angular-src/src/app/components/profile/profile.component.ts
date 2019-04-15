import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  userDetais: Object = {};

  constructor(
    private authService:AuthService, 
    private router:Router,  
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });
  }

  onUserDetailsSubmit(details){
    this.authService.addUserDetails({...details, id: this.user._id}).subscribe(data => {
      window.scrollTo(0,0);
      if(data.success){
        this.flashMessage.show('Your changes are saved', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Your changes are not saved', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
