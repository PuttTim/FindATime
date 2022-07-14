import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
    exports: [ButtonModule, ImageModule, DividerModule, InputTextModule]
})
export class PrimeNgModule {}
