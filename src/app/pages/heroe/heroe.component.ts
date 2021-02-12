import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})

export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroeSv: HeroesService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    // Obtenemos el id que se esta enviando a la ruta.
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'new') {
      this.heroeSv.getHeroe(id).subscribe( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }


    console.log(id);
    
  }

  // Guardar héroe al servidor backend.
  save(form: NgForm) {

    if(form.invalid) {
      console.log('Form invalid');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let request: Observable<any>;

    if(this.heroe.id) {
      request = this.heroeSv.uploadHeroe(this.heroe);

      request.subscribe( resp => {
        Swal.fire({
          title: this.heroe.name,
          text: 'Se actualizo correctamente.',
          icon: 'success'
        });
      });
    } else {
      request = this.heroeSv.createHeroe(this.heroe);

      request.subscribe( resp => {
        Swal.fire({
          title: this.heroe.name,
          text: 'Se creo correctamente.',
          icon: 'success'
        });
      });
    }
  }

}
