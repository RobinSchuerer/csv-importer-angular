import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  private progress: String;

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
    const file = event.dataTransfer.files[0];
    console.log('drop file: ' + file.name + ' with type: ' + file.type);

    if (file.type !== 'text/csv') {
      alert('Es können nur CSV Dateien hochgeladen werden!');
      return;
    }

    const fileReader: FileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.addEventListener('progress', (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const percentLoaded = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        // Increase the progress bar length.
        this.progress = percentLoaded + '  ';
      }
    }, false);
  }
}
