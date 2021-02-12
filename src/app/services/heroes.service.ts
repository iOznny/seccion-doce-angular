import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from "rxjs/operators";

import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private url: string = 'https://crud-heroes-angular-3080c-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { 
  }

  // Crear
  createHeroe(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  // Actualizar
  uploadHeroe(heroe: HeroeModel) {
   
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;
    
    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  // Obtener Heroe.
  getHeroe(id: string) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  // Obtener Heroes
  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.createArrayHeroes ),
      delay(1000)
    );
  }

  private createArrayHeroes(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    if(heroesObj === null) {
      return [];
    }

    /**
     * Iteramos el objeto de heroes para obtener
     * el id de Firebase y asignarlo al nuevo array de heroes.
     */ 
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

  // Eliminar heroe.
  deleteHeroe(id: string) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

}
