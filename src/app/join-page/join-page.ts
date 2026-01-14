import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Breadcrumb } from "./breadcrumb/breadcrumb";

@Component({
  selector: 'app-join-page',
  imports: [RouterOutlet, Breadcrumb],
  templateUrl: './join-page.html',
  styleUrl: './join-page.css',
})
export class JoinPage {

}
