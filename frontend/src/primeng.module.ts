import { NgModule } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { ChipModule } from 'primeng/chip'
import { DialogModule } from 'primeng/dialog'
import { MultiSelectModule } from 'primeng/multiselect'
import { ToastModule } from 'primeng/toast'

@NgModule({
    exports: [
        ButtonModule,
        ImageModule,
        DividerModule,
        InputTextModule,
        CalendarModule,
        ChipModule,
        DialogModule,
        MultiSelectModule,
        ToastModule
    ]
})
export class PrimeNgModule {}
