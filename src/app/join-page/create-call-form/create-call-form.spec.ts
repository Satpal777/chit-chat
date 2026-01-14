import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCallForm } from './create-call-form';

describe('CreateCallForm', () => {
  let component: CreateCallForm;
  let fixture: ComponentFixture<CreateCallForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCallForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCallForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
