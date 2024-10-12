package com.boubaker.book.history;

import org.springframework.stereotype.Service;

import com.boubaker.book.book.Book;
import com.boubaker.book.book.BookRequest;

@Service
public class BookTransactionMapper {

    public Book toBook(BookRequest request) {
        return Book.builder()
                .id(request.id())
                .title(request.title())
                .isbn(request.isbn())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }

      public BorrowedBookResponse toBorrowedBookResponse(BookTransactionHistory bookTransaction) {
        return BorrowedBookResponse.builder()
                .id(bookTransaction.getId())
                .title(bookTransaction.getBook().getTitle())
                .authorName(bookTransaction.getBook().getAuthorName())
                .isbn(bookTransaction.getBook().getIsbn())
                .rate(bookTransaction.getBook().getRate())
                .returned(bookTransaction.isReturned())
                .returnApproved(bookTransaction.isReturnApproved())
                .build();
    }

}
