import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-jobs',
  templateUrl: './modal-jobs.component.html',
  styleUrls: ['./modal-jobs.component.css']
})
export class ModalJobsComponent implements OnInit {

  @Input('id') idJob: string = ''
  @Input() isEdit: boolean = false;
  displayModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.displayModal = true;
  }

  showModalDialog() {

  }

}
