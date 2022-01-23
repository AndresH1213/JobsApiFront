import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../interfaces/jobs.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('jc-token') || ''
  }

  get getHeaders() {
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }

  getAllJobs() {
    const url = `${this.baseUrl}/jobs`;
    console.log(this.getHeaders)
    return this.http.get(url, this.getHeaders);
  }

  getOneJob(id: string) {
    const url = `${this.baseUrl}/jobs/${id}`;
    return this.http.get(url, this.getHeaders);
  }

  createJob(body: Job) {
    const url = `${this.baseUrl}/jobs`;
    return this.http.post(url, body, this.getHeaders);
  }

  updateJob(id: string,body: any) {
    const url = `${this.baseUrl}/jobs/${id}`;
    return this.http.patch(url, body, this.getHeaders);
  }

  deleteJob(id: string) {
    const url = `${this.baseUrl}/jobs/${id}`;
    return this.http.delete(url);
  }

}
