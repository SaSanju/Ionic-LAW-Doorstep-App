import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authS: AuthService,private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    if(await this.authS.getStatus() === true){
      return true;
    }else{
      this.router.navigate(['/signup']);
      return false;
    }
  }
}
