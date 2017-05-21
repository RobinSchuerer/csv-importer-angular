import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Http, Headers, RequestOptions} from '@angular/http';
import {CsvUploadAndTransformation} from '../csv-upload-and-transformation';

@Injectable()
export class FileUploadService {

  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public upload(toUpload: File) {

    const uploadProgressSubject: ReplaySubject<Number> = new ReplaySubject<Number>();
    const transformationProgress: ReplaySubject<Number> = new ReplaySubject<Number>();

    const result2 = Observable.create(observer => {
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
                    // observer.next('okay');
                  }
                  transformationProgress.next(progress);
                }, error => {
                  subscription.unsubscribe();
                  return console.log(error);

                });
            });
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
      .withResultObservable(result2)
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
    const resultUrl = '/api/csv/result/' + ticketNumber;
    console.log('retrieving result from:' + resultUrl);

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});


    this.http
      .get(resultUrl, options)
      .subscribe(response => {
          console.log('response: ' + response);
          const result = response.json();
          console.log('result: ' + result);
          return observer.next(result);
        },
        error => console.error(error));
  }

  private calculateProgress(event) {
    const progress = Math.round(event.loaded / event.total * 100);
    return progress;
  }

}
