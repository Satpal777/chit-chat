import { Component, inject, signal } from '@angular/core';
import { Webrtc } from '../../services/webrtc';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-join-call-form',
  imports: [],
  templateUrl: './join-call-form.html',
  styleUrl: './join-call-form.css',
})
export class JoinCallForm {
  private router = inject(Router);
  private toastService = inject(ToastService);
  constructor(private webRtcService: Webrtc) { }
  answer = signal<string | null>(null);
  copied = signal(false);

  async pasteOffer(offer: string) {
    try {
      if (!this.webRtcService.isLocalStreamActive()) {
        await this.webRtcService.startLocalStream();
      }
      const answerCode = await this.webRtcService.createAnswer(offer);
      this.answer.set(answerCode);
      console.log(answerCode);
      // Don't auto-navigate - let user copy the answer code first
    } catch (err) {
      if (err instanceof Error) {
        this.toastService.error(err.message);
      }
    }
  }

  goToCall() {
    this.router.navigate(['/call']);
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
