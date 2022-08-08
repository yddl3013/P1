// import axios from 'axios';

axios.defaults.withCredentials = true;

let result;
let from = '20220606'
let to = '20220612'

let currentDate = document.getElementsByClassName('date')
let today = new Date()

let year = today.getFullYear()
let month = today.getMonth() + 1
let date = today.getDate()
let day = today.getDay()


if (month < 10) {
    month =  '0' + month
}

if (date < 10) {
    date = '0' + date
}


currentDate[0].textContent = `${year}${month}${date}`


axios({
    method: 'post',
    url: `http://localhost:8088`,
    data: {
        from: from,
        to: to
    }
})
.then((res) => {
    console.log(res.data.hisTimetable[1].row);
    const time = res.data.hisTimetable[1].row;
    let monday = document.getElementsByClassName('monday')
    let tuesday = document.getElementsByClassName('tuesday')
    let wednesday = document.getElementsByClassName('wednesday')
    let thursday = document.getElementsByClassName('thursday')
    let friday = document.getElementsByClassName('friday')

    
    let dayCount = 0;
    let count = 0;
    for (const thisTime of time) {
        if (count < 7) {
            switch (dayCount) {
                case 0:
                    monday[count].textContent = thisTime.ITRT_CNTNT
                    break;
                case 1:
                    tuesday[count].textContent = thisTime.ITRT_CNTNT
                    break;
                case 2:
                    wednesday[count].textContent = thisTime.ITRT_CNTNT
                    if (count === 5) {
                        count = -1;
                        dayCount = 3;
                        break
                    }
                    break;
                case 3:
                    thursday[count].textContent = thisTime.ITRT_CNTNT
                    break;
                case 4:
                    friday[count].textContent = thisTime.ITRT_CNTNT
                    break;
            }
            
            if(count === 6) {
                count = 0;
                dayCount++
            } else {
                count++
            }
        }
    }
})