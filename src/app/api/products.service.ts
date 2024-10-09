import { HttpClient } from '@angular/common/http';
import {
  DestroyRef,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { tap, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  // public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);
  private _destroyRef = inject(DestroyRef);

  // constructor() {
  //   this.getProducts();
  // }

  // public getProducts(): void {
  //   this._http
  //     .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
  //     .pipe(
  //       map((products: Product[]) =>
  //         products.map((product: Product) => ({ ...product, qty: 1 }))
  //       ),
  //       tap((data: Product[]) => this.products.set(data))
  //     )
  //     .subscribe();
  // }

  public getProducts() {
    return this._http
      .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((products: Product[]) =>
          products.map((product: Product) => ({ ...product, qty: 1 }))
        )
      );
  }

  public getProductById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/products/${id}`)
      )
    );
  }
}
