import {Observable} from 'rxjs/Observable';
import {CsvUploadAndTransformationBuilder} from './csv-upload-and-transformation-builder';
export class CsvUploadAndTransformation {

  private uploadProgressObservable: Observable<Number>;
  private transformationProgressObservable: Observable<Number>;
  private resultObservable: Observable<any>;

  public static newBuilder() {
    return new CsvUploadAndTransformationBuilder();
  }

  constructor(builder: CsvUploadAndTransformationBuilder) {
    this.resultObservable = builder.resultObservable;
    this.transformationProgressObservable = builder.transformationProgressObservable;
    this.uploadProgressObservable = builder.uploadProgressObservable;
  }

  public subscribeToUploadProgress(subscriber): CsvUploadAndTransformation {
    this.uploadProgressObservable.subscribe(subscriber);

    return this;
  }

  public subscribeToTransformationProgress(subscriber): CsvUploadAndTransformation {
    this.transformationProgressObservable.subscribe(subscriber);

    return this;
  }

  public subscribeToResult(subscriber): CsvUploadAndTransformation {
    this.resultObservable.subscribe(subscriber);

    return this;
  }

}
