import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FeedService {
	YT_API_KEY: any = environment.ytAPIKey;
	channelId: any = environment.ytChannelId;
	endpoint: string = "https://baconipsum.com/api/?type=meat-and-filler";
	ytEndpoint: string = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet";
	public token;
	public headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private _http: HttpClient) {
		// this.token = _userService.getToken();
	}

	private extractData(res: Response) {
		return res || [] || {};
	}

	getFeeds(): Observable<any> {
		// let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint).pipe(map(this.extractData));
	}

	getVideos(maxCount: Number): Observable<any> {
		// let headers = this.headers.set('Authorization', token);
		this.ytEndpoint = this.ytEndpoint + `&channelId=${this.channelId}&maxResults=${maxCount}&key=${this.YT_API_KEY}`;
		return this._http.get(this.ytEndpoint).pipe(map(this.extractData));
	}

	// public addProject(token, project: Project): Observable<any> {
	// 	let headers = this.headers.set('Authorization', token);
	// 	let params = JSON.stringify(project);
	// 	return this._http.post(this.endpoint + 'projects/', params, { headers: headers }).pipe(map(this.extractData));
	// }

	// public editProject(project: Project, token): Observable<any> {
	// 	let params = JSON.stringify(project);
	// 	let headers = this.headers.set('Authorization', token);
	// 	return this._http.put(this.endpoint + 'projects/' + project._id, params, { headers: headers }).pipe(map(this.extractData));
	// }

	// public deleteProject(id, token): Observable<any> {
	// 	let headers = this.headers.set('Authorization', token);
	// 	return this._http.delete(this.endpoint + 'projects/' + id, { headers: headers }).pipe(map(this.extractData));
	// }
}
