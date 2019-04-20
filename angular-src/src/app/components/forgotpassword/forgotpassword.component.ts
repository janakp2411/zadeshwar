import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email : String;
  
    constructor(
    private authService:AuthService,
     private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
  }
  onForgotPassword(){
    const email = {
      email: this.email.trim().toUpperCase()
    }

    // Validate Email
    if(!this.validateService.validateEmail(email.email) || email.email == undefined){
        window.scrollTo(0,0);
        this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
    }

    this.authService.forgotPasswordService(email).subscribe(data => {
      window.scrollTo(0,0);
      if(data.success){
        this.flashMessage.show('Please go to your email and click on the link to change password', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['forgotpassword']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['forgotpassword']);
      }
    });
  }

}
