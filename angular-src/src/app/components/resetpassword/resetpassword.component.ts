import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  newPassword: String;
  confirmNewPassword: String;
  token: String;
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return  c.substring(name.length, c.length);
        }
    }
    return "";
}

   onResetPassword(){
    const newPass = this.newPassword.trim();
    const confirmPass= this.confirmNewPassword.trim();
    var token = this.getCookie('token');
    if(newPass != confirmPass){
        this.flashMessage.show("Password not matched.", {
        cssClass: 'alert-danger',
        timeout: 5000});
        return;
    } else{
        var pass = { 
          pass: newPass,
          token: token
         };
        
        this.authService.resetPasswordService(pass).subscribe(data => {
        if(data.success){
          this.flashMessage.show('Password changed successfully', {
            cssClass: 'alert-success',
            timeout: 5000});
          this.router.navigate(['login']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000});
          this.router.navigate(['resetpassword']);
        }
      });
    }
    
  }

}
