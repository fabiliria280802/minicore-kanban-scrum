import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSprintComponent } from './list-sprint.component';

describe('ListSprintComponent', () => {
  let component: ListSprintComponent;
  let fixture: ComponentFixture<ListSprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSprintComponent]
    });
    fixture = TestBed.createComponent(ListSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
