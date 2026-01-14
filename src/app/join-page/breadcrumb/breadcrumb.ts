import { Component, inject, signal } from '@angular/core';
import { ActivationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  router = inject(Router);
  label = signal<string>('');

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe(() => {
        // Traverse the route tree to find the child route with data
        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }

        const breadcrumb = route.snapshot.data['breadcrumb'];
        if (breadcrumb) {
          this.label.set(breadcrumb);
        } else {
          this.label.set('');
        }
      });
  }
}
