import { Component, OnInit, SimpleChanges } from '@angular/core'
import { FormControl, FormBuilder, FormGroup } from '@angular/forms'

@Component({
    selector: 'app-create-room',
    templateUrl: './create-room.component.html',
    styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    eventDetails: FormGroup

    minDate: Date

    ngOnInit(): void {
        this.minDate = new Date()
        this.eventDetails = this.fb.group({
            eventName: '',
            eventDescription: '',
            eventLocation: '',
            date: ''
        })
    }

    log() {
        console.log(this.eventDetails.value)
    }
}
