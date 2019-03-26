import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from "../rest-api.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

	@Input() ISBN = this.actRoute.snapshot.params['ISBN'];
	Book: any = [];

	constructor(
		public restApi: RestApiService, 
		public actRoute: ActivatedRoute,
		public router: Router
	) { }

	ngOnInit() {}

	// Get Book Data
	loadBookData() {
		return this.restApi.getBookData(this.ISBN).subscribe((data: {}) => {
			this.Book = Array.of(data);
		})
	}

	getBookData() {
		if((this.ISBN)!=null) {
			this.restApi.getBookData(this.ISBN).subscribe(data => {
				this.loadBookData()
			})
		}
	}
}
