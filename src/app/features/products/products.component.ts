import { Component, inject } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  // products = this.productSvc.products;
  cartStore = inject(CartStore);
  products = this.cartStore.productList();

  ngOnInit(): void {
    this.cartStore.loadProducts();
  }

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
