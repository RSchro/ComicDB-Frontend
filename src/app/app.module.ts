import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ComicCategoryMenuComponent } from './components/comic-category-menu/comic-category-menu.component';
import { ComicService } from './services/comic.service';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicDetailsComponent } from './components/comic-details/comic-details.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComicComponent } from './components/add-new-comic/add-comic.component';
import { UpdateComicComponent } from './components/update-comic/update-comic.component';

const routes: Routes =[
  {path: 'comics/:id', component: ComicDetailsComponent},
  {path: 'addComic', component: AddNewComicComponent},
  {path: 'search/:keyword', component: ComicListComponent},
  {path: 'publisher/:id/:name', component: ComicListComponent},
  {path: 'publisher/', component: ComicListComponent},
  {path: 'comics', component: ComicListComponent},
  {path: '', redirectTo: '/comics', pathMatch: 'full'},
  {path: '**', redirectTo: '/comics', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ComicListComponent,
    ComicCategoryMenuComponent,
    SearchComponent,
    ComicDetailsComponent,
    AddNewComicComponent,
    UpdateComicComponent
  ],

  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],

  providers: [ComicService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
