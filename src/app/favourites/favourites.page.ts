import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton
} from '@ionic/angular/standalone';

import { Favourites } from '../services/favourites';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton
  ]
})
export class FavouritesPage implements OnInit {

  favouriteMovies: any[] = [];

  constructor(
    private favouritesService: Favourites,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavourites();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    this.favouriteMovies = this.favouritesService.getFavourites();
  }

  openDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId]);
  }
}