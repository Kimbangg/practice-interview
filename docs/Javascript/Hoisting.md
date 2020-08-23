# Hoisting

## 호이스팅이란 무엇인가

어떤 실행 컨텍스트가 활성화되는 시점에서 선언된 변수를 끌어올리고 외부 환경 정보를 구성하고, this 값을 설정하는 등의 동작을 수행함 이때 변수 선언과 값 할당이 동시에 이뤄진 문장은 선언부만을 호이스팅하고, 함수는 내용까지 호이스팅된다.

## 자바스크립트는 동기적 언어

자바스크립트로 네트워크로 비동기 로직을 자주 다루기 때문에 비동기 언어라고 생각할 수도 있지만 엄연한 한번에 하나의 함수만 실행하는 동기적 언어이다. 고로 어느 함수에서 어느 함수로 코드가 진행되었는지가 기록되어야 하는데 이를 위해 자바스크립트 엔진에서는 콜 스택이라는 구조를 사용한다.

## 실행 컨텍스트의 의미

- 실행할 코드에 제공할 환경 정보들을 모아놓은 객체
- 전역공간, eval(), 일반 함수에 의해 실행 컨텍스트가 바뀐다. → 이를 추적하기 위해 콜 스택을 사용
- 콜 스택의 가장 위에 있는 실행 컨텍스트가 현재 돌아가고 있는 Execution Context.

## 함수가 실행될 때 전처리 작업이 존재한다

- Lexical Environment, Variable Envorinment라는 2개의 컴포넌트가 존재
- Lexical Environment에서는 식별자와 참조 혹은 값을 기록하는 Environment Record와 outer(outerEnvironmentReference)로 구성되는데 outer는 외부 Lexical Environment를 참조하는 포인터
- 하나의 컨텍스트에서도 while문이나 if, try, catch등의 코드 블럭이 실행 될 때 마다 새로운 Lexical Environment가 생기고, 기존의 Lexical Environment에 의해서 참조된다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1dd1f84b-43f4-4942-ac79-74afe8b4f08e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1dd1f84b-43f4-4942-ac79-74afe8b4f08e/Untitled.png)

## 스코프 체인

스코프란 식별자에 대한 유효 범위. 자바스크립트는 오직 함수에 의해서만 스코프가 생성. (except let, const). 식별자의 유효 범위를 안에서부터 바깥으로 차례로 검색해나가는 것을 스코프 체인이라고 함. Linked List의 형태를 띤다. 여러 스코프에서 동일한 식별자를 선언한 경우에는 무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에게만 접근 가능

## TDZ (Temporal Dead Zone)

- let, const, class, default parameter, this

## 호이스팅으로 할 수 있는 것들

- bottom-top식으로 코드 접근 가능 → 유연한 코드
- Mutual recursion

```jsx

Mutual recursion:

function isOdd(num) {
  if (num === 1)
    return true;
  return !isEven(num-1);
}

function isEven(num) {
  if (num === 0)
    return true;
  return !isOdd(num-1);
}
// https://stackoverflow.com/questions/47807062/direct-and-mutual-recursion-in-javascript`
```

## 참고자료

- [https://velog.io/@jiwon/Javascript는-동기일까-비동기일까](https://velog.io/@jiwon/Javascript%EB%8A%94-%EB%8F%99%EA%B8%B0%EC%9D%BC%EA%B9%8C-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%9D%BC%EA%B9%8C)
- [https://stackoverflow.com/questions/23948198/variable-environment-vs-lexical-environment](https://stackoverflow.com/questions/23948198/variable-environment-vs-lexical-environment)
- [https://meetup.toast.com/posts/129](https://meetup.toast.com/posts/129)
- [https://www.ecma-international.org/ecma-262/8.0/index.html#sec-executable-code-and-execution-contexts](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-executable-code-and-execution-contexts)
- [http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#variable-environment](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#variable-environment)
- [https://ko.javascript.info/closure#ref-1017](https://ko.javascript.info/closure#ref-1017)
- [https://www.quora.com/Why-does-JavaScript-hoist-variables](https://www.quora.com/Why-does-JavaScript-hoist-variables)

---

[https://meetup.toast.com/posts/118](https://meetup.toast.com/posts/118): 함수 객체, 함수 객체 생성

[https://meetup.toast.com/posts/123](https://meetup.toast.com/posts/123): 함수 호출

[https://ui.toast.com/weekly-pick/ko_20191014/](https://ui.toast.com/weekly-pick/ko_20191014/): TDZ
