import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSearchbar,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonButton
  ]
})
export class HomePage implements OnInit {

  movies: any[] = [];
  searchText: string = '';
  heading: string = "Today's Trending Movies";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.heading = "Today's Trending Movies";

    this.http
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${environment.apiKey}`)
      .subscribe((response: any) => {
        this.movies = response.results;
      });
  }

  searchMovies() {
    if (this.searchText.trim() === '') {
      this.loadMovies();
      return;
    }

    this.heading = `${this.searchText} Movies`;

    this.http
      .get(`https://api.themoviedb.org/3/search/movie?query=${this.searchText}&api_key=${environment.apiKey}`)
      .subscribe((response: any) => {
        this.movies = response.results;
      });
  }

  openDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId]);
  }
}