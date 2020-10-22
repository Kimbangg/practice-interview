# 프로토타입 기반 프로그래밍 - 전은정

> Prototype-based programming is a style of object-oriented programming in which classes are not explicitly defined, but rather derived by adding properties and methods to an instance of another class or, less frequently, adding them to an empty object.

## 질문 있습니다

내가 만든 것도 아닌데 이런 놈들은 대체 어디서, 어떻게 나오는거야?

```javascript
const arr = [1, 2, 3];
arr.slice();

const str = "jenny";
str.toUpperCase();

const now = new Date();
now.getDate();

function run() {}
run.bind(this);
```

바로 이 놈들이 가지고 있지!

```javascript
Array().__proto__;

String().__proto__;

Date().__proto__;

Function().__proto__;

Object().__proto__;
```

> Each object has a private property which holds a link to another object called its prototype.
>
> Prototypes are the mechanism by which JavaScript objects inherit features from one another.

## 객체 리터럴에서 ES6 Class 까지

구석기시대: 사람 여러 명을 한 땀 한 땀 만들자

```javascript
const jenny = {};
jenny.sleepy = true;
jenny.eat = function() {
  console.log("냠냠");
};
```

```javascript
const jhaemin = {};
jhaemin.sleepy = true;
jhaemin.eat = function() {
  console.log("냠냠");
};

const agrajak = {};
agrajak.sleepy = true;
agrajak.eat = function() {
  console.log("냠냠");
};
```

> 뭐야! 이름만 바뀌고 계속 똑같잖아?

청동기시대: 아니 너무 노동집약적이야, 템플릿을 만들어보자

```javascript
function createHuman(name, isSleepy) {
  let human = {};
  human.name = name;
  human.sleepy = isSleepy;

  human.eat = function() {
    console.log("냠냠");
  };

  return human;
}

const jenny = createHuman("jenny", true);
const jhaemin = createHuman("jhaemin", true);
const agrajak = createHuman("agrajak", true);
```

> 뭐야! eat 함수는 바뀌지도 않는데 계속 만들어지잖아?

철기시대: 모든 인간이 같이 사용하는 기능을 따로 모아서 보관해보자

```javascript
const humanMethods = {
  eat: function() {
    console.log("냠냠");
  },
};

function createHuman(name, isSleepy) {
  let human = {};
  human.name = name;
  human.sleepy = isSleepy;

  human.eat = humanMethods.eat;

  return human;
}
```

> 뭐야! 새로운 메서드가 생기면 보관함에도 넣어주고 템플릿에도 넣어줘야 하잖아?

고대사회: 귀찮아! 모아둔 기능과 인간을 아예 연결시켜두자

```javascript
const humanMethods = {
  eat: function() {
    console.log("냠냠");
  },
};

function createHuman(name, isSleepy) {
  let human = Object.create(humanMethods);
  human.name = name;
  human.sleepy = isSleepy;

  human.eat = humanMethods.eat;

  return human;
}
```

> 뭐야! createHuman 이랑 humanMethods 가 따로 분리되어 있을 필요가 없을 거 같네

```javascript
// 참고 Object.create() : 첫 번째 인자로 들어온 객체를 기반으로 하는 새로운 객체를 생성한다.

const parent = {
  name='Stacey',
  age: 35,
  heritage: 'Irish'
}

const child = Object.create(parent)
child.name = 'Ryan'
child.age = 7

child
console.log(child.heritage)

```

중세사회 ( **Prototype 의 등장! 두둥** ) : 에잇 따로 모아뒀던 기능들이랑 템플릿을 아예 엮어버리자

> Prototype 은 함수가 갖고 있는 Property 라네, 메모리를 아낄 수 있지

```javascript
// humanMethods 의 모든 메서드들을 createHuman 함수의 property 인 prototype 에 집어넣자!

function createHuman(name, isSleepy) {
  let human = Object.create(createHuman.prototype); // 별표
  human.name = name;
  human.sleepy = isSleepy;

  return human; // 별표
}

createHuman.prototype.eat = function() {
  console.log("냠냠");
};
```

> 뭐야! let human = Object.create(humanMethods) 하고 return human 부분은 다른 객체를 만들 때도 똑같이 해줘야 하잖아?

