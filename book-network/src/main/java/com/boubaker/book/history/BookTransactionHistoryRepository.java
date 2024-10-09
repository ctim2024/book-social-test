package com.boubaker.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory,Integer>{

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.user.id = :userId

            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Integer userId, Pageable pageable);

    @Query("""
        SELECT history
        FROM BookTransactionHistory history
        WHERE history.book.owner.id= :userId

        """)
    Page<BookTransactionHistory> findAllReturnedBooks(Integer userId, Pageable pageable);

    @Query("""
        SELECT
        (COUNT (*) > 0) AS isBorrowed
        FROM BookTransactionHistory bookTransactionHistory
        WHERE bookTransactionHistory.userId = :userId
        AND bookTransactionHistory.book.id = :bookId
        AND bookTransactionHistory.returnApproved = false
        """)
    boolean isAlreadyBorrowedByUser(Integer bookId, Integer userId);

    @Query("""
        SELECT
        (COUNT (*) > 0) AS isBorrowed
        FROM BookTransactionHistory bookTransactionHistory
        WHERE bookTransactionHistory.book.id = :bookId
        AND bookTransactionHistory.returnApproved = false
        """)
    boolean isAlreadyBorrowed(@Param("bookId") Integer bookId);
}
