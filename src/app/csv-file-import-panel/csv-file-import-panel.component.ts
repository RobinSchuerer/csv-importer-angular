import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ProgressbarComponent} from './dropzone/progressbar/progressbar.component';
import {FileUploadService} from '../service/file-upload.service';
import {DropZoneComponent} from './dropzone/dropzone/dropzone.component';
import {AccountMovement} from '../domain/account-movement';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-csv-file-import-panel',
  templateUrl: './csv-file-import-panel.component.html',
  styleUrls: ['./csv-file-import-panel.component.scss'],
  providers: [FileUploadService, DataService]
})
export class CsvFileImportComponent implements OnInit, AfterViewInit {

  @ViewChild('uploadProgress') uploadingProgress: ProgressbarComponent;
  @ViewChild('transformationProgress') transformationProgress: ProgressbarComponent;
  @ViewChild(DropZoneComponent) dropZone: DropZoneComponent;

  private visible: boolean;
  private isInProgress: boolean;
  private hasData: boolean;
  private fileUploadServiceService: FileUploadService;
  private dataSets: AccountMovement[];

  constructor(fileUploadServiceService: FileUploadService, private dataService: DataService) {
    this.fileUploadServiceService = fileUploadServiceService;
  }

  ngOnInit() {
    this.visible = false;
    this.isInProgress = false;
    this.hasData = false;
  }

  ngAfterViewInit(): void {
    this.dropZone.onFileSelection().subscribe(file => {
      this.isInProgress = true;
      this.hasData = false;
      const fileUploadStatus = this.fileUploadServiceService.upload(file);

      fileUploadStatus.subscribeToUploadProgress(progress => this.uploadingProgress.updateProgress(progress));
      fileUploadStatus.subscribeToTransformationProgress(progress => this.transformationProgress.updateProgress(progress));
      fileUploadStatus.subscribeToResult(result => {
        this.isInProgress = false;
        this.hasData = true;
        this.dataSets = result;
        console.log('result: ' + this.dataSets);
      });
    });
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public displayStyle(): String {
    if (!this.visible) {
      return 'none';
    }
    return 'block';
  }

  public reset() {
    this.isInProgress = false;
    this.hasData = false;
  }

  public takeData() {
    this.dataService.setDataSets(this.dataSets);
    this.visible = false;
  }
}
