import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFrames } from './video-frames';

describe('VideoFrames', () => {
  let component: VideoFrames;
  let fixture: ComponentFixture<VideoFrames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoFrames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoFrames);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
