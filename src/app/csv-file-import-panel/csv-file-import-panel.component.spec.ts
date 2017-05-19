import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvFileImportComponent } from './csv-file-import-panel.component';

describe('CsvFileImportComponent', () => {
  let component: CsvFileImportComponent;
  let fixture: ComponentFixture<CsvFileImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvFileImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