```javascript
// 참고: class 가 익숙한 당신을 위해

// 각 객체마다 공통된 메서드를 집어넣는 것은 아래와 같이 class 문법에서 constructor 내에 메서드를 넣어주는 것과 같아요.

class Human(){
  constructor(name){
    this.name = name

    func(){console.log('function in Human class')}
  }
}

const human1 = new Human('human1')
const human2 = new Human('human2')

human1.func === human2.func // false

// prototype 을 사용하는 것은 아래와 같아요.

class EfficientHuman(){
  constructor(name){
    this.name = name
  }

  func(){console.log('function in EfficientHuman class')}
}

const human3 = new EfficientHuman('human3')
const human4 = new EfficientHuman('human4')

human3.func === human4.func // false

```

근대사회 ( **new 키워드의 등장** ): 템플릿마다 같은 일은 하니까 자동화시켜버리자!

[참고: 생성자 함수 동작 방식](https://poiemaweb.com/js-this#31-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98-%EB%8F%99%EC%9E%91-%EB%B0%A9%EC%8B%9D)

```javascript
function Human(name, isSleepy) {
  // let this = Object.create(Human.prototype)
  this.name = name;
  this.sleepy = isSleepy;
  // return this
}
```

바쁘다바빠 현대사회 ( **class 키워드의 등장** )

```javascript
class Animal {
  constructor(name, isSleepy) {
    this.name = name;
    this.isSleepy = isSleepy;
  }

  eat() {
    console.log("냠냠");
  }
}
```

## Prototype-based & Class-based 같이 보기

```javascript
// prototype-based

function HumanFunc(name) {
  this.name = name;
}

HumanFunc.prototype;

const jenny = new HumanFunc("jenny");

jenny.__proto__;

HumanFunc.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

HumanFunc.prototype;
jenny.__proto__;
jenny.eat();
```

```javascript
// class-based

class HumanClass {
  constructor(name) {
    this.name = name;
  }
}

HumanClass.prototype;

const jenny = new HumanClass("jenny");

jenny.__proto__;

HumanClass.prototype;

HumanClass.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

HumanClass.prototype;
jenny.__proto__;
jenny.eat();
```

## Inheritance & Protytype chain

```javascript
// class-based
class Human {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`I'm ${this.name}`);
  }
}

class RegularEmployee extends Human {
  constructor(name) {
    super(name);
  }

  work() {
    console.log(`${this.name} is 월급루팡`);
  }
}

class Intern extends Human {
  constructor(name, isTransitionable) {
    super(name);

    this.isTransitionable = isTransitionable;
  }

  work() {
    console.log(`${this.name} is working hard`);
  }
}
```

```javascript
// prototype-based

function Human(name) {
  this.name = name
}

Human.prototype.greet = function(){console.log(`I'm ${this.name}`)}

function RegularEmployee(name){
  // call() 함수의 첫번째 매개변수는 다른 곳에서 정의된 함수를 현재 컨텍스트에서 실행할 수 있도록 합니다.
  Human.call(this, name)
}

const jhaemin = new RegularEmployee('jhaemin')
jhaein.greet() // Error!

RegularEmployee.prototype = Object.create(Person.prototype)
RegularEmployee.prototype.constructor = RegularEmployee

function Intern(name, isTransitionable){
  Human.call(this, name)

  this.isTransitionable = isTransitionable
}

const jenny = new Intern('jenny', undefined){
  Human.call(this, name)

  this.isTransitionable = isTransitionable
}

jenny.greet() // Error!

Intern.prototype = Object.create(Human.prototype)
// Intern.prototype.play = function() {console.log(`Intern ${this.name} is unable to play`)}

// prototype 객체는 constructor 프로퍼티를 갖는데, 객체의 입장에서 자신을 생성한 객체를 가리킨다. // 아직 잘 모름..
Intern.prototype.constructor = Intern

```

### 보너스: 이런 것도 된다 ㅋㅋ

```javascript
function Human(name) {
  this.name = name;
}

Human.prototype = Object.create(Array.prototype);
Human.prototype.slice = function() {
  console.log(`slicing ${this.name}?!`);
};

const jenny = new Human("jenny");
jenny.slice(); // slicing jenny?!
jenny.splice(); // []
```

[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object-oriented_JS](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object-oriented_JS)

[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[https://poiemaweb.com/js-prototype](https://poiemaweb.com/js-prototype)

[https://www.youtube.com/watch?v=XskMWBXNbp0](https://www.youtube.com/watch?v=XskMWBXNbp0)

[https://www.youtube.com/watch?v=MiKdRJc4ooE](https://www.youtube.com/watch?v=MiKdRJc4ooE)
