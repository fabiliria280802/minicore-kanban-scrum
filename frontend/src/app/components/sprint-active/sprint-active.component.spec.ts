import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintActiveComponent } from './sprint-active.component';

describe('SprintActiveComponent', () => {
  let component: SprintActiveComponent;
  let fixture: ComponentFixture<SprintActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintActiveComponent],
    });
    fixture = TestBed.createComponent(SprintActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
