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
  userDetailsData: any = [{}];

  constructor(
    private authService:AuthService, 
    private router:Router,  
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.userDetailsData = profile && profile.userDetails || [{}];
    },
     err => {
       console.log(err);
       return false;
     });
  }

  onAddNewUser(){
    this.userDetailsData.push({});
  }

  onDeleteMember(index){
    this.userDetailsData.splice(index, 1);
    if(!this.userDetailsData.length){
      this.userDetailsData.push({})
    }
  }

  onClearMember(index){
    this.userDetailsData[index] = {};
  }

  onUserDetailsSubmit(details){
    const userData = details.filter(data => Object.keys(data).length);
    this.authService.addUserDetails({userDetails: {userDetails: userData, id: this.user._id}}).subscribe(data => {
      window.scrollTo(0,0);
      if(data.success){
        this.userDetailsData = userData;
        this.flashMessage.show('Your changes are saved', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Your changes are not saved', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
