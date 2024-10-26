import { Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {

errorMsg: Array<string> = [];
selectedPicture: string | undefined;
selectedBookCover: any;
bookRequest: BookRequest = {
  authorName: '',
  isbn: '',
  synopsis: '',
  title: ''
};

onFileSelected(event: any) {
  this.selectedBookCover = event.target.files[0];
  console.log(this.selectedBookCover);

  if (this.selectedBookCover) {

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPicture = reader.result as string;
    };
    reader.readAsDataURL(this.selectedBookCover);
  }
  }

}
