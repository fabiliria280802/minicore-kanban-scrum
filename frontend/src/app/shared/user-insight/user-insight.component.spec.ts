import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsightComponent } from './user-insight.component';

describe('UserInsightComponent', () => {
  let component: UserInsightComponent;
  let fixture: ComponentFixture<UserInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInsightComponent]
    });
    fixture = TestBed.createComponent(UserInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
