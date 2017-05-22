import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

/// <reference path="node_modules/@types/crypto-js/index.d.ts" />
import * as CryptoJS from 'crypto-js';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropZoneComponent implements OnInit {

  private CHUNK_SIZE = 1024;

  private fileObserver: ReplaySubject<File> = new ReplaySubject<File>();

  constructor() {
  }

  ngOnInit() {
  }


  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {

    event.preventDefault();
    const file: File = event.dataTransfer.files[0];

    let start = 0;
    const fileStop = file.size - 1;
    let stop = 1000;

    const reader = new FileReader();

    // If we use onloadend, we need to check the readyState.

    reader.onloadend = (progevent: ProgressEvent) => {
      // console.log(reader.result);
      //

      if (reader.readyState === 2) {
        const key = CryptoJS.enc.Base64.parse('HackersSeeIT2');
        const iv = CryptoJS.enc.Base64.parse('#base64IV#');
        const message = reader.result;

        // console.log(message);

        const encrypted = CryptoJS.AES.encrypt(message, key, {iv: iv});

        console.log(encrypted.ciphertext);

        start = start + this.CHUNK_SIZE;
        this.seek(reader, file, start);
      }
    }

    reader.onload = (progress: ProgressEvent) => console.log(Math.round(progress.loaded / progress.total * 100));

    this.seek(reader, file, 0);

  }

  public onFileSelection(): Observable<File> {
    return this.fileObserver;
  }

  private seek(fileReader: FileReader, file: File, offset: number) {
    if (offset >= file.size) {
      // No \r or \n found. The column size is equal to the full
      // file size
      console.log('end');
      return;
    }

    const slice = file.slice(offset, offset + this.CHUNK_SIZE);
    fileReader.readAsBinaryString(slice);
  }


}
