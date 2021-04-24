import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private readonly TELEGRAM_DESTINATIONS: { token: string, chat_id: string }[];

  constructor(
    private http: HttpClient
  ) {
    this.TELEGRAM_DESTINATIONS = environment.telegram;
  }

  send(message: string) {
    message = `DIBOT - TRADER PANEL\n` + message;
    this.TELEGRAM_DESTINATIONS.forEach((destination) => {
      const params = {
        chat_id: destination.chat_id,
        text: message
      };
      const url = `https://api.telegram.org/bot${destination.token}/sendMessage`;
      this.http.get(url, { params }).subscribe();
    })
  }
}
