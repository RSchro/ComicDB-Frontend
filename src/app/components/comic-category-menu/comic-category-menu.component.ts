import { Component, OnInit } from '@angular/core';
import { Publisher } from 'src/app/common/publisher';
import { ComicService } from 'src/app/services/comic.service';

@Component({
  selector: 'app-comic-category-menu',
  templateUrl: './comic-category-menu.component.html',
  styleUrls: ['./comic-category-menu.component.css']
})
export class ComicCategoryMenuComponent implements OnInit {

  publishers: Publisher[] = [];

  constructor(private comicService: ComicService) { }

  ngOnInit(): void {
    this.listComicPublishers();
  }

  listComicPublishers() {

    this.comicService.getComicPublishers().subscribe(
      data => {
        console.log('Comic Publishers=' + JSON.stringify(data));
        this.publishers = data;
      }
    )
  }

}
