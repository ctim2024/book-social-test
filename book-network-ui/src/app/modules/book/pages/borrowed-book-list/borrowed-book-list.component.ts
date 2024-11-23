import { Component, OnInit } from '@angular/core';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbacksService } from '../../../../services/services';

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{
  page: number = 0;
  size: number | undefined;
  pages: any = [];
  borrowedBooks: PageResponseBorrowedBookResponse = {};

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbacksService
  ) {
  }
  ngOnInit(): void {
   this.findAllBorrowedBooks();
  }
  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedBooks = resp;
        this.pages = Array(this.borrowedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

returnBorrowedBook(_t17: BorrowedBookResponse) {

  }
  gotToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number - 1;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  get isLastPage() {
    return this.page === this.borrowedBooks.totalPages as number - 1;
  }

}
