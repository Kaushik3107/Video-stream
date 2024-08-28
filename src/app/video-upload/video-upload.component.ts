import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent {
  title: string = '';
  description: string = '';
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('video', this.selectedFile, this.selectedFile.name);

      this.http
        .post('https://your-api-url.com/api/videos', formData)
        .subscribe({
          next: (response) => {
            console.log('Video uploaded successfully:', response);
            this.router.navigate(['/videos']); // Redirect to video listing or another component
          },
          error: (err) => {
            console.error('Video upload failed:', err);
          },
        });
    }
  }
  // videoUploadForm: FormGroup;
  // selectedFile: File | null = null;

  // constructor(
  //   private fb: FormBuilder,
  //   private http: HttpClient,
  //   private router: Router
  // ) {
  //   this.videoUploadForm = this.fb.group({
  //     title: ['', Validators.required],
  //     description: ['', Validators.required],
  //     video: [null, Validators.required],
  //   });
  // }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onUpload() {
  //   if (this.videoUploadForm.invalid || !this.selectedFile) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('title', this.videoUploadForm.get('title')?.value);
  //   formData.append(
  //     'description',
  //     this.videoUploadForm.get('description')?.value
  //   );
  //   formData.append('video', this.selectedFile);

  //   this.http.post('/api/videos', formData).subscribe(
  //     (response) => {
  //       console.log('Video uploaded successfully', response);
  //       this.router.navigate(['/videos']);
  //     },
  //     (error) => {
  //       console.error('Error uploading video', error);
  //     }
  //   );
  // }
}
