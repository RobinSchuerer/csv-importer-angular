import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DropzoneComponent } from './dropzone/dropzone/dropzone.component';
import { ProgressbarComponent } from './dropzone/progressbar/progressbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DropzoneComponent,
    ProgressbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
