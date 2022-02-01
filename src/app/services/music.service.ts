import { Injectable } from '@angular/core';
import * as dataArtists from "./artists.json";
import * as dataCountries from "./countries.json";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  header = {'Access-Control-Request-Headers': '*', 'Authorization': 'Bearer BQCWkFr7BfDzDPzmCFDl1lpb2Y-3zeROtFS2Hf_y3MQB5-fVEXXYYq7oZ5Co_n7OLG7PkaxGbKpHFIvO9_0N1cBqnMBe7tTvTt8XoGbd3kqePLsq4aGp7JIwqyH4j2ZGnT0c636pwd_SrfLbAPXzZXgGMxHpQcXqs3Y'};
  mainUrl = 'https://api.spotify.com/v1';

  constructor() { }
//consumir api de spotify
  getArtists(){
    return fetch(this.mainUrl + '/artists?ids=2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6', {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  }
//consumir api libre de internet de ejemplo
  getExample(){
    return fetch('https://jsonplaceholder.typicode.com/albums').then((res) => res.json());
  }
//consumir api de spotify
  getRecomendations(){
    return fetch(this.mainUrl + '/recommendations?limit=10&market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical,country&seed_tracks=0c6xIDDpzE81m2q797ordA', {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  }
//Consumir api de servidor local
  getCompanies(){
    return fetch('http://192.168.100.21:3000/companies',
    {mode: 'cors',
    headers: this.header}
    ).then((companies) => companies.json());
  }

  getAlbums(){
    return fetch(this.mainUrl + '/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc&market=ES', {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  }

  getTracks(){
    return fetch(this.mainUrl + '/tracks?ids=7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B&market=ES', {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  };

  getArtistsTopTracks(artist_id){
    return fetch(this.mainUrl + '/artists/'+ artist_id +'/top-tracks?id=0TnOYISbd1XYRBk9myaseg&market=ES', {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  }

  getLocalApi(){
    return dataArtists;
  }

  getCountries(){
    return dataCountries;
  }

  getAlbumsTracks(album_id){
    return fetch(this.mainUrl + `/albums/${album_id}/tracks?market=ES&limit=10&offset=5&id=4aawyAB9vmqN3uQ7FjRGTy`, {
      mode: 'cors',
      headers: this.header
    }).then((response) => response.json());
  }
  
}
