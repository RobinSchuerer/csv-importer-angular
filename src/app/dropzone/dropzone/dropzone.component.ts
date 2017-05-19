import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProgressbarComponent} from '../progressbar/progressbar.component';

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
    // this.upload(file).subscribe((result) => console.log(result));

  }

  public onFileSelection(): Observable<File> {
    return this.fileObserver;
  }


}
