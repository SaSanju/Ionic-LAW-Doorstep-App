import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  public projects: [];

  constructor(private toastCtrl: ToastController, private _feedService: FeedService) { }

  ngOnInit() {
    this.getProjects();
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

}
