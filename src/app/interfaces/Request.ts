import { HttpHeaders } from '@angular/common/http';

export interface MakeRequestOptions<T = unknown> {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Params;
  data?: T;
  headers?: HttpHeaders;
}

export interface Params {
  [k: string]: string;
}
