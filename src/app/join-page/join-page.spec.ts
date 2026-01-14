import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPage } from './join-page';

describe('JoinPage', () => {
  let component: JoinPage;
  let fixture: ComponentFixture<JoinPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
