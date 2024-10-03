import { keyframes } from '@angular/animations';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/common/publisher';
import { Comic } from 'src/app/common/comic';
import { ComicService } from 'src/app/services/comic.service';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list-grid.component.html',
  styleUrls: ['./comic-list.component.css']
})
export class ComicListComponent implements OnInit {

  comics: Comic[] = [];

  currentPublisherName: string = "";
  currentPublisherId: number = 1;
  previousPublisherId: number = 1;
  searchMode: boolean = false;

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private comicService: ComicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.listComics();
    })
  }

  listComics() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchComics();
    }
    else {
      this.handleListComics();
    }
  }

  handleSearchComics() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now get comics for the given publisher id
    this.comicService.searchComicsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(
                      this.processResult());
  }

  handleListComics() {
    // check if 'id' parameter is available
    const hasPublisherId: boolean = this.route.snapshot.paramMap.has('id');

    // get the 'id' param string -- convert to number
    if(hasPublisherId) {
      // get the 'id' param string
        this.currentPublisherId = +this.route.snapshot.paramMap.get('id')!;

      // get the 'name' param string
      this.currentPublisherName = this.route.snapshot.paramMap.get('name')!;
    }
    // no publisher id available -- default value of 1
    else {
      this.currentPublisherId = 1;
      this.currentPublisherName = 'Marvel';
    }

    // check if a different publisher than previous
    //--------------------------------------------//
    // if different page number: reset thePageNumber back to 1
    if(this.previousPublisherId != this.currentPublisherId) {
      this.thePageNumber = 1;
    }

    this.previousPublisherId = this.currentPublisherId;

    console.log(`currentPublisherId=${this.currentPublisherId}, thePageNumber=${this.thePageNumber}`);

    //get the comics for the publisher id
    this.comicService.getComicList(this.currentPublisherId).subscribe(
      data => {
        this.comics = data;
      }
    )
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listComics();
  }

  private processResult() {
    return (data: any) => {
      this.comics = data._embedded.comics;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
