import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [AuthGuard] },
  { path: 'addbook', component: AddBookComponent, canActivate: [AuthGuard] },
  {
    path: 'addbook/:id',
    component: AddBookComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
