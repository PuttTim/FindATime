import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { CardModule } from 'primeng/card'
import { MenubarModule } from 'primeng/menubar'

@NgModule({
    exports: [ButtonModule, ImageModule, CardModule, MenubarModule]
})
export class PrimeNgModule {}
