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
          const ticketNumber: String = xhr.response;

          const subscription = Observable
            .interval(100)
            .subscribe(() => {
              this.http
                .get('/api/csv/status/' + ticketNumber)
                .map(response => Number.parseInt(response.text()))
                .subscribe(progress => {
                  console.log('status: ' + progress);
                  if (this.hasEnded(progress)) {
                    this.getResultAndStopPolling(subscription, ticketNumber, observer);
                  }
                  transformationProgress.next(progress);
                }, error => {
                  subscription.unsubscribe();
                  return console.log(error);

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

  private hasEnded(progress) {
    return progress === 100;
  }

  private getResultAndStopPolling(subscription: any, ticketNumber: String, observer) {
    // to end the polling
    subscription.unsubscribe();

    console.log('stop polling');

    // call for result
    this.http
      .get('/api/csv/result/' + ticketNumber)
      .subscribe(response => {
        const result = response.json().data;
        console.log('result' + result);
        return observer.next(result);
      });
  }

  private calculateProgress(event) {
    const progress = Math.round(event.loaded / event.total * 100);
    return progress;
  }

}
