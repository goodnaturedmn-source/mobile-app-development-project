import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

import { environment } from 'src/environments/environment';
import { Favourites } from '../services/favourites';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
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
export class MovieDetailsPage implements OnInit {

  movieId: string | null = '';
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private favouritesService: Favourites
  ) {}

  ngOnInit() {

    this.movieId = this.route.snapshot.paramMap.get('id');

    this.http
      .get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${environment.apiKey}`)
      .subscribe((response) => {
        this.movie = response;
      });
  }

  addToFavourites() {
    this.favouritesService.addFavourite(this.movie);
  }

  removeFromFavourites() {
    this.favouritesService.removeFavourite(this.movie.id);
  }

  isFavourite(): boolean {
    return this.favouritesService.isFavourite(this.movie.id);
  }
}