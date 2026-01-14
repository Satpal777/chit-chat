import { NgClass } from '@angular/common';
import { Component, input, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { Webrtc } from '../services/webrtc';
import { Subscription } from 'rxjs';
import { VideoStream } from '../directives/video-stream';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-video-frames',
  imports: [NgClass, VideoStream],
  templateUrl: './video-frames.html',
  styleUrl: './video-frames.css',
})
export class VideoFrames implements OnInit, OnDestroy {
  person = input<string>("Caller");
  background = input<string>("bg-green-200");
  isMine = input<boolean>(true);
  cameraStarted = signal(false);
  videoStream = signal<MediaStream | null>(null);
  micEnabled = signal(true);
  cameraEnabled = signal(true);
  private streamSubscription?: Subscription;
  private connectionSubscription?: Subscription;
  private router = inject(Router);
  private toastService = inject(ToastService);

  constructor(public webRtcService: Webrtc) { }

  get canStartCamera(): boolean {
    return this.cameraStarted() || this.webRtcService.isPeerConnectionActive();
  }

  get canHangUp(): boolean {
    return this.cameraStarted() || this.webRtcService.isPeerConnectionActive();
  }

  async toggleCamera() {
    if (!this.cameraStarted()) {
      // Start camera if not started
      try {
        await this.webRtcService.startLocalStream();
        this.cameraEnabled.set(true);
        this.micEnabled.set(true);
      } catch (err) {
        if (err instanceof Error) {
          this.toastService.error(err.message);
        }
      }
    } else {
      // Toggle camera on/off
      const enabled = this.webRtcService.toggleCamera();
      this.cameraEnabled.set(enabled);
    }
  }

  toggleMic() {
    const enabled = this.webRtcService.toggleMicrophone();
    this.micEnabled.set(enabled);
  }

  hangUp() {
    this.webRtcService.hangUp();
    // Redirect to home page after hanging up
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log('VideoFrames init - isMine:', this.isMine());
    const stream$ = this.isMine() ? this.webRtcService.localStream$ : this.webRtcService.remoteStream$;

    this.streamSubscription = stream$.subscribe((stream) => {
      console.log('VideoFrames stream update - isMine:', this.isMine(), 'stream:', stream);
      this.videoStream.set(stream);
      this.cameraStarted.set(stream !== null);

      // For remote stream, check if video track is enabled
      if (!this.isMine() && stream) {
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          // Initial state
          this.cameraEnabled.set(videoTrack.enabled);

          // Listen for mute/unmute events
          videoTrack.onmute = () => {
            console.log('Remote video track muted');
            this.cameraEnabled.set(false);
          };
          videoTrack.onunmute = () => {
            console.log('Remote video track unmuted');
            this.cameraEnabled.set(true);
          };
        }
      }
    });

    // Subscribe to connection state to detect disconnection (only for local user)
    if (this.isMine()) {
      this.connectionSubscription = this.webRtcService.connectionState$.subscribe((state) => {
        if (state.connectionState === 'disconnected' || state.connectionState === 'failed' || state.connectionState === 'closed') {
          this.toastService.error('Peer disconnected');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.streamSubscription?.unsubscribe();
    this.connectionSubscription?.unsubscribe();
  }
}
