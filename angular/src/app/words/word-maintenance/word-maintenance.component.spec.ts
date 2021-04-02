import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordMaintenanceComponent } from './word-maintenance.component';

describe('WordMaintenanceComponent', () => {
  let component: WordMaintenanceComponent;
  let fixture: ComponentFixture<WordMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
