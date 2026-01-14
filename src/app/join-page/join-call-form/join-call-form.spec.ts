import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCallForm } from './join-call-form';

describe('JoinCallForm', () => {
  let component: JoinCallForm;
  let fixture: ComponentFixture<JoinCallForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCallForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinCallForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
