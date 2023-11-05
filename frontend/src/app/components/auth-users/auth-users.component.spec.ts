import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsersComponent } from './auth-users.component';

describe('AuthUsersComponent', () => {
  let component: AuthUsersComponent;
  let fixture: ComponentFixture<AuthUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthUsersComponent]
    });
    fixture = TestBed.createComponent(AuthUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
