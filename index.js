const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const days = ["Mond", "Tues", "Wedn", "Thurs", "Frida", "Satur", "Sun"];
const date = new Date();
let month_counter = 0;
let year_counter = 0;
let actualMonth = date.getMonth() + 1;
let actualDay = date.getDate();
let actualYear = date.getFullYear();
let ArrGlobal = 0;
function getDate(mc, yc) {
    //crafting a new month + year
    let show_months = months[date.getMonth() + mc]; //swap number of month to his name
    let s_months = date.getMonth() + mc; // calc numb of month / / mc is getting from another/prev Month func
    let show_years = date.getFullYear() + yc; // calc numb of year / yc is getting from another/prev Month func
    let how_many_days = daysInMonth(s_months, show_years); //push actual values of month and year to get numb of days
    document.getElementById("month_year").innerHTML = show_months + " " + show_years;
    console.log(month_counter);
    let day = days[date.getDay() - 1]; //actual day of month
    let allDays = days[0] + " " + days[1] + " " + days[2] + " " + days[3] + " " + days[4] + " " + days[5] + " " + days[6];
    document.getElementById("days").innerHTML = allDays;
    let firstDay = firstDayMonth(s_months, show_years);
    print_days(how_many_days, firstDay);
    document.getElementById("grid-order").style.display = "none";
}

function anotherMonth() { //making another month with calculate
    month_counter++;
    if (date.getMonth() + month_counter === 12) {
        month_counter = 0 - date.getMonth(); // 0 - actual month / actual month - actual month = 0 = January
        year_counter++;
    }
    getDate(month_counter, year_counter);
}

function prevMonth() { ////making prev month with calculate
    month_counter--;
    if (date.getMonth() + month_counter === -1) {
        month_counter = 11 - date.getMonth() // actual month + 11 - actual month = 11;
        year_counter--;
    }
    getDate(month_counter, year_counter);
}

function daysInMonth(month, year) { // this function calc how many days a month get
    return new Date(year, month + 1, 0).getDate();
}

function firstDayMonth(month, year) {
    return new Date(year, month, 1).getDay();
}

function print_days(num, day) {
    /* This func making all the days as clickable buttons with will make possibly to craft a new event */
    console.log(day); //day is a first day of month
    let day_div = "";
    let day_break = "";
    let months = date.getMonth() + month_counter + 1; // calc numb of month / / mc is getting from another/prev Month func
    let years = date.getFullYear() + year_counter; // calc numb of year / yc is getting from another/prev Month func
    if (day > 1) {

        for (let i = 1; i < day; i++) {
            day_break = day_break + '<div class="day_empty" ></div>';
        }
    }
    if (day === 0) {
        for (let i = 1; i < 7; i++) {
            day_break = day_break + '<div class="day_empty" ></div>';
        }
    }
    let x = 1; // x as another loop counter need to do good break in line
    let z = day; // z is for situation while months start from sunday
    for (let i = 1; i <= num; i++) {
        let element = "day" + i;
        day_div = day_div + '<div class="day" onclick="show_actual(' + i + ', ' + months + ', ' + years + ')" id="' + element + '">' + i + '</div>';
        if (z === 0) {
            day_div = day_div + '<div style="clear:both">';
            z = 10;
            x = 0;
        }
        if (x % 7 === 0 || (x + day) % 8 === 0) {
            day_div = day_div + '<div style="clear:both">';
            day = 0;
            x = 0;
        }
        x++;


    }
    document.getElementById("print").innerHTML = day_break + day_div;
    if (actualMonth === months && actualYear === years) {
        document.getElementById("day" + actualDay).style.background = "#80bfff"; //actualDay background
    }

}

function show_actual(day, month, year) {
    document.getElementById("chosenData").innerHTML = day + " " + months[month - 1] + " " + year;
    let clickedDate = year + "-" + 0 + month + "-" + day;
    printingOrders(clickedDate, day, month, year);
}

function make_event() {
    document.getElementById("newEvent1").style.display = "inline";
    document.getElementById("saveButton").style.display = "inline";
    document.getElementById("grid-order").style.display = "grid";
    document.getElementById("grid-container-main").style.display = "none";
    document.getElementById("saveButton").style.visibility = "visible";

     ["leader", "leader_email", "leader_nr", "place_load", "place_reload", "data_load_day",
     "data_reload_day", "hour_load", "hour_reload", "person_load", "person_load_nr", "person_reload",
    "person_reload_nr", "car_type", "load_weight", "carrier", "price", "orderID" ].forEach(i => {
         document.getElementById(i).value = "";
     })
}

