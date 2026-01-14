import { VideoStream } from './video-stream';

describe('VideoStream', () => {
  it('should create an instance', () => {
    const directive = new VideoStream();
    expect(directive).toBeTruthy();
  });
});
