import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.scss'
})
export class ReturnBookComponent implements OnInit{


  page: number = 0;
  size: number | undefined;
  pages: any = [];
  returnedBooks: PageResponseBorrowedBookResponse = {};
  message: string = '';
  level: string = '';

  constructor(
    private bookService: BookService,

  ) {
  }
  ngOnInit(): void {
   this.findAllReturnedBooks();
  }
  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
        this.pages = Array(this.returnedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  approveReturn(book:BorrowedBookResponse) {

    if(!book.returned){
      this.message = 'Book is not returned';
      this.level = 'error';
      return
    }
    this.bookService.approveReturnBorrowBook({
      'book-id':book.id as number
    }).subscribe({
      next:()=>{
        this.message = 'Book return approved';
        this.level = 'success';
        this.findAllReturnedBooks();
      }
    })
    }
  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }
  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  get isLastPage() {
    return this.page === this.returnedBooks.totalPages as number - 1;
  }
}
