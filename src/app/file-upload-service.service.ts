import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Http} from '@angular/http';
import {CsvUploadAndTransformation} from './csv-upload-and-transformation';

@Injectable()
export class FileUploadServiceService {

  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public upload(toUpload: File) {

    const uploadProgressSubject: ReplaySubject<Number> = new ReplaySubject<Number>();
    const transformationProgress: ReplaySubject<Number> = new ReplaySubject<Number>();
    const result = Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append('file', toUpload, toUpload.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          const ticketNumber: String = observer.resolve(xhr.response);

          const subscription = Observable
            .interval(100)
            .subscribe(() => {
              this.http
                .get('/api/status/' + ticketNumber)
                .map(response => Number.parseInt(response.text()))
                .subscribe(progress => {
                  if (progress === 100) {

                    // to end the polling
                    subscription.unsubscribe();
                    this.http
                      .get('/api/final/' + ticketNumber)
                      .subscribe(response => observer.next(response));
                  }

                  transformationProgress.next(progress);
                });
            });

          observer.complete();
        } else {
          observer.error(xhr.response);
        }
      };

      xhr.upload.onprogress = (event) => {
        const progress = this.calculateProgress(event);

        uploadProgressSubject.next(progress);
      };

      xhr.open('POST', '/api/csv', true);
      xhr.send(formData);
    });


    return CsvUploadAndTransformation
      .newBuilder()
      .withResultObservable(result)
      .withUploadProgressObservable(uploadProgressSubject)
      .withTransformationProgressObservable(transformationProgress)
      .build();
  }

  private calculateProgress(event) {
    const progress = Math.round(event.loaded / event.total * 100);
    return progress;
  }

}
