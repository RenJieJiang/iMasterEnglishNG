import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceMaintenanceComponent } from './sentence-maintenance.component';

describe('SentenceMaintenanceComponent', () => {
  let component: SentenceMaintenanceComponent;
  let fixture: ComponentFixture<SentenceMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentenceMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
