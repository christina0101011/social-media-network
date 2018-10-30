import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { BlogsService } from '../blogs.service';
import { map } from 'rxjs/operators/map'; 

const CHAT_URL = 'ws://localhost:3000/echo';
const url = 'http://localhost:3000';

export interface Message {
	author: string,
	user: string,
	message: string
}

interface TokenResponse {
  token: string;
}

@Injectable()

export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService,
		private http: HttpClient,
		private auth: AuthenticationService,
		private _BlogsService: BlogsService) {

		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					user: data.user,
					message: data.message
				}
			});
	}

	getAvailableUsers(){
	return this.http.get(url + '/api/users/all', 
	{ headers: { Authorization: `Bearer ${this._BlogsService.getToken()}` }}).pipe(
		map((data: TokenResponse) => {
			if (data.token) {
				this.auth.saveToken(data.token);
			}
			return data;
		})
	)
 }
}
