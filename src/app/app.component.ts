import { Component, inject } from '@angular/core';
import { ClosingNavigationComponent } from './shared/closing-navigation.component';
import { NavigationTopService } from './shared/navigation-top.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ClosingNavigationComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly navigationTop = inject(NavigationTopService);
  title = 'online-education';
}
