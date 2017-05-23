import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DropZoneComponent } from './csv-file-import-panel/dropzone/dropzone/dropzone.component';
import { ProgressbarComponent } from './csv-file-import-panel/dropzone/progressbar/progressbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressModalWindowComponent } from './csv-file-import-panel/progress-modal-window/progress-modal-window.component';
import { CsvFileImportComponent } from './csv-file-import-panel/csv-file-import-panel.component';
import {FileUploadService} from './service/file-upload.service';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DropZoneComponent,
    ProgressbarComponent,
    ProgressModalWindowComponent,
    CsvFileImportComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
