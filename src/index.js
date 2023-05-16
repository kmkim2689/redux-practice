import { legacy_createStore as createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// // 배열을 둠으로써, todo들을 모아놓을 수 있음...
// const toDos = [];

// const createToDo = toDo => {
//     // li 태그 요소를 하나 만든다.
//     const li = document.createElement("ul");
//     li.innerText = toDo;
//     // appendChild를 이용하여 ul에 리스트 추가
//     ul.appendChild(li);
// };

// const onSubmit = e => {
//     e.preventDefault();
//     // todo input에 적힌 값을 가져오고
//     const toDo = input.value;
//     // 초기화
//     input.value = ""
//     createToDo(toDo);
// };

// form.addEventListener("submit", onSubmit);

// using redux

// const ADD_TODO = "ADD_TODO";
// const DELETE_TODO = "DELETE_TODO";

// const addTodo = (text) => {
//     return {
//         type: ADD_TODO,
//         text
//     }
// }

// const deleteTodo = (id) => {
//     return {
//         type: DELETE_TODO,
//         id
//     }
// }

// // reducer
// const reducer = (state = [], action) => {
//     console.log(action);
//     // 여기서 state는 직접 수정하는 것이 아니라, 새로운 것을 return함으로서 수정이 이뤄져야 한다.
//     switch (action.type) {
//         case ADD_TODO:
//             // 금지
//             // return state.push(action.text)
//             // 새로운 배열을 만들어 리턴하기
//             // 이 때 spread 연산자를 이용한다. 형태는 ...배열명 혹은 ...객체명모든 객체 혹은 배열의 각 요소 하나하나를 나열하게 된다.
//             // 즉 이전 array의 contents에 더하여, 새로운 object를 추가
//             // 즉, state 배열은 text 필드를 가진 객체가 여러개 모인 배열 형태...
//             // return [...state, { text: action.text, id: Date.now() }];
//             // 만약 최신의 것이 가장 위로 오게 하고 싶다면 다음과 같이 수정
//             return [{ text: action.text, id: Date.now() }, ...state];
//         case DELETE_TODO:
//             return state.filter(toDo => toDo.id !== action.id);
//         default:
//             return state;
//     }
// };

// const store = createStore(reducer);

// // subscription
// store.subscribe(() => {
//     console.log(store.getState())
// });

// // 보통 dispatch에 들어갈 함수의 경우 분리하여 만든다
// const dispatchAddTodo = (text) => {
//     store.dispatch(addTodo(text));
// }

// const dispatchDeleteToDo = (e) => {
//     console.log("delete");
//     console.log(e.target)
//     // e.target은 버튼 그 자체를 가리키기 때문에, 부모 요소인 li에서 아이디를 꺼내오기 위하여 parentNode 속성을 사용. 그러면 li를 반환하게 된다.
//     console.log(e.target.parentNode.id);
//     const id = parseInt(e.target.parentNode.id);
//     store.dispatch(deleteTodo(id));
// }

// const paintToDos = () => {
//     // store에 변화가 일어날 때마다 리스트의 처음부터 끝까지 렌더링을 진행
//     const toDos = store.getState();
//     // ul에 모든 요소를 비움
//     ul.innerHTML = "";
//     toDos.forEach((toDo) => {
//         const li = document.createElement("li");
//         // 삭제 기능을 추가하기 위하여, delete 버튼을 추가
//         // btn 클릭에 대한 이벤트 리스너
//         const btn = document.createElement("button");
//         btn.addEventListener("click", dispatchDeleteToDo)
//         btn.innerText = "DEL";
//         // li의 자식으로 넣는다. li에 삭제 버튼이 속하도록
//         li.appendChild(btn);
//         li.id = toDo.id;
//         li.innerText = toDo.text;
//         ul.appendChild(li);
//     })
// }

// // todo 항목의 변경 시 재렌더링을 하기 위하여, 아래와 같이 subscription을 설정
// store.subscribe(paintToDos)



// const onSubmit = (e) => {
//     e.preventDefault();
//     const toDo = input.value;
//     input.value = "";
//     // html을 변경하는 대신, dispatch를 이용
//     // dispatch 인자로 들어가는 객체에는 type뿐만 아니라 유저가 선택적으로 리듀서에 넘겨주고 싶은 내용을 추가로 명시할 수도 있다. 여기서는 todo 리스트에 추가될 내용을 넘겨줘야 하기 때문에 text라는 필드를 추가적으로 넘겨주는 작업을 수행한다.
//     dispatchAddTodo(toDo);
// }

// form.addEventListener("submit", onSubmit)

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);