import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  concatAll,
  concatMap,
  expand,
  forkJoin,
  map,
  mergeAll,
  mergeMap,
  reduce,
  switchMap,
  toArray,
} from 'rxjs';
import { Language, Pokemon, Stat, TypePokemon } from '../interfaces/Pokemon';
import { ResponsePokeAPI } from '../interfaces/ResponsePokeAPI';
import { PokemonInit } from '../interfaces/Pokemon.init';
import { ObservableToPromise } from '../shared/Observable.utils';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getAllPokemon(
    limit: number = 151
  ): Observable<ResponsePokeAPI<PokemonInit[]>> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}`;
    return this.genericGet<ResponsePokeAPI<PokemonInit[]>>(url);
  }

  private genericGet<T = unknown>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public async getPokemonByUrl(url: string): Promise<Pokemon> {
    const pokemon = await ObservableToPromise(this.genericGet<Pokemon>(url));
    pokemon.stats = await this.getStats(pokemon);
    pokemon.typePokemon = await this.getTypes(pokemon);
    pokemon.color = await this.getColor(pokemon);
    return pokemon;
  }

  public async getTypes(pokemon: Pokemon): Promise<string[]> {
    let types: string[] = [];
    try {
      const result = await Promise.all(
        pokemon.types.map((type) =>
          ObservableToPromise(
            this.genericGet<{ names: Language[] }>(type.type.url)
          )
        )
      );

      result.forEach((object) => {
        const languageFound = object['names'].find(
          (language) => language.language.name === 'es'
        );
        types.push(languageFound?.name || '');
      });
    } catch (error) {
      console.log('error', error);
    }
    return types;
  }

  public async getStats(pokemon: Pokemon): Promise<Stat[]> {
    let stats: Stat[] = [];

    try {
      const result = await Promise.all(
        pokemon.stats.map(async (stat) => {
          const languages = await ObservableToPromise(
            this.genericGet<{ names: Language[] }>(stat.stat.url)
          );
          const name =
            languages['names'].find(
              (language) => language.language.name === 'es'
            )?.name || '';
          return { ...stat, name };
        })
      );
      stats = result;
    } catch (error) {
      console.log('error', error);
    }

    return stats;
  }

  public async getColor(pokemon: Pokemon): Promise<string> {
    const result = await ObservableToPromise(
      this.genericGet<{ color: TypePokemon }>(pokemon.especies.url)
    );
    return result.color.name;
  }

  // private getObservablePokemons(
  //   pokemonInit: PokemonInit[]
  // ): Observable<Pokemon>[] {
  //   return pokemonInit.map((pokemon) => this.genericGet<Pokemon>(pokemon.url));
  // }

  // return this.genericGet<ResponsePokeAPI<PokemonInit[]>>(url).pipe(
  //     mergeMap((pokemon) => {
  //       let arrayObservables = this.getObservablePokemons(pokemon.results);
  //       return forkJoin(arrayObservables);
  //     })
  //   );
}
