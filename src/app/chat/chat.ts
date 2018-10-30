import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { AuthenticationService } from '../authentication.service'
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  providers: [ WebsocketService, ChatService, AuthenticationService ]
})

export class ChatComponent {
	userDetails: any;
	message = {
		 author: '',
		 user: '',
		 message: 'test'
	 }
	ms: string;
	messageForDisplay: any;
	usersAvailableUsers: any;

	constructor(
		private auth: AuthenticationService, 
		private chatService: ChatService, 
		private _blogsService: BlogsService) {
		chatService.messages.subscribe(msg => {
			this.messageForDisplay = msg;
			console.log(8888, msg)
      console.log("Response from websocket: " + JSON.stringify(msg));
		});
	}

	serverUrl = this._blogsService.makeImgLink();

	sendMsgOnEnterKey(event){
		if (event.keyCode === 13 && this.ms) {
			this.message.message = this.ms;
			console.log('new message from client to websocket: ', this.message);
			this.chatService.messages.next(this.message);
			this.ms = '';
		}
	}

  sendMsg() {
		if (this.ms) {
			this.message.message = this.ms;
			console.log('new message from client to websocket: ', this.message);
			this.chatService.messages.next(this.message);
			this.ms = '';
	  }
	}

	usersFullName(first_name, last_name) {
		let first_n = first_name[0].toUpperCase() + first_name.slice(1);
		let last_n = last_name[0].toUpperCase() + last_name.slice(1);
		let fullName = first_n + ' ' + last_n;
		return fullName
	};

	ngOnInit() {
		this.auth.profile().subscribe(user => {
			this.userDetails = user;
			// this.message.author = this.usersFullName(this.userDetails.first_name, this.userDetails.last_name);
			this.message.user = user._id
		});

	 this.chatService.getAvailableUsers().subscribe(users => {
		this.usersAvailableUsers = users;
		// console.log(999, this.usersAvailableUsers)
 	});
  }
}