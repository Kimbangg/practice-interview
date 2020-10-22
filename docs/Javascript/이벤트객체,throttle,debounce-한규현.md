# Event 객체란? 캡처링과 버블링, 이벤트 위임, 쓰로틀링 & 디바운싱 - 한규현

## Event 객체

- 이벤트에 대한 정보를 담고 있는 객체
- eventListener 함수에 매개변수로 전달된다

### Event 발생

- 사용자 액션(마우스 클릭 등)
- `HTMLElement.click()` 메소드 호출이나 `EventTarget.dispatchEvent()` 를 사용하여 의도적으로 만들어낼 수 있음

하나의 Element는 다수의 listener를 가질 수 있다. (동일한 이벤트에 대해서도.)

### Event Bubbling

특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성

### Event Capturing

이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식

```jsx
div.addEventListener("click", eventHandler, {
  capture: true, // default 값은 false
});
```

### event.stopPropagation()

해당 event가 전파되는 것을 막음. (나까지만 실행)

`event.stopImmediatePropagation()`

element에 click 이벤트핸들러가 세 개(eH1, eH2, eH3) 있다고 가정.

stopPropagation()을 어디서 하던지 세개 다 실행하지만, immediate함수 실행하면 이후 이벤트 핸들러까지도 동작 안함

### Event Delegation (이벤트 위임)

버블링/캡쳐링을 활용한 이벤트 핸들링 패턴.

element마다 핸들러를 할당하지 않고, 공통 조상에 이벤트 핸들러를 단 하나만 달아서 여러 요소의 이벤트를 한번에 처리할 수 있음.

todo리스트 개발할때 어떻게 했는지 생각해보자.

예시) 카드를 클릭하여 수정할 수 있다.

1. 맨처음에 이벤트를 다 달았다 ⇒ 새 카드가 추가되면...? 또달아야된다
2. 클래스로 관리했다. 각각의 카드에 이벤트 핸들러가 달려있다. ⇒ 말도안되지만 카드가 10만개고 카드당 이벤트핸들러가 여러개면 리소스가 많이 든다.
3. 이벤트 위임을 활용했다. ⇒ 이벤트는 공통 조상에 하나만 달려있다. 걔가 이벤트를 받아서 어떤 카드가 클릭된건지 판단하고, 처리한다. 새 카드가 추가되어도 끄떡없다. 카드가 많아져도 상관없다.

but, 이벤트가 다양해지면 다양해질수록 비교연산이 많이 필요할 수 있다.

```jsx
const getData = (target: HTMLElement): CardData => ({
  ids: getElementIds(target),

  columnElm: target.closest('.column'),

  cardElm: target.closest('.card'),
  cardFormElm: target.closest('.card.new'),

  createCardBtnElm: target.closest('.action-btn.new-card-btn'),
  deleteCardBtnElm: target.closest('.delete-card-btn'),
  editOkBtnElm: target.closest('.card-btn.edit'),
  createCardOKBtnElm: target.closest('.card-btn.add'),
  cancelBtnElm: target.closest('.card-btn.cancel'),
})

window.addEventListener('click', (e) => {
  const target = e.target as HTMLElement

  const data = getData(target)
  const {
    cardElm,
    createCardBtnElm,
    deleteCardBtnElm,
    editOkBtnElm,
    createCardOKBtnElm,
    cancelBtnElm,
  } = data

  if (createCardBtnElm) {
    createCardFormHandler(data)
    return
  }

  if (createCardOKBtnElm) {
    createCardHandler(data)
    return
  }

  if (editOkBtnElm) {
    const previousCardId = getPreviousCardNumber(cardElm)
    editCardHandler(data, previousCardId)
    return
  }

  if (cancelBtnElm) {
    cancelCreateOrEditHandler(data)
    return
  }

  if (deleteCardBtnElm) {
    deleteCardHandler(data)
    return
  }
})
```

## Throttling, Debouncing

이벤트 핸들러가 많은 연산(예 : 무거운 계산 및 기타 DOM 조작)을 수행(이벤트 핸들러의 과도한 횟수가 발생하는 것)하는 경우 에 대해 제약을 걸어 제어할 수 있는 수준으로 이벤트를 발생(그 핸들러를 더 적게 실행하면 빠져 나갈 수 있음)시키는 것을 목표로 하는 기술

왜? JS연산이 많아지면 리소스를 많이 잡아먹음 → 프레임떨어짐 → 드드드득

### debounce

연달아 호출되는것중에 마지막 or 제일 처음 함수만 호출

이번에 자동완성에 사용될 수 있음.
input의 onChange에 api호출 걸면 '바나나맛 우유' 칠때 모음갯수+자음갯수만큼 api호출일어남.

리소스 낭비일 뿐만 아니라 싱크에 대한 보장도 못함.

### throttle

연달아 호출되는 이벤트를 일정한 주기마다 발생하게 함

만약 스크롤에 debounce 달면 스크롤이 멈췄을 쯤 발생함. 무한스크롤 구현한다고 가정하면

스크롤 스윽스윽 끝까지 내려서 그만뒀을 때 api호출됨. 이 때 throttle이 더 적합함.

스크롤 내릴때 중간중간 100ms마다 이벤트 발생시켜서 일정 범위에 도달하면 api호출!

⇒ 사용자가 Footer에 닿기 전에 호출할 수 있음

lodash 인스톨하면 편하게 쓸 수 있다...ㅎㅎ

### 구현해보자

**debounce**

```jsx
const notionScroller = document.querySelector(
  ".notion-scroller.vertical.horizontal"
);

let interval = null;

notionScroller.addEventListener("scroll", (e) => {
  if (interval) {
    clearTimeout(interval);
  }

  interval = setTimeout(() => {
    console.log(
      notionScroller.scrollHeight -
        notionScroller.clientHeight -
        notionScroller.scrollTop
    );
  }, 100);
});
```

**throttle**

```jsx
const notionScroller = document.querySelector(
  ".notion-scroller.vertical.horizontal"
);

let interval = null;

notionScroller.addEventListener("scroll", (e) => {
  if (!interval) {
    interval = setTimeout(() => {
      interval = null;
      console.log(
        notionScroller.scrollHeight -
          notionScroller.clientHeight -
          notionScroller.scrollTop
      );
    }, 100);
  }
});
```

### 참고문헌

[https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)

[https://ko.javascript.info/bubbling-and-capturing](https://ko.javascript.info/bubbling-and-capturing)

[https://developer.mozilla.org/ko/docs/Web/API/Even](https://developer.mozilla.org/ko/docs/Web/API/Event)t

[https://webclub.tistory.com/607](https://webclub.tistory.com/607)
