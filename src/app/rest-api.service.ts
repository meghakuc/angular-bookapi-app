import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class RestApiService {
  
    // Define API
    apiURL = 'https://www.booknomads.com/api/v0/isbn/';

    constructor(private http: HttpClient) { }

    /*========================================
    Method for consuming RESTful API
    =======================================*/

    // HttpClient API get() method => Fetch book details
	getBookData(ISBN): Observable<Book> {
		return this.http.get<Book>(this.apiURL + ISBN)
		.pipe(
			retry(1),
			catchError(this.handleError)
		)
	}  

	// Error handling 
	handleError(error,ISBN) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} 
		else if(error.status == 500) {
			// Get server-side error
			errorMessage = 'isbn ' + ISBN + ' not found';
		}
		else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		window.alert(errorMessage);
		return throwError(errorMessage);
	}
}