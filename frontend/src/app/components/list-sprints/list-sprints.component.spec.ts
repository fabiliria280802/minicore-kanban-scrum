import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSprintsComponent } from './list-sprints.component';

describe('ListSprintsComponent', () => {
  let component: ListSprintsComponent;
  let fixture: ComponentFixture<ListSprintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSprintsComponent],
    });
    fixture = TestBed.createComponent(ListSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
