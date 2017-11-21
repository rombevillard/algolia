import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlgoliaService } from './algolia.service';

@Component({
  selector: 'app-results',
  template: `
    <div class="app-results-container">
      <div class="results-nbHits">
        <strong>{{ results.nbHits }} results found</strong> in {{ results.processingTimeMS * 0.001 }} seconds
      </div>
      <ul>
        <li *ngFor="let hit of results.hits" [innerHTML]="hit._highlightResult.name.value"></li>
      </ul>
    </div>
  `
})
export class ResultsComponent {
  subs = new Array<Subscription>();
  results = [];

  constructor(public algolia: AlgoliaService) {
    algolia.emitter.subscribe(
      (results) => { this.results = results; },
      (error) => { console.error(error); }
    );
  }
}
