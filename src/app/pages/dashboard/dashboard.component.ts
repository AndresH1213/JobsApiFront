import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/jobs.interface';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';
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
  public selectJob: Job | undefined;

  public test: boolean = false;
  constructor(private jobService: JobService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((data:any) => {
      this.jobs = data.jobs;
    })
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/home')
  }

  createJob() {
    this.selectJob = undefined;
    this.isEdit = false;
    this.displayModal= true
  }

  editJob(id: string) {
    // this.jobService.getOneJob(id).subscribe((job:any) => this.selectJob = job)
    this.jobService.getOneJob(id).subscribe(({ job }: any) => {
      this.selectJob = job;
      this.isEdit = true;
      this.displayModal = true;
    })
  }

  deleteJob(id: string, company: string) {
    
    Swal.fire({
      title: `Do you want to delete job on ${company}?`,
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(id).subscribe(resp => {
          Swal.fire('Deleted!', 'Your file has been deleted', 'success');
          this.getAllJobs();
        })
      } 
    }).catch(console.log)
  }

}
