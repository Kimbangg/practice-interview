# Javascript Symbol (심볼)

> ES6에 추가된 심볼타입에 대해 알아봅시다.

Symbol은 자바스크립트의 원시(Primitive)타입으로 ES6에서 새롭게 추가되었습니다.

원시타입은 객체도 아니고 메서드도 아닌 타입을 의미합니다.

참고) 기본 자료형 (Primitive) 인 여섯가지 데이터 타입

- Boolean
- Null
- Undefined
- Number
- String
- Symbol (ECMAScript 6 에 추가됨)

## Symbol의 특징

Symbol은 **객체 속성(object property)**을 만들 수 있는 원시 타입입니다.

Symbol 타입은 주로 객체의 고유한 프로퍼티의 값으로 사용하는 목적으로 쓰입니다.

다음 예시를 볼까요??

```javascript
var symbolProperty = Symbol("key"); // Symbol(key)
var ob = {};

ob[symbolProperty] = "value";

console.log(ob); // {Symbol(key): "value"}

console.log(ob[symbolProperty]); // "value"
console.log(typeof symbolProperty); // "symbol"
```

이 때 Symbol은 생성할 때마다 독립적인 값이 되기때문에, 같은 string 으로 정의해도 같은 값이 아닙니다.

```javascript
var symbolProperty1 = Symbol("key"); // Symbol(key)
var symbolProperty2 = Symbol("key"); // Symbol(key)
var ob = {};

ob[symbolProperty1] = "value1";
ob[symbolProperty2] = "value2";

console.log(ob); // {Symbol(key): "value1", Symbol(key): "value2"}

console.log(symbolProperty1 === symbolProperty2); // false
```

위 코드를 보면 symbolProperty1, symbolProperty2 는 같은 'key'로 Symbol을 생성했지만 서로 다름을 알 수 있습니다.

또한 Symbol을 생성했을 때 value (value of) 는 원시형 값이 아닙니다. 따라서 toString() 등으로 문자등과 합칠 수 없습니다.

```javascript
"text" + Symbol("string"); // Error
// Uncaught SyntaxError: Invalid or unexpected token
```

## Symbol의 생성

Symbol은 다음과 같은 세가지 방법으로 생성할 수 있습니다.

```javascript
Symbol();
Symbol.for(); // Symbol과 달리 전역으로 존재하는 global symbol table 참조
Symbol.iterator; // iterator 객체를 정의하기 위해 쓰인다.

obj[Symbol.iterator] = function* {}
```

Symbol.for를 더 자세히 알아볼까요?

```javascript
var ob = {};
var a = Symbol.for("key");
var b = Symbol.for("key");

ob[a] = 20;

console.log(ob[b] === 20);
```

이렇게 Symbol.for 로 생성한 Symbol은 같은 'key'로 만든 Symbol과 같다는 것을 알 수 있습니다.

## Symbol의 private한 성질

Symbol 속성은 열거형 속성이 아니기 때문에 for of 이나 Object.keys 때 찾을 수 없습니다.

Symbol 속성을 찾을 때는 Object.getOwnPropertySymbols 로 찾아야 합니다.

또한 JSON.stringify() 에서도 무시됩니다.

```javascript
var ob = {
  [Symbol("a")]: 10,
  [Symbol("b")]: 20,
};

Object.getOwnPropertySymbols(ob);
// [Symbol(a), Symbol(b)]

Object.keys(ob);
// []

for (var i in ob) {
  console.log(i);
}
// 반환값 없음

JSON.stringify(ob);
// "{}"
```

## React 와 Symbol

JSX 문법으로 태그를 생성할 때 실제로는 함수가 호출됩니다.

```javascript
<marquee bgcolor="#ffa7c4">hi</marquee>;

React.createElement(
  /* type */ "marquee",
  /* props */ { bgcolor: "#ffa7c4" },
  /* children */ "hi"
);
```

그리고 위 함수는 다음과 같은 객체를 반환합니다.

```javascript
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), // 🧐 응? 이건 뭐지?
}
```

