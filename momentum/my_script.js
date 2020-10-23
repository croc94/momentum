'use strict'

class Time_class {

    constructor () {
        this.time = document.getElementById ('time');
        this.greeting = document.getElementById ('greeting');
        this.name = document.getElementById ('name');
        this.focus = document.getElementById ('focus');

        this.greeting_morning = 'Good morning';
        this.greeting_day = 'Good day';
        this.greeting_evening = 'Good evening';
        this.greeting_night = 'Good night';


        this.name.addEventListener ('keypress', this.set_name);
        this.name.addEventListener ('blur', this.set_name);
        this.name.addEventListener ('focus', this.save_changes);


        this.focus.addEventListener ('keypress', this.set_focus);
        this.focus.addEventListener ('blur', this.set_focus);
        this.focus.addEventListener ('focus', this.save_changes);

    }

    show_time () {

        let today_time = new Date (),
        hours = today_time.getHours (),
        min = today_time.getMinutes (),
        sec = today_time.getSeconds ();


        let options = {weekday: 'long', day: 'numeric', month: 'long',},
        week_day_date_moth = today_time.toLocaleString ("en-US", options);
        

        //AM/PM
        //let day_time = hours >= 12 ? 'PM' : 'AM';

        //hours = hours % 12 || 12;

        //this.time.innerHTML = `${this.add_zero_to_time (hours)} : ${this.add_zero_to_time (min)} : ${this.add_zero_to_time (sec)} ${day_time} ${week_day_date_moth}`;

        this.time.innerHTML = `${this.add_zero_to_time (hours)} : ${this.add_zero_to_time (min)} : ${this.add_zero_to_time (sec)} ${week_day_date_moth}`;

        setTimeout (() => this.show_time (), 1000);
    }

    add_zero_to_time (time_digit) {
       return ((time_digit < 10 ? '0' : '') + time_digit);
    }

    background_and_greeting () {

        let date = new Date (),
        hours = date.getHours (),
        img_num,
        sec_for_switch =3600000 - date.getMinutes () * 60 * 1000 + date.getSeconds () * 1000;

        switch (true) {
            case (hours < 5) :
                img_num = this.randomInteger (1, 20);
                document.body.style.backgroundImage = `url("assets/images/night/${img_num}.jpg")`;
                this.greeting.textContent =  this.greeting_night;
                break;
            case (hours > 5 && hours <= 10) :
                img_num = this.randomInteger (1, 20);
                document.body.style.backgroundImage = `url("assets/images/morning/${img_num}.jpg")`;
                this.greeting.textContent =  this.greeting_morning;
                break;
            case (hours > 10 && hours <= 18) :
                img_num = this.randomInteger (1, 20);
                document.body.style.backgroundImage = `url("assets/images/day/${img_num}.jpg")`;
                this.greeting.textContent =  this.greeting_day;
                break;
            case (hours >18 && hours <= 23) :
                img_num = this.randomInteger (1, 20);
                document.body.style.backgroundImage = `url("assets/images/evening/${img_num}.jpg")`;
                this.greeting.textContent =  this.greeting_evening;
                break;
            default :
                console.log ('crazytime');
        }

        setTimeout (() => this.background_and_greeting (), sec_for_switch);
    }

    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        if (rand < 10) {
            rand = '0' + rand;
        }
        return rand;
    }

    get_name () {
        if (localStorage.getItem ('name') === null) {
            this.name.textContent = 'Enter your name';
            localStorage.setItem ('name', 'Enter your name');
        } else {
            this.name.textContent = localStorage.getItem ('name');
            
        }
    }

    get_focus () {
        if (localStorage.getItem ('focus') === null) {
            this.focus.textContent = 'Enter your focus';
            localStorage.setItem ('focus', 'Enter your focus');
        } else {
            this.focus.textContent = localStorage.getItem ('focus');
        }
    }

    set_name (e) {
        if (e.type === 'keypress') {
            if (e.which === 13 || e.keyCode === 13) {
                if ( e.target.textContent === '' || (/^\s+$/.test(e.target.textContent))) {
                    e.target.textContent = localStorage.getItem ('name')
                }
                e.target.blur ();
            }
        } else {
            if ( e.target.textContent === '' || (/^\s+$/.test(e.target.textContent))) {
                e.target.textContent = localStorage.getItem ('name');
            } else {
                localStorage.setItem ('name', e.target.innerText);
            }
        }
    }

    set_focus (e) {
        if (e.type === 'keypress') {
            if (e.which === 13 || e.keyCode === 13) {
                if ( e.target.textContent === '' || (/^\s+$/.test(e.target.textContent))) {
                    e.target.textContent = localStorage.getItem ('focus')
                }
                e.target.blur ();
            }
        } else {
            if ( e.target.textContent === '' || (/^\s+$/.test(e.target.textContent))) {
                e.target.textContent = localStorage.getItem ('focus');
            } else {
                localStorage.setItem ('focus', e.target.innerText);
            }
        }
    }

    save_changes (e) {
        e.target.innerText = '';
    }
    
}

const time_to_work = new Time_class ();

time_to_work.show_time();
time_to_work.background_and_greeting();
time_to_work.get_name();
time_to_work.get_focus();