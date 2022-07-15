import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'
import { StepsModule } from 'primeng/steps';

@NgModule({
    exports: [ButtonModule, ImageModule, DividerModule, InputTextModule, StepsModule]
})
export class PrimeNgModule {}
