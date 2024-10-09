import { ProductsService } from '@api/products.service';
import { Product } from './../models/product.interface';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { pipe, switchMap, tap } from 'rxjs';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products())),
    productList: computed(() => products),
  })),
  withMethods(
    (
      { products, ...store },
      toastSvc = inject(ToastrService),
      productSvc = inject(ProductsService)
    ) => ({
      loadProducts: rxMethod<void>(
        pipe(
          switchMap(() => {
            return productSvc.getProducts().pipe(
              tap((products) => {
                patchState(store, { products });
              })
            );
          })
        )
      ),
      addToCart(product: Product) {
        const isProductInCart = products().find(
          (item: Product) => item.id === product.id
        );
        if (isProductInCart) {
          isProductInCart.qty++;
          isProductInCart.subTotal =
            isProductInCart.qty * isProductInCart.price;
          patchState(store, { products: [...products()] });
        } else {
          patchState(store, { products: [...products(), product] });
        }
        toastSvc.success('Product added', 'Store-18');
      },
      removeFromCart(id: number) {
        const updatedProducts = products().filter(
          (product) => product.id !== id
        );
        patchState(store, { products: updatedProducts });
        toastSvc.info('Product removed', 'Store-18');
      },
      clearCart() {
        patchState(store, initialState);
        toastSvc.info('Cart cleared', 'Store-18');
      },
    })
  )
);

function calculateTotalAmount(products: Product[]): number {
  return products.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );
}
function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0);
}
