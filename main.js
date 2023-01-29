let form = document.forms.form;
let url = form.elements.url;
let name = form.elements.name;
let btn = document.querySelector('.btn');
let chat = document.querySelector('.chat');
let comment = form.elements.comment;
let finalComment;

//Запрещает вводить в поле ФИО цифры
document.querySelector('.comments__name').addEventListener('keyup', function (){
    this.value = this.value.replace(/[0-9]/, "");
});

//Функция корректирует написание ФИО по шаблону: Иванов Иван Иванович
let correctName;
function checkName() {
    let withoutSpaceName = name.value.trim();
    let delimiters = /\s+/;
    let nameElems = withoutSpaceName.split(delimiters);
    let correctNameElems = [];
    correctNameElems = nameElems.map(function (elem) {
        return elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase();
    });
    correctName = correctNameElems.join(' ');
        name.value = correctName;
}

// Функция тестирует функцию checkName
// function checkNameTest (name) {
//     console.log(checkName('УАНГ Ян')); // Уанг Ян
//     console.log(checkName('Константинопольский Константин Константинович')); // Константинопольский Константин Константинович
//     console.log(checkName('КонстАНТИНОПОЛЬский кОНСТАНТИН Константинович')); // Константинопольский Константин Константинович
//     console.log(checkName('  КонстАНТИНОПОЛЬский  кОНСТАНТИН Константинович  ')); // Константинопольский Константин Константинович
// }
// checkNameTest();

//Корректирует поле ФИО при потере фокуса на поле
name.addEventListener('blur', checkName);

//Функция проверяет введенное сообщение на наличие спама и заменяет его
function checkSpam() {
    let commentData = comment.value;
    let spamWords = [/viagra/gi, /xxx/gi, /ххх/gi, /виагр/gi];
    let finalComment = commentData;
    for (let i = 0; i < spamWords.length; i++) {
       finalComment = finalComment.replace(spamWords[i], '***');
    };
    return finalComment;
};

//Функция тестирует функцию checkSpam
// function checkSpamTest (commentData) {
//     console.log(checkSpam('viagra или XXX')); 
//     console.log(checkSpam('viagra или xxx'));
//     console.log(checkSpam('только viagra'));
//     console.log(checkSpam('только ххх'));
//     console.log(checkSpam('ViAgRa, viagra или xXx'));
//     console.log(checkSpam('Виагры и ххх тут нет'));
//     console.log(checkSpam('Тут есть все спам-слова: виагра, и viagra, и xxx, и ххх'));
//     console.log(checkSpam('В недрах тундры выдры в гетрах тырят в вёдра ядра кедров!')); // В недрах тундры выдры в гетрах тырят в вёдра ядра кедров!
//     console.log(checkSpam('123')); // 123
// }
// checkSpamTest();

let message,
    urlValue,
    validUrl,
    messageDate,
    messageWrapper,
    messageInfo,
    userName,
    userMessage,
    avatar,
    randomAvatarNum,
    userChoiceShowName,
    date,
    correctDate,
    weekDayName,
    monthName;

//Функция создает div-обертку для нового сообщения в div, отвечающем за поле чата, и наполняет сообщение датой и телом сообщения
function createMessage() {
    event.preventDefault();
    
    message = document.createElement('div');
    message.className = 'chat__message';
    chat.append(message);

    createMessageDate();
    createMessageWrapper();
}

//Функция создает дату и время отправления сообщения
function createMessageDate() {
    messageDate = document.createElement('div');
    messageDate.className = 'chat__message-data';
    correctMessageDate();
    messageDate.innerHTML = correctDate;
    message.append(messageDate);

}

//Функция преобразует дату и время отправления сообщения по шаблону: день недели, число + месяц прописью + год сообщения и время в формате ЧЧ:ММ:СС
function correctMessageDate() {
    let date = new Date();
    let weekDayNum = date.getDay();
    let day = date.getDate();
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
    let seconds = date.getSeconds();
    let fullSeconds;
    if (seconds < 10) {
        fullSeconds = `0${seconds}`;
      } else {
        fullSeconds = seconds;
      }  
    
    switch (weekDayNum) {
        case 0:
          weekDayName = 'воскресенье';
          break;
        case 1:
          weekDayName = 'понедельник';
          break;
        case 2:
          weekDayName = 'вторник';
          break;
        case 3:
          weekDayName = 'среда';
          break;
        case 4:
          weekDayName = 'четверг';
          break;
        case 5:
          weekDayName = 'пятница';
          break;  
        case 6:
          weekDayName = 'суббота';
          break;         
      }

      switch (monthNum) {
        case 0:
          monthName = 'января';
          break;
        case 1:
          monthName = 'февраля';
          break;
        case 2:
          monthName = 'марта';
          break;
        case 3:
          monthName = 'апреля';
          break;
        case 4:
          monthName = 'мая';
          break;
        case 5:
          monthName = 'июня';
          break;
        case 6:
          monthName = 'июля';
          break;
        case 7:
          monthName = 'августа';
          break;
        case 8:
          monthName = 'сентября';
          break;
        case 9:
          monthName = 'октября';
          break;
        case 10:
          monthName = 'ноября';
          break;
        case 11:
          monthName = 'декабря';
          break;  
      }

    correctDate = `${weekDayName},<br>${day} ${monthName} ${year} г.<br>в ${fullHours}:${fullMinutes}:${fullSeconds}`;
}

