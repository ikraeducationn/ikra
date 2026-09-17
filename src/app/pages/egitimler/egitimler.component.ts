import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-egitimler',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './egitimler.component.html',
  styleUrls: ['../page-intro.css', './egitimler.component.css']
})
export class EgitimlerComponent {}
