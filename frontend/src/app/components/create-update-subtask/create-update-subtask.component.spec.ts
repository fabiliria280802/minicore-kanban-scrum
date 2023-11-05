import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubtaskComponent } from './create-update-subtask.component';

describe('CreateUpdateSubtaskComponent', () => {
  let component: CreateUpdateSubtaskComponent;
  let fixture: ComponentFixture<CreateUpdateSubtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateSubtaskComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
