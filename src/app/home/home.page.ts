import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class HomePage implements OnInit {

  movies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.http
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${environment.apiKey}`)
      .subscribe((response: any) => {
        this.movies = response.results;
      });
  }
}