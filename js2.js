

const userName = document.querySelector('[name="name"]');
const userSurame = document.querySelector('[name="surname"]');
const inputs = document.querySelectorAll('input[type="text"]');
const goodsElements = document.querySelectorAll('[name="goods"]');
const countElements = document.querySelectorAll('[type="number"]');

const btn = document.querySelector('.btn');
const sumElement = document.querySelector('.sum');

let sum = 0;

const countGoods = { 
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "capuccino": 0,
    "chocolate_muffin": 0,
    "canele": 0,
    "sandwicht": 0
};
const priceGoods = { 
    "espresso": 0,
    "americano": 0,
    "latte": 0,
    "cappuccino": 0,
    "chocolate_muffin": 0,
    "canele": 0,
    "sandwich": 0
};

/*
Тут делаю так, что при нажатии на инпут сбрасывается значение плейсхолдера -- остаётся пустая строка, куда мы вводим свои данные
Если же мы не ввели данные, то placeholder возвращается к дефолту -- Введите Имя\Введите Фамилию
*/
inputs.forEach(input => {
  let defaultPlaceholder = input.placeholder;
  //input in focus
  input.addEventListener('focus', () => {
    input.placeholder = ''
    
  })
  //input blur
  input.addEventListener('blur', () => {
    // input.placeholder = input.value
    if (input.placeholder === '') {
      input.placeholder = defaultPlaceholder
    }
    // console.log(input.value)
  })
});


//checkboxes
goodsElements.forEach((checkbox, i) => {
  let id = checkbox.dataset.goods;
  
  checkbox.addEventListener('change', () => {
    if (checkbox.checked == true) {
      countElements[i].value = 1;
      countGoods[id] = 1;
      // console.log(checkbox.value)
      priceGoods[id] = Number(checkbox.value)
      // checker
      // console.log('CHECKBOX [+] \nprice:', priceGoods, '\ncount:', countGoods)
    } 
    if (checkbox.checked == false) {
      countElements[i].value = 0;
      priceGoods[id] = 0;
      countGoods[id] = 0;
      // checker
      // console.log('CHECKBOX [-] \nprice:', priceGoods, '\ncount:', countGoods)
    }
  })
});

//arr counters
countElements.forEach((element, i) => {
  let id = element.id;
  let price = Number(goodsElements[i].value)
  element.setAttribute('min', '0')
// rewrite goods count
  element.addEventListener('change', () => {
    let count = Number(element.value)
    if (goodsElements[i].checked) {
      countGoods[id] = count
      priceGoods[id] = price * count;
      // checker
      // console.log('[+] COUNTER \nprice:', priceGoods, '\ncount:', countGoods)
    } else {
      countGoods[id] = countGoods[id]
      priceGoods[id] = priceGoods[id]
    }

    // if (element.value < 0 ) {
    //   element.setAttribute('pattern', '[0-9]')
    //   // alert('Число не может быть отрицательным')
    //   element.value = 0;
    // }
    // checker
    // console.log('[-] COUNTER \nprice:', priceGoods, '\ncount:', countGoods)
  })

//input limiting

});


//calculating sum
function calculate(priceArr) {
  let total = 0;
  for(elem in priceArr) {
    if (elem < 0) {
      total = total;
    } else {
      let price = Number(priceArr[elem])
      total += price;
    }
  }
  sum = total
  return sum;
}
function easterEgg() {
  if (userSurame.value === 'SEC' || userName.value === 'RET') {
    window.open('https://metanit.com/', '_blank');
  }
}
//make order list
function check(countArr, priceArr) {
  let list = ''
  let i = 1;
  let total = 0;

  for(const elem in countArr) {
    let price = Number(priceArr[elem])
    let count = Number(countArr[elem] )

    if (countArr[elem] != 0) {
      list += `#${i} ${elem} (${count}) = ${price}\n`
      i++;
      total += price;
    }
  }
  let totalList = (`${list}\nВсего к оплате: ${total}`)
  return totalList;
}

//check changes
document.addEventListener('change', () => {
  calculate(priceGoods)
  
  sum == 0 ? sumElement.textContent = 0 : sumElement.textContent = sum + ' р.';
})
function setDefaults() {
  location.reload()
  return false;
}
//ALERT ONCLICK
btn.addEventListener('click', () => {
  if (userSurame.value != '' || userName.value != '') {
    alert(`Заказчик: ${userSurame.value} ${userName.value}\nЗаказ:\n${check(countGoods, priceGoods)}`);
    easterEgg()
  } else {
    alert(`\n${check(countGoods, priceGoods)}`)
  }
  setDefaults()
});