function Back() { //back from new order
    document.getElementById("grid-order").style.display = "none";
    document.getElementById("grid-container-main").style.display = "grid";
}

function getEvents() { //local storage
    let events = window.localStorage.getItem('events') ?? '[]';
    return JSON.parse(events);
}

function getInfo() {
    let ld, ld_em, ld_nr, pl, pr, dld, drd, hl, hr, perl, perl_nr, per_re, per_re_nr, car, lw, carr, pri, oid;
    /* ld- leader, ld_em- leader email, ld_nr - leader number, pl - place load, pr - place reload, dld - date load day,
     drd - date reload day, hl - hours load, hr- hour reload, perl - person load, perl_nr- person load number,
     perl - person reload, perl_nr - person reload number, car, lw- load weight, carr- carrier, pri- price, oid- orderID */
    ld = document.getElementById("leader").value;
    ld_em = document.getElementById("leader_email").value;
    ld_nr = document.getElementById("leader_nr").value;
    pl = document.getElementById("place_load").value;
    pr = document.getElementById("place_reload").value;
    dld = document.getElementById("data_load_day").value;
    drd = document.getElementById("data_reload_day").value;
    hl = document.getElementById("hour_load").value;
    hr = document.getElementById("hour_reload").value;
    perl = document.getElementById("person_load").value;
    perl_nr = document.getElementById("person_load_nr").value;
    per_re = document.getElementById("person_reload").value;
    per_re_nr = document.getElementById("person_reload_nr").value;
    car = document.getElementById("car_type").value;
    lw = document.getElementById("load_weight").value;
    carr = document.getElementById("carrier").value;
    pri = document.getElementById("price").value;
    oid = document.getElementById("orderID").value;

    const events = getEvents();

    events.push({
        name: `Event ${oid}`,
        leader: ld,
        leader_email: ld_em,
        leader_nr: ld_nr,
        place_load: pl,
        place_reload: pr,
        data_load_day: dld,
        data_reload_day: drd,
        hour_load: hl,
        hour_reload: hr,
        person_load: perl,
        person_load_nr: perl_nr,
        person_reload: per_re,
        person_reload_nr: per_re_nr,
        car_type: car,
        load_weight: lw,
        carrier: carr,
        price: pri,
        orderID: oid,

    })
    window.localStorage.setItem('events', JSON.stringify(events));
    alert("A new order is saved!");
    Back();
}
function printingOrders(clickedDate,day, month, year){
    const events = getEvents();
    //backlight for actual chosen date
    for (i = 1; i < 31; i++){
        if (actualMonth === month && actualYear === year)
        {
            document.getElementById("day" + actualDay).style.background = "#80bfff";
        }
        if (i !== actualDay){
        document.getElementById("day" + i).style.border = "1px solid #80bfff";
            document.getElementById("day" + i).style.background = "#d9d9d9";
        }
    }
    document.getElementById("day" + day).style.border = "1px solid #004d80";
    document.getElementById("day" + day).style.background = "#80ccff";


    //making box from today loading events
    const somethingTodayLoading = events.filter(Date => {
         return Date.data_load_day === clickedDate;
     })
    console.log(somethingTodayLoading);
    document.getElementById('h1').innerHTML = 'There is no loading orders to show ';
    let todayEventsLoading = "";
    somethingTodayLoading.forEach((item,index,arr) => {
        todayEventsLoading = todayEventsLoading +  '<div class="todayEvents" onclick="orderShow('+item.orderID+')">' + item.place_load + '-'
            + item.place_reload + '<br>' + item.hour_load + '</div>';
        document.getElementById('h1').innerHTML = todayEventsLoading;
        console.log(item.name);
        console.log(item.orderID);
        console.log(item.hour_load);
    });

    //making box from today unloading events
    const somethingTodayUnloading = events.filter(Date => {
        return Date.data_reload_day === clickedDate;
    })
    console.log(somethingTodayUnloading);
    document.getElementById('h2').innerHTML = 'There is no unloading orders to show ';
    let todayEventsUnloading = "";
    somethingTodayUnloading.forEach((item,index,arr) => {
        todayEventsUnloading = todayEventsUnloading +  '<div class="todayEvents" onclick="orderShow('+item.orderID+')">' + item.place_load + '-'
            + item.place_reload + '<br>' + item.hour_reload + '</div>';
        document.getElementById('h2').innerHTML = todayEventsUnloading;
        console.log(item.name);
        console.log(item.hour_reload);
    });

}
function orderShow(x){
    const events = getEvents();
    const found = events.find(element => String(x) === String(element.orderID));
    const arrIndex = events.indexOf(found);
    console.log('indeks:' , arrIndex);
    console.log(events[arrIndex].orderID);
    console.log(found);
    ArrGlobal = arrIndex;
    document.getElementById("newEvent1").style.display = "none";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("grid-order").style.display = "grid";
    document.getElementById("grid-container-main").style.display = "none";
    document.getElementById("leader").value = events[arrIndex].leader;
    document.getElementById("leader_email").value = events[arrIndex].leader_email;
    document.getElementById("leader_nr").value = events[arrIndex].leader_nr
    document.getElementById("place_load").value =  events[arrIndex].place_load;
    document.getElementById("place_reload").value = events[arrIndex].place_reload;
    document.getElementById("data_load_day").value= events[arrIndex].data_load_day;
    document.getElementById("data_reload_day").value= events[arrIndex].data_reload_day;
    document.getElementById("hour_load").value= events[arrIndex].hour_load;
    document.getElementById("hour_reload").value= events[arrIndex].hour_reload;
    document.getElementById("person_load").value= events[arrIndex].person_load;
    document.getElementById("person_load_nr").value= events[arrIndex].person_load_nr;
    document.getElementById("person_reload").value= events[arrIndex].person_reload;
    document.getElementById("person_reload_nr").value= events[arrIndex].person_reload_nr;
    document.getElementById("car_type").value= events[arrIndex].car_type;
    document.getElementById("load_weight").value= events[arrIndex].load_weight;
    document.getElementById("carrier").value= events[arrIndex].carrier;
    document.getElementById("price").value= events[arrIndex].price;
    document.getElementById("orderID").value= events[arrIndex].orderID;
}
function editOrder(){
    const events = getEvents();
    const arrIndex = ArrGlobal;
    console.log('indeks przy edycji', arrIndex);
    let ld, ld_em, ld_nr, pl, pr, dld, drd, hl, hr, perl, perl_nr, per_re, per_re_nr, car, lw, carr, pri, oid;
    /* ld- leader, ld_em- leader email, ld_nr - leader number, pl - place load, pr - place reload, dld - date load day,
     drd - date reload day, hl - hours load, hr- hour reload, perl - person load, perl_nr- person load number,
     perl - person reload, perl_nr - person reload number, car, lw- load weight, carr- carrier, pri- price, oid- orderID */
    ld = document.getElementById("leader").value;
    ld_em = document.getElementById("leader_email").value;
    ld_nr = document.getElementById("leader_nr").value;
    pl = document.getElementById("place_load").value;
    pr = document.getElementById("place_reload").value;
    dld = document.getElementById("data_load_day").value;
    drd = document.getElementById("data_reload_day").value;
    hl = document.getElementById("hour_load").value;
    hr = document.getElementById("hour_reload").value;
    perl = document.getElementById("person_load").value;
    perl_nr = document.getElementById("person_load_nr").value;
    per_re = document.getElementById("person_reload").value;
    per_re_nr = document.getElementById("person_reload_nr").value;
    car = document.getElementById("car_type").value;
    lw = document.getElementById("load_weight").value;
    carr = document.getElementById("carrier").value;
    pri = document.getElementById("price").value;
    oid = document.getElementById("orderID").value;
     const item = {
       name: `Event ${oid}`,
       leader: ld,
       leader_email: ld_em,
       leader_nr: ld_nr,
       place_load: pl,
       place_reload: pr,
       data_load_day: dld,
       data_reload_day: drd,
       hour_load: hl,
       hour_reload: hr,
       person_load: perl,
       person_load_nr: perl_nr,
       person_reload: per_re,
       person_reload_nr: per_re_nr,
       car_type: car,
       load_weight: lw,
       carrier: carr,
       price: pri,
       orderID: oid,
   }

   arrIndex >= 0 ? events[arrIndex] = item : events.push(item);
   window.localStorage.setItem('events', JSON.stringify(events));
    alert('Changes in this order saved!');
    Back();
}

/* TODO:
    notifications;
    timer for notifications;
    another lighting color for sunday and saturday;
    find button;
    orderID in localstorage!; `
 */
// value in priority