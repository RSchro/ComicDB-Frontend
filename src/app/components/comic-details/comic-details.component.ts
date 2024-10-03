import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic } from 'src/app/common/comic';
import { ComicService } from 'src/app/services/comic.service';
import { Publisher } from 'src/app/common/publisher';

@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit {

  publisher!: Publisher;
  comic!: Comic;

  constructor(private comicService: ComicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleComicDetails();
    })
  }

  handleComicDetails() {
    // get 'id' param string -- convert to number
    const theComicId: number = +this.route.snapshot.paramMap.get('id')!;

    this.comicService.getComic(theComicId).subscribe(
      data => {
        this.comic = data;
      }
    )
  }
  
  onSubmit(){
  }

}
