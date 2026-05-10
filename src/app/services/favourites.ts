import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Favourites {

  private storageKey = 'favouriteMovies';

  getFavourites(): any[] {
    const movies = localStorage.getItem(this.storageKey);
    return movies ? JSON.parse(movies) : [];
  }

  addFavourite(movie: any) {
    const favourites = this.getFavourites();

    const exists = favourites.some((item) => item.id === movie.id);

    if (!exists) {
      favourites.push(movie);
      localStorage.setItem(this.storageKey, JSON.stringify(favourites));
    }
  }

  removeFavourite(movieId: number) {
    const favourites = this.getFavourites()
      .filter((item) => item.id !== movieId);

    localStorage.setItem(this.storageKey, JSON.stringify(favourites));
  }

  isFavourite(movieId: number): boolean {
    return this.getFavourites()
      .some((item) => item.id === movieId);
  }
}