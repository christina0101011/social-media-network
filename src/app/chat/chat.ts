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
	sentTo: string;
	sentFrom: string;
	message = {
		 sentTo: [],
		 sentFrom: '',
		 conversation: null,
		 created_at: null,
		 content: 'test'
	 }
	ms: string;
	messageForDisplay: any;
	usersAvailableUsers: any;
	// conversationHistory: Array<any> = []

	constructor(
		private auth: AuthenticationService, 
		private chatService: ChatService, 
		private _blogsService: BlogsService) {
		chatService.messages.subscribe(msg => {
			this.messageForDisplay = msg;
      console.log("Response from websocket: ", msg);
		});
	}

	serverUrl = this._blogsService.makeImgLink();

	sendMsgOnEnterKey(event){
		if (event.keyCode === 13 && this.ms) {
			this.message.content = this.ms;
			this.message.sentTo.push(this.sentTo);
			console.log('new message from client to websocket: ', this.message);
			this.chatService.messages.next(this.message);
			this.ms = '';
		}
	}

  sendMsg() {
		if (this.ms) {
			this.message.content = this.ms;
			this.message.sentTo.push(this.sentTo);
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

	chooseChatParticipant(_id){
		this.sentTo = _id;
    this.chatService.getConversation(_id).subscribe((conversationHistory: Array<any>) => {
			if (conversationHistory.length !== 0){
				console.log(conversationHistory)
			} else {
				console.log('conversationHistory not found')
			}
		})
	}

	ngOnInit() {
		this.auth.profile().subscribe(user => {
			this.userDetails = user;
			// this.message.user = user._id;
			this.message.sentFrom = user._id;
		});

		this.chatService.getAvailableUsers().subscribe(users => {
			this.usersAvailableUsers = users;
		});
  }
}