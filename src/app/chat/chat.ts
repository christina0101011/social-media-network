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
		 message: ''
	 }

	constructor(private auth: AuthenticationService, private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + JSON.stringify(msg));
		});
	}

  sendMsg(message) {
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}

	ngOnInit() {
		this.auth.profile().subscribe(user => {
			this.userDetails = user;
			// console.log(this.userDetails.first_name)
			this.message.author = this.userDetails.first_name;
		});
  }
}