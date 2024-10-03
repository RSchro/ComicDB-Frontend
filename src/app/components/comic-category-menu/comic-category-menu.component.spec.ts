import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicCategoryMenuComponent } from './comic-category-menu.component';

describe('ComicCategoryMenuComponent', () => {
  let component: ComicCategoryMenuComponent;
  let fixture: ComponentFixture<ComicCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
