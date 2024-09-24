import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnInit,
  output,
  Signal,
} from '@angular/core';
import { ProductsService } from '@api/products.service';
import { RatingStarsComponent } from '@shared/components/rating-stars/rating-stars.component';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, RatingStarsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);
  productId = input<number>(0, { alias: 'id' });
  product!: Signal<Product | undefined>;
  private readonly productSvc = inject(ProductsService);

  addToCartEvent = output<Product>();

  ngOnInit(): void {
    this.product = this.productSvc.getProductById(this.productId());
  }
  onAddToCard(): void {
    // this.addToCartEvent.emit(this.product);
  }

  generateSvg(index: number): any {
    let svgContent = null;
    const rate = this.product()?.rating.rate as number;
    if (index + 1 >= Math.floor(rate)) {
      svgContent = '1';
    } else if (index + 1 < Math.floor(rate)) {
      svgContent = '2';
    } else {
      svgContent = '3';
    }
    return svgContent;
  }
}
