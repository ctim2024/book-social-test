import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageResponseBookResponse, BookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {


  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;
  private _isLastPage: boolean = false;

  pages: any = [];
  message: string = '';
  level: string = 'success';
  constructor(
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
    this.bookService.findAllBooksByOwner({
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
    return this._isLastPage = this.bookResponse.totalPages as number - 1 == this.page;
  }

  editBook(book: BookResponse) {

    this.router.navigate(['books','manage',book.id])
  }
  shareBook(book: BookResponse) {

  }
  archiveBook(book: BookResponse) {

  }

}
