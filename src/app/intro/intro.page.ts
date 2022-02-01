import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpt = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      title: "La música está en tus manos",
      description: "Encuentra tú música favorita en cualquier momento sin interrupciones",
      icon: "musical-notes-outline",
      image: "assets/images/escuchando.png",
      alt: "imagen de logo"
    },
    {
      title: "Organiza tús canciones",
      description: "Organiza tú playlist personalizada y disfruta de muchas horas de música",
      icon: "play-outline",
      image: "assets/images/organizarse.png",
      alt: "imagen de musica"
    },
    {
      title: "Lo buscas, lo encuentras",
      description: "Nuestro motor de busqueda encuentra tus canciones rápidamente",
      icon: "pause-outline",
      image: "assets/images/busqueda.png",
      alt: "busqueda de imagen"
    },
    //Cuarto Slide realizado
    {
      title: "Comparte en tus redes sociales",
      description: "Puedes compartir a tus conocidos tus gustos musicales",
      icon: "pause-outline",
      image: "assets/images/redes-sociales.png",
      alt: "redessociales"
    }
  ]
  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
  }

  finish() {
    this.storage.set("intro", true);
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
  }

}
