import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProgressbarComponent} from '../dropzone/progressbar/progressbar.component';
import {FileUploadServiceService} from '../file-upload-service.service';
import {DropZoneComponent} from '../dropzone/dropzone/dropzone.component';

@Component({
  selector: 'app-csv-file-import-panel',
  templateUrl: './csv-file-import-panel.component.html',
  styleUrls: ['./csv-file-import-panel.component.scss'],
  providers: [FileUploadServiceService]
})
export class CsvFileImportComponent implements OnInit, AfterViewInit {

  @ViewChild('uploadProgress') uploadingProgress: ProgressbarComponent;
  @ViewChild('transformationProgress') transformationProgress: ProgressbarComponent;
  @ViewChild(DropZoneComponent) dropZone: DropZoneComponent;

  private visible: boolean;
  private isInProgress: boolean;
  private fileUploadServiceService: FileUploadServiceService;

  constructor(fileUploadServiceService: FileUploadServiceService) {
    this.fileUploadServiceService = fileUploadServiceService;
  }

  ngOnInit() {
    this.visible = false;
    this.isInProgress = true;
  }

  ngAfterViewInit(): void {
    this.dropZone.onFileSelection().subscribe(file => {
      const csvUploadAndTransformation = this.fileUploadServiceService.upload(file);

      csvUploadAndTransformation.subscribeToUploadProgress(
        progress => this.uploadingProgress.updateProgress(progress));
      csvUploadAndTransformation.subscribeToTransformationProgress(
        progress => this.transformationProgress.updateProgress(progress));

      csvUploadAndTransformation.subscribeToResult(result => console.log('result: ' + result));
    });
  }

  public show() {
    this.visible = true;
  }

  public displayStyle(): String {
    if (!this.visible) {
      return 'none';
    }
    return 'block';
  }

}
