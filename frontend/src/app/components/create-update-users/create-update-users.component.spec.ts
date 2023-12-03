import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUsersComponent } from './create-update-users.component';

describe('CreateUpdateUsersComponent', () => {
  let component: CreateUpdateUsersComponent;
  let fixture: ComponentFixture<CreateUpdateUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateUsersComponent],
    });
    fixture = TestBed.createComponent(CreateUpdateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
