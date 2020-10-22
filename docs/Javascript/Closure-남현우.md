# Closure - 남현우

> “A closure is the combination of a function and the lexical environment within which that function was declared.”

클로저는 `반환된` 내부함수가 자신이 `선언` 되었을 때의 환경 `lexical environment` 의 스코프를 기억해서 함수 외부에서 `호출`되었을 때, 자신의 생성될 때의 환경을 기억하는 함수입니다

```jsx
const name = "andy";
const job = "ajossi";

const introduceAndy = () => console.log(`${name} is a ${job}`);

const insideWoowaBros = () => {
  const job = "developer";

  const closureIntroduce = () => {
    console.log(`${name} is a ${job}`);
  };
  return closureIntroduce;
};

const introduceAndyInWoowaBros = insideWoowaBros();

introduceAndy(); // andy is a ajossi
introduceAndyInWoowaBros(); // andy is a developer

introduceAndyInWoowaBros = null;
```

### Performance

`closureIntroduce`를 반환하고 난 `insideWoowaBros`는 실행 컨텍스트(콜스택)에서 제거되었기 때문에 GC(garbage collector)가 회수해야 맞지만, 외부함수(insiderWoowabros)내의 변수를 필요로 하는 내부함수가 하나라도 존재한다면 계속해서 유지된다. 메모리를 직접 관리하는 c언어와 같은 환경에서는 동적 할당을 하고, free를 해주지 않은 것과 같다. 따라서 분명하게 성능상의 이슈가 있기 때문에, 사용하지 않는 클로져 변수는 `null` 처리를 해줘서 GC가 회수해 갈 수 있는 환경을 만들어 주어야 한다.

## 어디에 쓰이나

- private 한 변수를 사용해야 할 때
- global 변수의 사용을 지양해야 할 때
- 대표적으로 카운터 예제, for loop 예제

### Memomization

```tsx
const memomization = (calculateFn: (number, number) => number) => {
  const memoMap = new Map<string, number>();

  return (x: number, y: number) => {
    const key = `${x}, ${y}`;

    if (memoMap.has(key)) {
      return memoMap.get(key);
    }

    console.log(`calculated with ${x}, ${y}`);
    // 어마무시한 계산
    const result = calculateFn(x, y);
    memoMap.set(key, result);
    return result;
  };
};

const calculator = memomization((x, y) => x + y);
console.log(calculator(1, 2)); // calculated with 1, 2 /n 3
console.log(calculator(1, 2)); // 3
console.log(calculator(3, 4)); // calculated with 3, 4 /n 7
```

## React

### useState

```jsx
const useState = <T>(initialValue?: T) => {
  let value = initialValue;

  const setValue = (to: T) => {
    value = to;

    // push current component to batch on react
    // for rerender component
  };

  return [value, setValue];
};
```

### useMemo

```tsx
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

불필요한 연산을 최소화해서 퍼포먼스를 올려야 할 때

### useCallback

```tsx
function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T;
```

특정한 dependecny가 바뀌었을 때만

## Appendix

[클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

[Closure | PoiemaWeb](https://poiemaweb.com/js-closure)

[자바스크립트의 스코프와 클로저 : TOAST Meetup](https://meetup.toast.com/posts/86)

[JavaScript 클로저(Closure)](https://hyunseob.github.io/2016/08/30/javascript-closure/)

react 관련

[How does React Hooks useCallback "freezes" the closure?](https://stackoverflow.com/questions/54577294/how-does-react-hooks-usecallback-freezes-the-closure)

[19. React.memo 를 사용한 컴포넌트 리렌더링 방지](https://react.vlpt.us/basic/19-React.memo.html)

---

## 질문들

### ES6부터 추가된 Class 형식의 경우도 내부 인자를 관리하는데 closure를 사용하는지??

[https://medium.com/engineering-livestream/javascript-classes-vs-closures-cf6d6c1473f](https://medium.com/engineering-livestream/javascript-classes-vs-closures-cf6d6c1473f)

The class pattern tends to perform better than the closure pattern.
내부적으로 다르게 동작할것 같기도?

### useMemo를 전부 사용하는지? 내부 값을 나중에 재할당 가능한지?
