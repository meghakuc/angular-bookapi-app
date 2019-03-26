import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'book-detail' },
	{ path: 'book-detail', component: BookDetailComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }