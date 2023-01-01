import { Component } from '@angular/core';
import { Search } from 'src/app/search.model';
import { SearchEvent, SearchPageInfo } from './search-results';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Search';
  model = new Search();
  submitted = false;
  pageInfo: SearchPageInfo = {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };
  events: SearchEvent[] = [];

  constructor(private service: SearchService) {}

  onSubmit() {
    this.submitted = true;
    const options = {
      ...this.model,
      page: 0,
    }
    this.service.getEvents(options).subscribe((data) => {
      this.events = data.events || [];
      console.log(data.page);
      this.pageInfo = data.page;
    });
  }

  hasMorePages() {
    return this.pageInfo.number + 1 < this.pageInfo.totalPages;
  }

  loadMore() {
    const options = {
      ...this.model,
      page: this.pageInfo.number + 1,
    }
    this.service.getEvents(options).subscribe((data) => {
      this.events = [...this.events, ...data.events];
      console.log(data.page);
      this.pageInfo = data.page;
    });

  }
}

