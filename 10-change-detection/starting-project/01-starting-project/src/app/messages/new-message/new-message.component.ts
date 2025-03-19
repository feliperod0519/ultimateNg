import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.services';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
})
export class NewMessageComponent {
  add = output<string>();
  private messageService = inject(MessagesService)
  enteredText = signal('');

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.add.emit(this.enteredText());
    this.messageService.addMessage(this.enteredText());
    this.enteredText.set('');
  }
}
