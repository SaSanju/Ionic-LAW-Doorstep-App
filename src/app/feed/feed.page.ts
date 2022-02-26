import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { FeedService } from '../services/feed.service';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.page.html',
	styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
	public projects: [];
	public user: Object = {};

	constructor(private toastCtrl: ToastController,
		private router: Router,
		private nativeStorage: NativeStorage,
		private googlePlus: GooglePlus, private _feedService: FeedService) { }

	ngOnInit() {
		this.getProjects();
		this.fetchProfileInfo();
	}

	public getProjects() {
		this._feedService.getFeeds().subscribe(async res => {
			if (res) {
				this.projects = res;
				console.log(this.projects);
			} else {
				let toast = await this.toastCtrl.create({
					message: res.message,
					duration: 2500
				});
				await toast.present();
			}
		});
	}

	/**
	 * fetchProfileInfo
	 */
	public fetchProfileInfo() {
		this.nativeStorage.getItem('user_app')
			.then(data => {
				this.user = {
					name: data.name,
					email: data.email,
					picture: data.picture,
				};
			}, error => {
				console.log(error);
			});
	}

	/**
	 * logOut
	 */
	public logOut() {
		this.googlePlus.logout()
			.then(res => {
				//user logged out so we will remove him from the NativeStorage
				this.nativeStorage.remove("user_app")
					.then(
						_ => {
							this.router.navigate(["/login"]);
						},
						error => console.error(error)
					);
			}, err => {
				console.log(err);
				this.googlePlus.trySilentLogin({}).then(_ => {
					this.logOut()
				},
					error => console.error(error)
				)
			});
	}

}
