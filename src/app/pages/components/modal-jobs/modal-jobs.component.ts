import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/interfaces/jobs.interface';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-modal-jobs',
  templateUrl: './modal-jobs.component.html',
  styleUrls: ['./modal-jobs.component.css']
})
export class ModalJobsComponent implements OnInit {

  @Input('job') selectedJob: Job | undefined
  @Input() isEdit: boolean = false;
  @Input() displayModal = false;

  @Output() isDisplayed: EventEmitter<boolean> = new EventEmitter();
  @Output() loadJobs: EventEmitter<boolean> = new EventEmitter();

  public statusOptions: string[] = ['pending', 'interview', 'declined']

  public showError: boolean = false

  formJobs: FormGroup = this.fb.group({
    company: ['', Validators.required],
    position: ['', [Validators.required, Validators.minLength(4)]],
    status: ['declined', Validators.required]
  })

  constructor(private jobService: JobService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isDisplayed.emit(true);
    if (this.isEdit) {
      this.editSetup();
    }
  }

  editSetup() {
    this.formJobs.setValue({
      company: this.selectedJob?.company,
      position: this.selectedJob?.position,
      status: this.selectedJob?.status
    })
  }

  createJob() {
    if (this.formJobs.invalid) {
      this.showError = true;
      return
    }

    this.jobService.createJob(this.formJobs.value).subscribe((resp: any) => {
      if (resp.job) this.loadJobs.emit(true)
      this.closeModal();
    }
    )
  }

  updateJob() {
    if (this.formJobs.invalid) {
      this.showError = true;
      return
    }

    this.jobService.updateJob(this.selectedJob!._id, this.formJobs.value)
                   .subscribe((resp: any) => {
                     if (resp.job) {
                       this.loadJobs.emit(true);
                      }
                      this.closeModal()
                   });
  }

  updateCreateJob() {
    if (this.isEdit) {
      this.updateJob()
    } else {
      this.createJob()
    }
  }

  closeModal() {
    this.displayModal = false;
    this.isDisplayed.emit(false);
  }

}
