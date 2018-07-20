import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';

import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: FormGroup;
  response_data: any;
  error_message: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public authService: AuthServiceProvider, private alertCtrl: AlertController) {

    this.credentials = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.credentials.value.type = "login";
    console.log(this.credentials.value);
    this.authService.post_data(this.credentials.value, "login.php").then((result) => {

      this.response_data = result;
      console.log(this.response_data);

      if(this.response_data.status == "Success") {
        localStorage.setItem("user_data", JSON.stringify(this.response_data));
        this.present_alert("Success", "Logged in successfully");
        this.navCtrl.setRoot(HomePage);
        return;
      } else {
        this.error_message = "";
        for(var i = 0; i < this.response_data.errors.length; i++) {
          this.error_message += this.response_data.errors[i] + "<br>";
        }
        this.present_alert("Error", this.error_message);
        this.credentials['controls']['password'].reset();
        return;
      }
    });
  }

  back() {
    this.navCtrl.push(WelcomePage);
  }

  present_alert(status,message) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
