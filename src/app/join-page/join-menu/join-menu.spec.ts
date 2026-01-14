import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMenu } from './join-menu';

describe('JoinMenu', () => {
  let component: JoinMenu;
  let fixture: ComponentFixture<JoinMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
