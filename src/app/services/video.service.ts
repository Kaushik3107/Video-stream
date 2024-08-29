import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:5000/api/videos'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Upload a video
  uploadVideo(videoData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, videoData);
  }

  // Fetch all videos for the current user
  getUserVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Stream a video
  streamVideo(videoId: string): string {
    return `${this.apiUrl}/stream/${videoId}`;
  }
}
