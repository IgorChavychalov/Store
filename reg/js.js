'use strict';

// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

const text = "One: 'Hi Mary.' Two: 'Oh, hi.'\n" +
  "One: 'How are you doing?'\n" +
  "Two: 'I'm doing alright. How about you?'\n" +
  "    One: 'Not too bad. The weather is great isn't it?'\n" +
  "    Two: 'Yes. It's absolutely beautiful today.'\n" +
  "One: 'I wish it was like this more frequently.'\n" +
  "Two: 'Me too.'\n" +
  "One: 'So where are you going now?'\n" +
  "Two: 'I'm going to meet a friend of mine at the department store.'\n" +
  "One: 'Going to do a little shopping?'\n" +
  "Two: 'Yeah, I have to buy some presents for my parents.'\n" +
  "One: 'What's the occasion?'\n" +
  "    Two: 'It's their anniversary.'\n" +
  "One: 'That's great. Well, you better get going. You don't want to be late.'\n" +
  "Two: 'I'll see you next time.'\n" +
  "One: 'Sure. Bye.'";

const pattern = /'/g;

const result = text.replace(pattern, '"');
console.log(result);


// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

const pattern2 = /^'|(\s)'|'(\s)|'$/g;
// левая кавычка : /\W'\b/



const result2 = text.replace(pattern2, '"');

console.log(result2);

// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.


const alertMsg = {
  nameAlert: 'использовать только буквы',
  onlyNumbers: 'использовать только цифры',
  mailText: 'не правильно указан email',
  inputIsEmpty: 'хоть что-то напиши',
};

class ValidForm {
  constructor(alertMsg) {
    this.inputName = document.querySelector('.name');
    this.inputPhone = document.querySelector('.phone');
    this.inputMail = document.querySelector('.mail');
    this.textBox = document.querySelector('.text-box');
    this.clsName = document.querySelector('.form-name');
    this.clsPhone = document.querySelector('.form-phone');
    this.clsMail = document.querySelector('.form-mail');
    this.clsTexBox = document.querySelector('.form-text-box');

    this.btnOK = document.querySelector('button');

    this.namePattern = /[-\.;":'a-zA-Zа-яА-Я]/ig;
    // стащил из интернета
    this.phonePattern = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    // стащил из интернета
    this.mailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    this.alertMsg = alertMsg;
  }

  init() {
    this.btnOK.addEventListener('click', () => {
      this.clearAlertMsg();
      this.clearAlertColor();
      this.checkUpForm();
    });
  }

  checkUpForm() {
    let confirm = 0;

    if (!this.checkUptext(this.namePattern, this.inputName.value)) {
      this.addDiv(this.alertMsg.nameAlert, this.clsName);
      confirm = 1;
    }

    if (!this.checkUptext(this.phonePattern, this.inputPhone.value)) {
      this.addDiv(this.alertMsg.onlyNumbers, this.clsPhone);
      confirm = 1;
    }

     if (!this.checkUptext(this.mailPattern, this.inputMail.value)) {
      this.addDiv(this.alertMsg.mailText, this.clsMail);
      confirm = 1;
    }

    if (!this.isEmpty(this.textBox, this.clsTexBox)) {
      confirm = 1;
    }

    if (confirm) {
      this.sendForm();
    }

  }
  isEmpty(elem, clsElem) {
    if (!elem.value) {
      this.addDiv(this.alertMsg.inputIsEmpty, clsElem);
      return !elem.value
    }
  }

  checkUptext(pattern, text) {
    const result = pattern.test(text);
    console.log(result);
    return result;
  }

  clearAlertMsg() {
    const divs = document.querySelectorAll(".alert-msg");
    for (const div of divs) {
      div.remove();
    }
  }

  clearAlertColor() {
    const clses = document.querySelectorAll(".alert-input");
    for (const cls of clses) {
      cls.classList.remove("alert-input");
    }
  }

  addDiv(msg, parentSelector) {
    const div = document.createElement('div');
    parentSelector.appendChild(div);
    parentSelector.childNodes[1].className += ' alert-input';

    div.innerHTML = msg;
    div.className = 'alert-msg';
  }

  sendForm() {
    const divs = document.querySelectorAll(".alert-msg");
    const inputs = document.querySelectorAll("input");
    if (divs.length === 0) {
      for (const elem of inputs) {
        elem.value = '';
      }

      this.clearAlertColor();
      this.clearAlertMsg();
      alert('Форма отправленна');
    }
  }

}


const myform = new ValidForm(alertMsg);
myform.init();
