import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];

  constructor(private http: HttpClient, private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getUserVideos().subscribe(
      (data) => {
        this.videos = data;
      },
      (error) => {
        console.error('Failed to load videos:', error);
      }
    );
  }

  getVideoUrl(videoId: string): string {
    return this.videoService.streamVideo(videoId);
  }

  // ngOnInit(): void {
  //   this.http.get('/api/videos').subscribe((data: any) => {
  //     this.videos = data;
  //   });
  // }
}
