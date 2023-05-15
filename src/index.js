import { legacy_createStore as createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// reducer 함수를 만들어놓는다.(다른 말로 modifier)
// reducer 함수란, data를 modify하는 함수를 의미한다... redux에서 '유일하게 data를 modify할 수 있는 부분' => 아래 코드에서 구현된 카운트를 1 늘리거나 줄이는 역할을 수행
// 매개변수로 받아서 그 변수를 처리한 결과를 return할 수 있음.
// reducer 함수는, createStore의 인자로 들어가게 되면 reducer가 반환하는 값이 application에 있는 data가 된다. => countModifier라는 이름
// reducer/modifier 함수의 경우 처음으로 data를 바꿔준다.
// return하는 것은 application에 있는 data. 즉 여기서 application의 데이터는 hello가 됨
// const countModifier = () => {
//   return "hello";
// }

// 넘겨받는 매개변수를 지정할 수도 있고, 기본 값을 지정할 수도 있다.
// const countModifier = (count = 0) => {
//   // ...modify state...
//   count++
//   count--
//   return count;
// }

// store를 만들어 준다. data를 저장해놓기 위함
// const countStore = createStore(countModifier);

// console.log(countStore)를 찍으면, 객체가 반환된다.
// 객체 안에 있는 것들
// 1. dispatch
// 2. subscribe
// 3. getState
// 4. replaceReducer
// + store 변수명.getState() => reducer 함수의 return값을 출력하게 된다.
// console.log(countStore);
// console.log(countStore.getState()); // hello 출력

// let count = 0;

// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// }

// const handleAdd = () => {
//   count += 1;
//   updateText();
//   console.log("add");
// }

// const handleMinus = () => {
//   count -= 1;
//   updateText();
//   console.log("minus");
// }

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

number.innerText = "0";

const countModifier = (count = 0, action) => {
  // modify data
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
  
}

const countStore = createStore(countModifier);

// countStore.dispatch({ type: "ADD" });

console.log(countStore.getState());




// 버튼 클릭시 이벤트 발생시키는 것. 클릭 이벤트를 설정하는 것이므로 첫번째 인자로 click을 집어넣어야 함

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
}

const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// 여기까지만 진행하면, count값은 변경되지만 화면에 반영은 되지 않음
// 이것을 해결해줄 수 있는 것이 바로 구독(subscription)

// subscription : store 안의 변수들의 변화를 감지하여 알려줌 => store에 구독
const onChange = () => {
  console.log(countStore.getState())
  number.innerText = countStore.getState();
}
// countStore 안의 변수의 변화가 발생할 때마다 onChange 함수가 실행되는 것을 확인 가능
countStore.subscribe(onChange)