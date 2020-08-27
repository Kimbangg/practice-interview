# Polyfill

> :충전솜 이란 의미를 가진 폴리필에 대해 알아봅시다.

Polyfill, Shims, Fallback이란 용어들이 있습니다.

이 용어들 각각은 틀려도 사실 브라우저별로 다름없는 기능 구현이 목적입니다.

즉, 크로스 브라우징을 염두한 것입니다.

브라우저에서 지원하지 않는 코드를 사용가능한 코드 조각이나 플러그인(추가기능)을 의미합니다.

웹에서는 어떤 브라우저 API가 공식 발표되면, 그 API를 해당 브라우저들이 실시간으로 구현하지 못합니다.

그러므로 각각 브라우저의 우선순위에 따라 지원하고, 지원하지 않고가 갈리게 됩니다.

예를 들어 크롬은 지원하는데 IE는 지원안하고, 버전 몇 부터 지원하고 이런 식입니다.

그래서 흔히 말하는 api landscape가 형성됩니다.

(지원하고 지원하지 않고가 마치 실제 지형처럼 울퉁불퉁하기 때문입니다.)

![fetch 지원](https://user-images.githubusercontent.com/38618187/90769716-a7690d00-e32b-11ea-861a-0ac7d830ccc6.png)

[can i use](https://caniuse.com/#home)

## babel

babel은 자바스크립트 컴파일러 입니다. (입력은 자바스크립트 코드고 출력도 자바스크립트 코드)

최신 버전의 자바스크립트 문법은 브라우저가 이해하지 못하기 때문에 babel이 브라우저가 이해할 수 있는 문법으로 변환해준다. (ES6, ES7 등의 최신 문법을 사용해서 코딩을 할 수 있게 만들어줌)

바벨은 ESNext 에서 지원하는 문법을 ES5 문법으로 번역해주지만, ES5에 존재하지 않는 ES6의 Map, Promise, Set, Object.assigin() 이런 문법들은 존재하지를 않으니 번역을 해줄수가 없습니다.

그래서 이를 매꾸기 위해 polyfill 을 사용한다. (Map, Promise, Set 등을 사용가능한 객체로 만들어준다)

babel 은 babel-polyfill 모듈을 사용하면 되지만, 현재 deprecated(비추천) 상태입니다.

따라서 core-js와 regenerator-runtime을 직접 사용하는 방식을 제안하고 있습니다.

현대 브라우저는 대부분 표준 시맨틱에 따라 광범위한 API 세트를 구현하기 때문에 poly fill을 사용하여 브라우저 별 구현을 처리하는 것은 오늘날 실제로 존재하지 않습니다.

## 인터넷 익스플로러

[대한민국 브라우저 점유율](https://gs.statcounter.com/browser-market-share/all/south-korea)

![점유율](https://user-images.githubusercontent.com/38618187/90769118-aedbe680-e32a-11ea-90fb-0d5ec9f86783.png)

2020년 7월을 기준으로 인터넷 익스플로러의 점유율은 6.78%입니다.

이는 웨일, 엣지 브라우저 보다 많은데요

다양한 사용자가 많이 분포하고 있는 대기업에서는 IE를 지원해야 하는 것도 중요한 이슈중 하나입니다.

## 옛날옛적 이야기

앞서 말했듯이 polly fill 은 브라우저가 다른 방식으로 동일한 기능을 구현하는 문제를 해결하는 데 사용됩니다.

특정 브라우저에서 비표준 기능을 사용하여 JavaScript에 기능에 액세스 할 수있는 방법을 제공합니다.

이러한 이유는 (오늘날 매우 드물지만) 각 브라우저가 Javascript를 매우 다르게 구현 한 IE6, Netscape 및 NNav 시대에 특히 널리 퍼졌습니다.

JQuery의 첫번째 버전은 폴리 필의 초기 예입니다.

JavaScript 개발자는 모든 브라우저에서 작동하는 단일 공통 API를 가질 수 있도록 기본적으로 브라우저 별 해결 방법을 편집 한 것입니다.

## 예시

### React에서 Explorer 지원하기

#### react-app-polyfill

리엑트 개발에서 사용하는 다양한 문법을 변환해주는 라이브러리입니다.

Promise, window.fetch, Symbol, Object.assign, Array.from + [ IE9 Map, Set ]

와 같은 필요한 것만 포함하고 있어 사이즈가 작아 가벼운 게 특징이라 하네요.

```bash
npm i react-app-polyfill
yarn add react-app-polyfill
```

설치 후에 src/index.jsx 등 entry point에 다음과 같이 선언해줍니다.

```javascript
// IE9의 경우
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

// IE11의 경우
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```

stable은 package.json의 browserslist에 해당하는 브라우저에 대해 안정적인 코드를 사용할 수 있게 합니다.

간혹 적용되지 않는 경우 node_modules/.cache 폴더 삭제하고 다시 실행해보세요.

#### @babel/polyfill

This will emulate a full ES2015+ environment (no < Stage 4 proposals) and is intended to be used in an application rather than a library/tool. (this polyfill is automatically loaded when using babel-node).

This means you can use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign, instance methods like Array.prototype.includes, and generator functions (provided you use the regenerator plugin). The polyfill adds to the global scope as well as native prototypes like String in order to do this.

쉽게 말하면 Promise, WeakMap, Array.from 등등을 사용할 수 있습니다.

```bash
npm install core-js regenerator-runtime
yarn add core-js regenerator-runtime
```

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
```

### canvas.toBlob

[MDN canvas.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

canvas.toBlob() 매소드는 polyfill이 실제 많이 활용되는 좋은 예입니다. canvas.toBlob() 매소드는 캔버스를 브라우저의 blob 객체로 만들어주는데, 기실 이게 잘만 활용되면 html을 기존 방법보다 더 쉽게 브라우저단에서 이미지화할 수 있습니다.

그러나 이 좋은 매소드가 파이어폭스와 IE 최신버전에서만 지원됩니다. 그러니 사람들이 가만히 있을리가 없습니다. canvas.toBlob() polyfill을 만들어서 배포하기 시작했고, 이제 크롬에서, 사파리에서 개발하시는 분들은 이 js파일 하나만 index.html에 포함시키면, 마치 원래 그 기능이 있었던 것처럼 "조용하게" 채워지는 polyfill의 위력을 감상하실 수 있게 됩니다.

### Array.from

[MDN Array.from](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

if (!Array.from) 를 이용해 현재 브라우저에서 Array.from 여부를 판단한다.
Array의 slice 메소드를 빌려와 대상 object에 적용시킨다.

```javascript
if (!Array.from) {
  Array.from = function(object) {
    "use strict";
    return [].slice.call(object);
  };
}
```

실제 MDN의 polyfill 코드는 다음과 같습니다.

```javascript
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] =
            typeof T === "undefined"
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  })();
}
```
