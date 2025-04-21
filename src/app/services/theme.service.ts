import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false)
  isDarkTheme = this.isDarkThemeSubject.asObservable()

  constructor() { }

  toggleTheme() {
    const currentValue = this.isDarkThemeSubject.value;
    this.isDarkThemeSubject.next(!currentValue);
    document.body.classList.toggle('dark-theme', !currentValue);
  }
}
