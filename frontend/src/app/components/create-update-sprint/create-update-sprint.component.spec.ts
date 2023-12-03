import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSprintComponent } from './create-update-sprint.component';

describe('CreateUpdateSprintComponent', () => {
  let component: CreateUpdateSprintComponent;
  let fixture: ComponentFixture<CreateUpdateSprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateSprintComponent],
    });
    fixture = TestBed.createComponent(CreateUpdateSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
