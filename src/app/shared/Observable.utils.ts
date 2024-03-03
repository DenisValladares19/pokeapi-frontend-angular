import { Observable } from 'rxjs';

export function ObservableToPromise<T = unknown>(
  observable: Observable<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    observable.subscribe({ next: resolve, error: reject });
  });
}
