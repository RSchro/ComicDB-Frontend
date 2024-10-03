import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comic } from 'src/app/common/comic';
import { Publisher } from 'src/app/common/publisher';
import { ComicService } from 'src/app/services/comic.service';
import { PublisherService } from 'src/app/services/publisher-service.service';
import { NewComicValidators } from 'src/app/validators/new-comic-validators';

@Component({
  selector: 'app-add-new-comic',
  templateUrl: './add-comic.component.html',
  styleUrls: ['./add-comic.component.css']
})
export class AddNewComicComponent implements OnInit {

  comicUrl = 'http://localhost:8080/api/comics'
  publisherUrl = 'http://localhost:8080/api/publisher'

  publishers: Publisher[] =[];


  // return these to backend
  title: String ='';
  publisherChoice: Publisher = new Publisher(0, "");
  upc: String = '';
  issue: String = '';
  printingNum: String = '';
  dateCreated: String = '';

  constructor(private http: HttpClient, private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {

    this.listComicPublishers();

  }

  listComicPublishers() {

    this.comicService.getComicPublishers().subscribe(
      data => {
        this.publishers = data;
      }
    )
  }



  onSubmit(){
    let comic = {
      title: this.title,
      upc: this.upc,
      isse: this.issue,
      printingNum: this.printingNum,
      dateCreated: this.dateCreated,
      publisherChoice: this.publisherUrl + "/" + this.publisherChoice
    }

    //post to Comic
    this.http.post(this.comicUrl, comic).subscribe();

    /* this.router.navigate(["/comics"], ).then(() => {
      window.location.reload();
    }) */
    console.log(JSON.stringify(comic.publisherChoice));
    console.log("Adding new comic!");
  }

}