import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  progress: Number = 0;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public updateProgress(progress: Number): ProgressbarComponent {
    this.progress = progress;
    this.cd.detectChanges();
    return this;
  }

  public getInnerWidth(): String {
    return this.progress + '%';
  }

}
