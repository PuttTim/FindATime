import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { PrimeNgModule } from 'src/primeng.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { SignInComponent } from './pages/sign-in/sign-in.component'
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SignUpComponent,
        SignInComponent,
        NavbarComponent
    ],
    imports: [BrowserModule, AppRoutingModule, PrimeNgModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
