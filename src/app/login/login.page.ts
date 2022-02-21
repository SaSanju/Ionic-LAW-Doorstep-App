import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private nativeStorage: NativeStorage, private googlePlus: GooglePlus) { }

  ngOnInit() {
  }

  googleSignIn() {
    this.googlePlus.login({})
      .then(user => {
        console.log(user);
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          token: user.accessToken,
          picture: user.imageUrl
        }).then(() => {
          this.router.navigate(["/home"]);
        }, (error) => {
          console.log(error);
        })
      })
      .catch(err => console.log(`Error ${JSON.stringify(err)}`));
  }

}
