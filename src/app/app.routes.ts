import { Routes } from '@angular/router';
import { pageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '404',
    component: pageNotFoundComponent
  },
  {
    path: '**',
    component: pageNotFoundComponent
  }
];
