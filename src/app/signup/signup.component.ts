import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.interface';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit {
    public emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    public phonePattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    public zipPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    public user: User;
    public days: any;
    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];
    public subscriptions = [
        {id: 'weekly', display: 'Weekly newsletter'},
        {id: 'monthly', display: 'Monthly newsletter'},
        {id: 'quarterly', display: 'Quarterly newsletter'},
    ];

    public topics = [
        { value: 'game', display: 'Gaming' },
        { value: 'tech', display: 'Technology' },
        { value: 'life', display: 'Lifestyle' },
    ];

    public selectedDay: any;

    constructor() {

        this.days = [
            { key: 'Monday', value: 1 },
            { key: 'Tuesday', value: 2 },
            { key: 'Wednesaday', value: 3 },
            { key: 'Thursday', value: 4 },
            { key: 'Friday', value: 5 },
            { key: 'Saturday', value: 6 },
            { key: 'Sunday', value: 7 },

        ];

        this.selectedDay = this.days[5];
    }
    ngOnInit() {
        this.user = {
            name: '',
            day: 'Saturday',
            isActive: true,
            gender: 'M',
            topics: [this.topics[1].value],
            account: {
                email: '',
                confirm: ''
            }
        };
    }
    onSubmit({ value, valid }: { value: User, valid: boolean }) {
        console.log(value, valid);
    }

    onChangeDay(evt: any): void {
        console.log(this.user);
    }
    updateTopics(topic: string, evt: any): void {
        const index = this.user.topics.indexOf(topic);
        if (index >= 0) {
            this.user.topics.splice(index, 1);
        } else {
            this.user.topics.push(topic);
        }
    }

}
