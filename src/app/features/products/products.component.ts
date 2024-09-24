import { Component, inject } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;
}
