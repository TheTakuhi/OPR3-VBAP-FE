import { Component, OnInit } from '@angular/core';
import {Tag} from './tag';
import {TagService} from './tag.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  public tags: Tag[];
  public editTag: Tag;
  public deleteTag: Tag;

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  public getTags(): void {
    this.tagService.getTags().subscribe(
      (response: Tag[]) => {
        this.tags = response;
        console.log(this.tags);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTag(addForm: NgForm): void {
    document.getElementById('add-tag-form').click();
    this.tagService.addTag(addForm.value).subscribe(
      (response: Tag) => {
        console.log(response);
        this.getTags();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTag(tag: Tag): void {
    this.tagService.updateTag(tag).subscribe(
      (response: Tag) => {
        console.log(response);
        this.getTags();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTag(tagId: number): void {
    this.tagService.deleteTag(tagId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTags();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTags(key: string): void {
    console.log(key);
    const results: Tag[] = [];
    for (const tag of this.tags) {
      if (tag.text.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(tag);
      }
    }
    this.tags = results;
    if (results.length === 0 || !key) {
      this.getTags();
    }
  }

  public onOpenModal(tag: Tag, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTagModal');
    }
    if (mode === 'edit') {
      this.editTag = tag;
      button.setAttribute('data-target', '#updateTagModal');
    }
    if (mode === 'delete') {
      this.deleteTag = tag;
      button.setAttribute('data-target', '#deleteTagModal');
    }
    container.appendChild(button);
    button.click();
  }
}

