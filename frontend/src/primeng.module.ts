import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { ChipModule } from 'primeng/chip'

@NgModule({
    exports: [
        ButtonModule,
        ImageModule,
        DividerModule,
        InputTextModule,
        CalendarModule,
        ChipModule
    ]
})
export class PrimeNgModule {}
