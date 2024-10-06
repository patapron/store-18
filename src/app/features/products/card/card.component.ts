import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';
import { EllipsisPipe } from '@shared/pipes/ellipsis.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, EllipsisPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input.required<Product>();
  addToCartEvent = output<Product>();

  onAddToCard(event: Event): void {
    event.stopPropagation();
    this.addToCartEvent.emit(this.product());
  }
}
