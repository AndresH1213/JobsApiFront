import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/jobs.interface';
import { JobService } from 'src/app/services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobs: Job[] = []

  public isEdit: boolean = false;
  public displayModal: boolean = false;
  public selectJob: string = '';

  constructor(private jobService: JobService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((data:any) => {
      this.jobs = data.jobs;
      console.log(data)
    })
  }

  logout() {
    this.authService.logOut();
  }

  createJob() {

  }

  editJob(id: string) {
    this.selectJob = id;
    this.displayModal = true;
    this.isEdit = true;
  }

  deleteJob(id: string) {
    console.log(id)
  }

}
