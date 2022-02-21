import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private nativeStorage: NativeStorage) { }

  getStatus(): Promise<boolean> {
    return this.nativeStorage.getItem('google_user').then(
      data => data ? true : false,
      error => {
        console.log(error);
        return false;
      }
    );
  }
}
