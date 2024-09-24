import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss',
})
export class RatingStarsComponent {
  starsArray: number[] = new Array(5).fill(0);
  rate = input<number | undefined>(undefined ?? 0);
  mathFloorRate = computed(() => Math.floor(this.rate() || 0));
}
