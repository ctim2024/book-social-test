package com.boubaker.book.feedbeek;

import java.util.Objects;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.boubaker.book.book.Book;
import com.boubaker.book.book.BookRepository;
import com.boubaker.book.exception.OperationNotPermittedException;
import com.boubaker.book.user.User;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedBackService {

    private final FeedBackRepository feedBackRepository;
    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;

     
    public Integer save(FeedbackRequest request, Authentication connectedUser) {
       
        Book book = bookRepository.findById(request.bookId())
                    .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + request.bookId()));

       if (book.isArchived() || !book.isShareable()) {
                throw new OperationNotPermittedException("You cannot give a feedback for and archived or not shareable book");
            }
    
            User user = ((User) connectedUser.getPrincipal());
    
            if (Objects.equals(book.getOwner().getId(), user.getId())) {
                throw new OperationNotPermittedException("You cannot give feedback to your own book");
            }    
            
            
            Feedback feedback = feedbackMapper.toFeedback(request);
            return feedBackRepository.save(feedback).getId();
    }

}
