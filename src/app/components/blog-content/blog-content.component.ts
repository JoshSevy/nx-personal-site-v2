import { Component, Input } from '@angular/core';
import { BlogContentModel, initBlogContent } from "../../content/content.model";

@Component({
  selector: 'app-blog-content',
  standalone: true,
  imports: [],
  templateUrl: './blog-content.component.html',
  styleUrl: './blog-content.component.scss'
})
export class BlogContentComponent {
 @Input() blogContent: Partial<BlogContentModel> = initBlogContent;
}
