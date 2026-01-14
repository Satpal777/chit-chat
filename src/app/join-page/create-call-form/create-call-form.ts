import { Component, inject, signal } from '@angular/core';
import { Webrtc } from '../../services/webrtc';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-create-call-form',
  imports: [],
  templateUrl: './create-call-form.html',
  styleUrl: './create-call-form.css',
})
export class CreateCallForm {
  private router = inject(Router);
  private toastService = inject(ToastService);
  constructor(private webRtcService: Webrtc) { }
  offer = signal<string | null>(null);
  copied = signal(false);

  async createOffer() {
    try {
      if (!this.webRtcService.isLocalStreamActive()) {
        await this.webRtcService.startLocalStream();
      }
      const offerCode = await this.webRtcService.createOffer();
      this.offer.set(offerCode);
    } catch (err) {
      if (err instanceof Error) {
        this.toastService.error(err.message);
      }
    }
  }

  async setAnswer(answer: string) {
    try {
      await this.webRtcService.setRemoteAnswer(answer);
      // Navigate to call page after successful connection
      this.router.navigate(['/call']);
    } catch (err) {
      if (err instanceof Error) {
        this.toastService.error(err.message);
      }
    }
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.toastService.error('Failed to copy code');
    });
  }
}
