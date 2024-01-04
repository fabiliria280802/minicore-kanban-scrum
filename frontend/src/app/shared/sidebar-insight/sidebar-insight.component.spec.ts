import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInsightComponent } from './sidebar-insight.component';

describe('SidebarInsightComponent', () => {
  let component: SidebarInsightComponent;
  let fixture: ComponentFixture<SidebarInsightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarInsightComponent]
    });
    fixture = TestBed.createComponent(SidebarInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
