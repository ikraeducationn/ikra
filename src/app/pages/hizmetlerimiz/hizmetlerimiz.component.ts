import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hizmetlerimiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hizmetlerimiz.component.html',
  styleUrls: ['../page-intro.css', './hizmetlerimiz.component.css']
})
export class HizmetlerimizComponent {}