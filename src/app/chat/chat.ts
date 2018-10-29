import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { AuthenticationService } from '../authentication.service'

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

	constructor(private auth: AuthenticationService, private chatService: ChatService) {
		chatService.messages.subscribe(msg => {
			this.messageForDisplay = msg;
			console.log(8888, msg)
      console.log("Response from websocket: " + JSON.stringify(msg));
		});
	}

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

	usersFullName(userDetails) {
		let first_n = this.userDetails.first_name[0].toUpperCase() + this.userDetails.first_name.slice(1);
		let last_n = this.userDetails.last_name[0].toUpperCase() + this.userDetails.last_name.slice(1);
		let fullName = first_n + ' ' + last_n;
		return fullName
	};

	ngOnInit() {
		this.auth.profile().subscribe(user => {
			this.userDetails = user;
			this.message.author = this.usersFullName(this.userDetails);
			this.message.user = user._id
		});
  }
}