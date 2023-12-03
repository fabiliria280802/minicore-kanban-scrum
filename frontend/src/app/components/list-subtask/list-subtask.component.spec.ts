import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubtaskComponent } from './list-subtask.component';

describe('ListSubtaskComponent', () => {
  let component: ListSubtaskComponent;
  let fixture: ComponentFixture<ListSubtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubtaskComponent],
    });
    fixture = TestBed.createComponent(ListSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
