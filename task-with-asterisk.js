let date;
let correctDate;

//Функция форматирует дату
function formatDate(date) {
    let now = new Date ();
    if (+now - +date < 1000) {
        return "прямо сейчас";
    } else if (+now - +date < 60 * 1000) {
        let s = Math.floor((+now - +date) / 1000);
        return `${s} сек. назад`;
    } else if (+now - +date < 60* 60 * 1000) {
        let m = Math.floor((+now - +date) / 60000);
        return `${m} мин. назад`;
    } else {
        
      let day = date.getDate();
      let fullDay;
      if (day < 10) {
          fullDay = `0${hours}`;
        } else {
          fullDay  = day;
        }
      
      let monthNum = date.getMonth();
      let year = date.getFullYear();
      let hours = date.getHours();
      let fullHours;
      if (hours < 10) {
          fullHours = `0${hours}`;
        } else {
          fullHours = hours;
        }
      let minutes = date.getMinutes();
      let fullMinutes;
      if (minutes < 10) {
          fullMinutes = `0${minutes}`;
        } else {
          fullMinutes = minutes;
        }
      
        switch (monthNum) {
          case 0:
            monthName = '01';
            break;
          case 1:
            monthName = '02';
            break;
          case 2:
            monthName = '03';
            break;
          case 3:
            monthName = '04';
            break;
          case 4:
            monthName = '05';
            break;
          case 5:
            monthName = '06';
            break;
          case 6:
            monthName = '07';
            break;
          case 7:
            monthName = '08';
            break;
          case 8:
            monthName = '09';
            break;
          case 9:
            monthName = '10';
            break;
          case 10:
            monthName = '11';
            break;
          case 11:
            monthName = '12';
            break;  
        }
      
        return correctDate = `${fullDay}.${monthName}.${year} ${fullHours}:${fullMinutes}`;
    }
}








// Напишите функцию `formatDate(date)`, форматирующую `date` по следующему принципу: 

// - если спустя `date` прошло менее 1 секунды, вывести `"прямо сейчас"` ;
// - в противном случае, если с `date` прошло меньше 1 минуты, вывести `"n сек. назад"`;
// - в противном случае, если меньше часа, вывести `"m мин. назад"`;
// - в противном случае, полная дата в формате `"DD.MM.YY HH:mm"`. А именно: `"день.месяц.год часы:минуты"`, всё в виде двух цифр, т.е. `31.12.16 10:00`.

//Функция тестирует formatDate(date)
function testFormatDate() {
    console.log(formatDate(new Date(new Date - 1))); // "прямо сейчас" 
    console.log(formatDate(new Date(new Date - 30 * 1000))); // "30 сек. назад"
    console.log(formatDate(new Date(new Date - 5 * 60 * 1000))); // "5 мин. назад"
    console.log(formatDate(new Date(new Date - 86400 * 4 * 1000))); // прошлая дата (четыре дня назад) вроде 31.11.2022, 20:00
}

testFormatDate();

