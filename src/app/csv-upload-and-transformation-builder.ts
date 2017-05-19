import {Observable} from 'rxjs/Observable';
import {CsvUploadAndTransformation} from './csv-upload-and-transformation';
export class CsvUploadAndTransformationBuilder {

  uploadProgressObservable: Observable<Number>;
  transformationProgressObservable: Observable<Number>;
  resultObservable: Observable<any>;

  public withUploadProgressObservable(observable: Observable<Number>): CsvUploadAndTransformationBuilder {
    this.uploadProgressObservable = observable;
    return this;
  }

  public withTransformationProgressObservable(observable: Observable<Number>): CsvUploadAndTransformationBuilder {
    this.transformationProgressObservable = observable;
    return this;
  }

  public withResultObservable(observable: Observable<any>): CsvUploadAndTransformationBuilder {
    this.resultObservable = observable;
    return this;
  }

  public build(): CsvUploadAndTransformation {
    return new CsvUploadAndTransformation(this);
  }
}
