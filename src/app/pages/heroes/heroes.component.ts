import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';

import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading = false;

  constructor(private heroeSv: HeroesService) { 
  }

  ngOnInit(): void {
    // Propiedad para lanzar el cargando de el html.
    this.loading = true;
    
    this.heroeSv.getHeroes().subscribe( resp => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  // Eliminar heroe.
  deleteHeroe(heroe: HeroeModel, i: number) {
    // Animación de eliminación.
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Seguro que desea eliminar a ${ heroe.name }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if(resp.value) {
        // Con esto borramos del arreglo de heroes mediante la pocision (i) eliminando un elemento.
        this.heroes.splice(i, 1);

        // Elimina el heroe.
        this.heroeSv.deleteHeroe(heroe.id).subscribe();
      }
    });
  }

}
