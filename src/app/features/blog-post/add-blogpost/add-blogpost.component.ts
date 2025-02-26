import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post-model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {

  model: AddBlogPost;

  constructor(private blogPostService: BlogPostService,
    private router: Router
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(): void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          console.error('Validation Errors:', error.error.errors);
        }
      }
    });
  }
}
