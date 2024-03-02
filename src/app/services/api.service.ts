import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MakeRequestOptions, Params } from '../interfaces/Request';
import { ResponsePokeAPI } from '../interfaces/ResponsePokeAPI';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  fetch<T = unknown, D = unknown>(options: MakeRequestOptions<D>) {
    const params = this.generateQueryParams(options?.params);
    const headers = this.generateHeaders(options.headers);
    const method = String(options.method || 'GET').toLocaleLowerCase();
    const finalUrl = `${this.baseUrl}${options.endpoint}${params}`;

    return this.http.request<ResponsePokeAPI<T>>(method, finalUrl, {
      headers,
      body: options.data,
    });
  }

  private generateQueryParams(params?: Params): string {
    if (!params) return '';
    if (Object.keys(params).length === 0) return '';

    const result = new URLSearchParams(params);

    return result ? '?' + result : '';
  }

  private generateHeaders(headers?: HttpHeaders): HttpHeaders {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    if (headers) {
      headers.keys().forEach((key) => {
        header.append(key, headers.get(key) || '');
      });
    }

    return header;
  }
}
