import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DropZoneComponent } from './dropzone/dropzone/dropzone.component';
import { ProgressbarComponent } from './dropzone/progressbar/progressbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressModalWindowComponent } from './progress-modal-window/progress-modal-window.component';
import { CsvFileImportComponent } from './csv-file-import-panel/csv-file-import-panel.component';
import {FileUploadService} from './file-upload.service';

@NgModule({
  declarations: [
    AppComponent,
    DropZoneComponent,
    ProgressbarComponent,
    ProgressModalWindowComponent,
    CsvFileImportComponent
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
