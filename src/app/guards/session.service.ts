import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SessionService implements CanActivate {

  constructor(private authS: AuthService,private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    if(await this.authS.getStatus() === true){
      this.router.navigate(['/home']);
      return false;
    }else{
      return true;
    }
    //navega
   
  }
}