//Функция проверяет ссылку для аватара
function checkUrl() {
    urlValue = url.value;
    let jpeg = urlValue.includes('.jpeg');
    let jpg = urlValue.includes('.jpg');
    let png = urlValue.includes('.png');
    let gif = urlValue.includes('.gif');
    let svg = urlValue.includes('.svg');
    let webp = urlValue.includes('.webp');
    if (urlValue.includes('https://' || 'https://') && (jpg || jpeg || png || svg || gif || webp)) {
        return validUrl = true;
    } else {
        return validUrl = false;
    }
} 

//Функция проверяет checkUrl
// function testCheckUrl() {
//     console.log(checkUrl('https://prod-life.by/g10018656-tejpy-dlya-litsa')); // false
//     console.log(checkUrl('i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.jpg')); // false
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.jpg')); // true
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.jpeg')); // true
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.png')); // true
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.gif')); // true
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.svg')); // true
//     console.log(checkUrl('https://i.pinimg.com/564x/a4/e3/5e/a4e35e6f0bda6dabc93adc44a366b61e.webp')); // true
// } 
// testCheckUrl();

// Функция создает div-обертку для текстовых данных нового сообщения и аватара и помещает их туда
function createMessageWrapper() {
    messageWrapper = document.createElement('div');
    messageWrapper.className = 'chat__message-wrapper';
    message.append(messageWrapper);

    createMessageInfo();
    createAvatar();  
}

// Функция создает div-обертку для текстовых данных нового сообщения и помещает их туда
function createMessageInfo() {
    messageInfo = document.createElement('div');
    messageInfo.className = 'chat__message-info';
    messageWrapper.append(messageInfo);

    createUserName();
    createUserMessage();
}

//Функция определяет, хочет ли пользователь указывать ФИО
function defineUserChoiceShowName() {
    event.preventDefault();
    return userChoiceShowName = document.querySelector('input[name="radio"]:checked').value;
}

//Функция создает div для user name, отображаемого в сообщении, и помещает его туда
function createUserName() {
    userName = document.createElement('div');
    userName.className = 'chat__user-name';
    defineUserChoiceShowName();
    if (!name.value || userChoiceShowName == 'no') {
        userName.innerHTML = 'Username'; 
    } else {
        userName.innerHTML = correctName;
    }

    messageInfo.append(userName);
    name.value = '';
    document.querySelector('input[name="radio"]').checked = true;
}

//Функция создает div для текста сообщения и помещает в него текст
function createUserMessage() {
    userMessage = document.createElement('div');
    userMessage.className = 'chat__user-message';
    userMessage.innerHTML = checkSpam();
    messageInfo.append(userMessage);
    comment.value = '';
}

//Функция добавляет div для аватара и помещает туда изображение
function createAvatar() {
    avatar = document.createElement('div');
    avatar.className = 'chat__avatar';
    messageWrapper.append(avatar);

    createAvatarImage();   
}

//Функция генерирует номер рандомного аватара
function createRandomAvatarNum(min, max) {
    randomAvatarNum = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    return randomAvatarNum;
}
//Функция тестирует createRandomAvatarNum
// function testCreateRandomAvatarNum() {
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
//     console.log(createRandomAvatarNum(1,6));
// }
// testCreateRandomAvatarNum()

//Функция задает картинку для аватара c учетом проверки
function createAvatarImage() {
    checkUrl();
    createRandomAvatarNum(1, 6);
    if (!validUrl || urlValue == '') {
        avatar.classList.add(`chat__avatar_random${randomAvatarNum}`);
    } else {
        avatar.style.backgroundImage = `url(${url.value})`;
    }
    url.value = '';
};

btn.addEventListener('click', function () {
    event.preventDefault();
    // if(!name.value) {
    //   alert('Поле имя не заполнено');
    //   return;
    // }
    
    // if(!url.value) {
    //   alert('Поле ccылки не заполнено');
    //   return;
    // }
  
    // По условию про отправление с незаполненным полем "Комментарий" ничего не сказано. Посчитала логичным, чтобы без него не отправлялось. Чтобы сделать, как в примере на видео, надо закомментить бkок кода в if ниже
    if(!comment.value) {
      alert('Поле комментария не заполнено');
      return;
    }

    createMessage();
});