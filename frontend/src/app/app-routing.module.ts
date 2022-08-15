import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { SignInComponent } from './pages/sign-in/sign-in.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { CreateRoomComponent } from './pages/create-room/create-room.component'
import { RoomComponent } from './pages/room/room.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { AuthGuard } from './auth.guard'

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in', component: SignInComponent },
    {
        path: 'create-room',
        component: CreateRoomComponent,
        canActivate: [AuthGuard]
    },
    { path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
