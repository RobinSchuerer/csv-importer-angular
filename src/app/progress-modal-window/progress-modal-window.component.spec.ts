import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressModalWindowComponent } from './progress-modal-window.component';

describe('ProgressModalWindowComponent', () => {
  let component: ProgressModalWindowComponent;
  let fixture: ComponentFixture<ProgressModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
