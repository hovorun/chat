import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: any;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    console.log(`feed initializing...`);
    this.feed = this.chat.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages().valueChanges();
  }


}
