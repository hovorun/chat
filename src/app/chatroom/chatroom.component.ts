import {Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller', {static: false}) private feedContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  scrollToBottom() {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
