export interface ResponsePokeAPI<T = unknown> {
  count: number;
  next: string;
  previous: string | null;
  results: T;
}
