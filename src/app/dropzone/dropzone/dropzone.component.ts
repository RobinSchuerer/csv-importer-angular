import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ProgressbarComponent} from "../progressbar/progressbar.component";

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit, AfterViewInit {
  progressObserver: any;

  @ViewChild(ProgressbarComponent) progressBar: ProgressbarComponent;

  constructor() {
    this.progressObserver = new ReplaySubject<Number>();
  }

  ngOnInit() {
    this.progressObserver.subscribe((progress) => {
      this.progressBar.updateProgress(progress);
      console.log(progress);
    });
  }

  ngAfterViewInit() {
    this.progressBar.updateProgress(0);
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

    // if (file.type !== 'text/csv') {
    //   alert('Es können nur CSV Dateien hochgeladen werden!');
    //   return;
    // }

    this.upload(file).subscribe((result) => console.log(result));

  }

  private upload(toUpload: File) {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', toUpload, toUpload.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('complete');
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        const progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(progress);
      };

      xhr.open('POST', '/api/csv', true);
      xhr.send(formData);
    });
  }

}
