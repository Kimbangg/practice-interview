# Javascript this

## 전역 공간에서의 this

- 전역공간에서의 this는 전역객체를 가리킵니다. (브라우저는 window, Node.js는 global)

```javascript
console.log(this);
console.log(window);
console.log(this === window);
```

![this01](https://user-images.githubusercontent.com/38618187/91383570-68751300-e867-11ea-8c41-0bf5b32bc830.png)

- 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.

![this02](https://user-images.githubusercontent.com/38618187/91383576-6ad76d00-e867-11ea-8bf8-a94e861f233e.png)

## 메서드와 함수에서의 this

- 함수 = 자체로 독립적인 기능을 수행
- 메서드 = 자신을 호출한 대상 객체에 관한 동작 수행
- 함수에서의 this = 전역객체
- 메서드에서의 this = 호출한 객체 ex) A.B에서 B함수 내부에서의 this는 A.

```javascript
var func = function(x) {
  console.log(this, x);
};

func(1);

var obj = {
  method: func,
};

obj.method(2);
```

![this03](https://user-images.githubusercontent.com/38618187/91383577-6b700380-e867-11ea-9b95-1d1feb2fd16d.png)

```javascript
// (1), (2), (3)에서의 this 는?

var obj1 = {
  outer: function() {
    console.log(this); // (1)
    var innerFunc = function() {
      console.log(this); // (2), (3)
    };
    innerFunc();

    var obj2 = {
      innerMethod: innerFunc,
    };

    obj2.innerMethod();
  },
};
obj1.outer();
```

//(1): obj1 (2): 전역객체, (3): obj2

### 생성자 함수 내부에서의 this

- 생성자 내부에서의 this는 곧 새로 만들어질 인스턴스 자신이 됩니다.

```javascript
var Cat = function(name, age) {
  this.name = name;
  this.age = age;
};

var cat = new Cat("나비", 1);
console.log(cat);
```

![this04](https://user-images.githubusercontent.com/38618187/91383579-6c089a00-e867-11ea-974a-f2ca2e9e8b27.png)

## 콜백 함수 호출 시 this

- 콜백함수의 제어권을 가지는 함수(메서드)가 콜백 함수에서의 this를 무엇으로 할지 결정합니다.

```javascript
setTimeout(function() {
  console.log(this);
}, 300);

[1, 2, 3, 4, 5].forEach(function(x) {
  console.log(this, x); // Window
});

document.body.innerHTML += `<button id="a">클릭</button>`;
document.body.querySelector("#a").addEventListener("click", function(e) {
  console.log(this); // button
});
```

## 메서드의 내부 함수에서 this를 우회하는 방법

```javascript
var obj = {
  var self = this;
  var func = function () {
    console.log(self);
  }
  func();
}
```

## Arrow function

- 화살표 함수는 this를 binding 하지 않고 상위 스코프의 this를 그대로 활용할 수 있습니다.

```javascript
var obj = {
  outer: function() {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc();
  },
};

obj.outer();
```

![this05](https://user-images.githubusercontent.com/38618187/91383580-6ca13080-e867-11ea-8bca-b3fb71502863.png)

### 명시적으로 this를 바인딩 하는 법

- Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

```javascript
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    func2.call(this, `param1`, `param2`);
  },
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

- Function.prototype.apply(thisArg, [argsArray])

```javascript
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    };
    func2.apply(this, [`param1`, `param2`]);
  },
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

- Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
- this.function = this.function.bind(this);

```javascript
var value = 100;
var myObj = {
  value: 1,
  func1: function() {
    console.log(`func1's this.value: ${this.value}`);

    var func2 = function(val1, val2) {
      console.log(`func2's this.value ${this.value} and ${val1} and ${val2}`);
    }.bind(this, `param1`, `param2`);
    func2();
  },
};

myObj.func1();
// console> func1's this.value: 1
// console> func2's this.value: 1 and param1 and param2
```

### 정리

- 명시적 this 바인딩이 없는 한 늘 성립하는 규칙
- 명시적 this 바인딩 규칙

### 출처

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

코어자바스크립트 책
