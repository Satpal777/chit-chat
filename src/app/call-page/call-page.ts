import { Component, OnInit } from '@angular/core';
import { VideoFrames } from "../video-frames/video-frames";
import { ConnectionState, Webrtc } from '../services/webrtc';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-call-page',
  imports: [VideoFrames],
  templateUrl: './call-page.html',
  styleUrl: './call-page.css',
})
export class CallPage implements OnInit {
  connectionState$!: Observable<ConnectionState>;

  constructor(private webRtcService: Webrtc) { }

  ngOnInit(): void {
    this.connectionState$ = this.webRtcService.connectionState$;
  }

}
