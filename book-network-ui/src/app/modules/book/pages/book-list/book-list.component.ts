import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { PageResponseBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;
  private _isLastPage: boolean = false;

  pages: any = [];

  constructor(
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
        this.pages = Array(this.bookResponse.totalPages)
        .fill(0)
        .map((x, i) => i);

      }
    })
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  goToNextPage() {

    this.page++;
    this.findAllBooks();
  }
  gotToPage(page: number) {

    this.page = page;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }
  goToPreviousPage() {

    this.page--;
    this.findAllBooks();
  }
  get isLastPage(): boolean {
    return this._isLastPage = this.bookResponse.totalPages as number -1 == this.page;
  }

}
