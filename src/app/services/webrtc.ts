import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConnectionState {
  isConnected: boolean;
  connectionState: RTCPeerConnectionState | null;
}

@Injectable({
  providedIn: 'root',
})
export class Webrtc {

  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;

  private localStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  private remoteStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  private connectionStateSubject = new BehaviorSubject<ConnectionState>({
    isConnected: false,
    connectionState: null
  });

  public localStream$ = this.localStreamSubject.asObservable();
  public remoteStream$ = this.remoteStreamSubject.asObservable();
  public connectionState$ = this.connectionStateSubject.asObservable();

  private config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  async startLocalStream(): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      console.log('Local stream started:', this.localStream);
      this.localStreamSubject.next(this.localStream);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      throw new Error('Could not access camera/microphone. Please check permissions.');
    }
  }

  private createPeerConnection(): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.config);

    pc.onicecandidate = (event) => {
      console.log('ICE candidate:', event.candidate);
    };

    pc.ontrack = (event) => {
      console.log('Remote track received:', event);
      this.remoteStream = event.streams[0];
      console.log('Emitting remote stream:', this.remoteStream);
      this.remoteStreamSubject.next(this.remoteStream);
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      const isConnected = pc.connectionState === 'connected';
      const isDisconnected = pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed';

      this.connectionStateSubject.next({
        isConnected,
        connectionState: pc.connectionState
      });

      // Notify when peer disconnects
      if (isDisconnected) {
        console.log('Peer disconnected');
      }
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream!);
      });
    }

    this.peerConnection = pc;
    return pc;
  }

  async createOffer(): Promise<string> {
    if (!this.localStream) {
      throw new Error('Please start your camera first');
    }

    const pc = this.createPeerConnection();
    const offerDesc = await pc.createOffer();
    await pc.setLocalDescription(offerDesc);

    await this.waitForIceGathering(pc);

    return JSON.stringify(pc.localDescription);
  }

  async createAnswer(offerJson: string): Promise<string> {
    if (!this.localStream) {
      throw new Error('Please start your camera first');
    }

    if (!offerJson) {
      throw new Error('Please provide an offer');
    }

    try {
      const pc = this.createPeerConnection();
      const offerDesc = JSON.parse(offerJson);
      await pc.setRemoteDescription(new RTCSessionDescription(offerDesc));

      const answerDesc = await pc.createAnswer();
      await pc.setLocalDescription(answerDesc);

      await this.waitForIceGathering(pc);

      return JSON.stringify(pc.localDescription);
    } catch (err) {
      console.error('Error creating answer:', err);
      throw new Error('Invalid offer format. Please check the JSON.');
    }
  }

  async setRemoteAnswer(answerJson: string): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Please create an offer first');
    }

    if (!answerJson) {
      throw new Error('Please provide an answer');
    }

    try {
      const answerDesc = JSON.parse(answerJson);
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answerDesc));
    } catch (err) {
      console.error('Error setting remote answer:', err);
      throw new Error('Invalid answer format. Please check the JSON.');
    }
  }

  private waitForIceGathering(pc: RTCPeerConnection): Promise<void> {
    return new Promise(resolve => {
      if (pc.iceGatheringState === 'complete') {
        resolve();
      } else {
        const checkState = () => {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', checkState);
            resolve();
          }
        };
        pc.addEventListener('icegatheringstatechange', checkState);
      }
    });
  }

  hangUp(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    this.remoteStream = null;

    this.localStreamSubject.next(null);
    this.remoteStreamSubject.next(null);
    this.connectionStateSubject.next({
      isConnected: false,
      connectionState: null
    });
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  isLocalStreamActive(): boolean {
    return this.localStream !== null;
  }

  isPeerConnectionActive(): boolean {
    return this.peerConnection !== null;
  }

  toggleMicrophone(): boolean {
    if (!this.localStream) return false;

    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
    return false;
  }

  toggleCamera(): boolean {
    if (!this.localStream) return false;

    const videoTrack = this.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
    return false;
  }

  isMicrophoneEnabled(): boolean {
    if (!this.localStream) return false;
    const audioTrack = this.localStream.getAudioTracks()[0];
    return audioTrack ? audioTrack.enabled : false;
  }

  isCameraEnabled(): boolean {
    if (!this.localStream) return false;
    const videoTrack = this.localStream.getVideoTracks()[0];
    return videoTrack ? videoTrack.enabled : false;
  }
}
