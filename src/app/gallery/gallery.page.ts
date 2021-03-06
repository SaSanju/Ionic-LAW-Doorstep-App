import { Component, OnInit } from '@angular/core';

import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  videos: Object[] = [];
  count: Number = 5;

  constructor(private _feedService: FeedService) { }

  ngOnInit() {
    this.getYtVideos(this.count);
  }

  public getYtVideos(count: Number) {
    this._feedService.getVideos(count).subscribe(async res => {
      if (res && res.items) {
        res.items.map(this.videoMapperFunc).filter(Boolean);
        this.videos = Array.from(res.items, this.videoMapperFunc).filter(Boolean);
        console.log(this.videos);
      }
    });
  }

  private videoMapperFunc(curr) {
    return { videoId: curr.id.videoId, title: curr.snippet.title }
  }

}
