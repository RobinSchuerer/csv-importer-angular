import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-modal-window',
  templateUrl: './progress-modal-window.component.html',
  styleUrls: ['./progress-modal-window.component.scss']
})
export class ProgressModalWindowComponent implements OnInit {

  private visible: boolean;

  constructor() {
    this.visible = false;
  }

  ngOnInit() {
  }

  public show() {
    this.visible = true;
  }

  public close() {
    this.visible = false;
  }
}
