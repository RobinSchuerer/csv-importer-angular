import {Component, ViewChild} from '@angular/core';
import {CsvFileImportComponent} from './csv-file-import-panel/csv-file-import-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(CsvFileImportComponent) fileImport: CsvFileImportComponent;

  public showImportDialog() {
    this.fileImport.show();
  }
}
