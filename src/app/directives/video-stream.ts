import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appVideoStream]',
})
export class VideoStream implements OnChanges, OnInit {
  @Input() appVideoStream: MediaStream | null = null;

  constructor(private el: ElementRef<HTMLVideoElement>) { }

  ngOnInit(): void {
    // Handle initial stream if it exists
    if (this.appVideoStream) {
      this.attachStream(this.appVideoStream);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appVideoStream']) {
      console.log('VideoStream directive - stream changed:', this.appVideoStream);
      if (this.appVideoStream) {
        this.attachStream(this.appVideoStream);
      } else {
        this.detachStream();
      }
    }
  }

  private attachStream(stream: MediaStream): void {
    const videoElement = this.el.nativeElement;
    console.log('Attaching stream to video element:', stream, videoElement);

    // Only attach if stream has tracks
    if (!stream || stream.getTracks().length === 0) {
      console.warn('Stream has no tracks, skipping attachment');
      return;
    }

    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.playsInline = true;

    // Play the video - handle the promise properly
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        // Only log if it's not an abort error (which happens during normal operation)
        if (err.name !== 'AbortError') {
          console.error('Error playing video:', err);
        }
      });
    }
  }

  private detachStream(): void {
    const videoElement = this.el.nativeElement;
    videoElement.srcObject = null;
  }
}
