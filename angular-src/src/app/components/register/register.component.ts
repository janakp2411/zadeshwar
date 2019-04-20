import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name.trim().toUpperCase(),
      email: this.email.trim().toUpperCase(),
      password: this.password.trim(),
      confirmPassword: this.confirmPassword.trim()
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      window.scrollTo(0,0);
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      window.scrollTo(0,0);
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(this.confirmPassword !== this.password){
      window.scrollTo(0,0);
      this.flashMessage.show("Password didn't match", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      window.scrollTo(0,0);
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