typeof는 대체 무엇이며, 왜 Symbol()을 값으로 가지고 있는 걸까요?

### HTML injection

일반적으로 생성하고 DOM을 주입하기 위해 주로 아래와 같은 방법을 사용하곤 합니다.

```javascript
const messageEl = document.getElementById("message");
messageEl.innerHTML = "<p>" + message.text + "</p>";
```

다만 message.text가 다음과 같을 경우 골치아파집니다.

```javascript
<img src onerror="stealYourPassword()" />
```

이 때문에 React 같은 모던 라이브러리에선 문자열 텍스트에 대한 이스케이핑이 기본으로 지원됩니다.

만약 message.text에 HTML 태그나 여타 다른 수상한 태그 문자열이 들어오면, React는 이를 실제 HTML 태그로 변환하지 않습니다.

React는 먼저 입력값을 이스케이프한 뒤 DOM에 주입시킨다. 결과적으로 HTML 태그가 나오는 대신 단순한 마크업 코드만 표시된다.

만약 HTML을 React element 안에 넣어야하는 상황이라면,

```javascript
dangerouslySetInnerHTML={{ __html: message.text }}
```

를 사용하면 됩니다.

의도적으로 injection을 염두해두고 만든 것이 느껴지죠?

그러나 이러한 이스케이핑 방법은 완전히 안전하지 않습니다. 대부분의 공격은 속성(attributes)을 통해 이루어집니다.

만약 서버에서 받은 message.text의 정보가 JSON인 경우 어떻게할까요??

> 만약 당신의 서버에 구멍이 생겨, (원래는 문자열로 입력을 받아야 하는데) 유저가 임의의 JSON 객체를 서버에 저장할 수 있는 문제가 발생했다고 하자. 클라이언트 쪽 코드에선 당연히 해당 정보를 문자열로 받게끔 설계되어 있을테니 문제가 발생하게 된다

```javascript
// 서버에 구멍이 생겨 JSON이 저장되었다고 가정하자.
let expectedTextButGotJSON = {
  type: "div",
  props: {
    dangerouslySetInnerHTML: {
      __html: "/* put your exploit here */",
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// React 0.13에서 이는 위험할 수 있다.
<p>{message.text}</p>;
```

이 문제를 해결하기 위해 '모든 React element에 Symbol 태그'를 달았습니다.

다시한번 React.createElement의 반환되는 객체를 살펴볼까요?

```javascript
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```

Symbol의 성질 상 JSON에는 Symbol를 넣을 수 없습니다.

즉, 설사 서버에 보안 구멍이 생겨 텍스트 대신 JSON을 반환한다 하더라도, 그 JSON에는 Symbol.for('react.element') 코드를 포함시킬 수 없습니다.

React는 element.\$\$typeof 를 체크하여, 해당 키가 없거나 무효하면 React element 생성을 거부합니다.

즉 Symbol로 생성된 해당 키가 없는 경우에는 React element 로 생성되지 않는것이죠

(injection 등으로 해커의 공격을 위한 Element의 생성을 방지합니다)

### 번외 - ES6 Symbol을 지원하지 않는 브라우저는요

그럼 Symbol을 지원하지 않는 브라우저들은 어떨까요?

아쉽게도 이들은 방금 위에서 언급한 혜택을 받을 수 없습니다.

일관성을 위해 element에는 언제나 $$typeof 필드가 포함되어 있으나, Symbol를 지원하지 않는 환경에선 $$typeof 값에 Symbol 대신 number가 들어가게 됩니다.

```javascript
0xeac7; // 잘 보면 “React”처럼 보이니까요
```

## 참고 자료

[Javascript와 Symbol Symbol](https://medium.com/@pks2974/javascript%EC%99%80-%EC%8B%AC%EB%B3%BC-symbol-bbdf3251aa28)

[왜-React-Element에는-typeof-프로퍼티가-있을까](https://velog.io/@scamera/%EC%99%9C-React-Element%EC%97%90%EB%8A%94-typeof-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EA%B0%80-%EC%9E%88%EC%9D%84%EA%B9%8C)
