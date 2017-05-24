import {Component, HostListener, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropZoneComponent implements OnInit {

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
    console.log('drop file: ' + file.name + ' with type: ' + file.type);

    this.fileObserver.next(file);
  }

  public onFileSelection(): ReplaySubject<File> {
    return this.fileObserver;
  }

}
