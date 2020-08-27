# Flux

## 1. Flux 패턴이란 무엇인가?

- 단방향 데이터 흐름
- 디스패처(Dispatcher), 스토어(Store), 뷰(View) 등 세 부분으로 구성
- 흐름은 디스패쳐 → 스토어 → 뷰 순서. 뷰에서 데이터 입력이 일어나면 액션을 전달하여 디스패처를 통해 변경이 이루어진다.
  ⇒ 뷰에서 데이터를 직접 변경할 수 없어 데이터 변경의 복잡도가 줄어든다.

## 2. 왜 Flux 패턴을 사용하는가?

- MVC 패턴의 문제를 해결하기 위해
- [MVC란?](https://kwonsye.github.io/study%20note/2019/03/03/mvc-pattern.html) 모델, 뷰, 컨트롤러로 구성된 패턴. 양방향 데이터 흐름.
  => MVC의 단점은?

      ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3549f33c-aeec-4cb9-9085-299ae9e5f3cc/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3549f33c-aeec-4cb9-9085-299ae9e5f3cc/Untitled.png)

      - 모델(데이터를 가지고 있음)이 렌더링을 하기 위해 뷰 레이어로 데이터를 보내고 뷰 레이어에서 데이터의 변경이 이루어지면 모델에 있는 데이터를 업데이트 해야 했다. 또한 의존성이 있는 데이터가 있다면 해당 모델이 다른 모델을 업데이트 해야 할 때도 있었다.

          ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1e35a16f-8225-4e51-af80-0b5feabb5092/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1e35a16f-8225-4e51-af80-0b5feabb5092/Untitled.png)

      - 이러한 변경들이 하나의 데이터가 변경 되었을 때 다수의 변경들이 일어나게 된다면 마구 섞여서 복잡도가 높아지게 된다.
      ⇒ 그래서 이러한 데이터의 흐름은 디버깅 하기 어려운 구조가 되버린다.
      - 대규모 어플리케이션인 경우(화면과 데이터의 복잡한 구조)에 위의 문제가 발생되고
       (페이스북의 안 읽은 글 갯수 표시. 사용자가 읽지 않았던 글을 읽으면 그만큼 숫자를 빼는 단순한 기능임에도, MVC로 구현하게 되었을때 모델별로 데이터를 가지고 있는게 달랐기 때문에 이것들을 싱크하거나 동시 업데이트 해야해서 매우 불편한 관계가 있었음)
      => 그래서 해결책으로 여러 패턴들(MVP, MVVM, Flux …) 중 단방향 데이터 흐름으로 선택하였다.

      위의 데이터 구조는 페이스북이 단순화 한 문서로 부터 모은 것이라고 합니다!
      사실은 더 더 매우 매우 복잡할 듯...

- 리액트의 단방향 데이터 흐름
  => 리액트에서는 부모 컴포넌트와 자식 컴포넌트간에 데이터를 전달할 수 있는데, 데이터를 전달할 때 부모에서 자식에게로만 데이터가 전달이 가능하다.
  이러한 단방향 데이터 흐름에서 부모-자식간의 교류가 아닌 컴포넌트간의 데이터 교류가 필요한 경우 글로벌 상태 관리를 하기 위해 상태 관리 라이브러리가 등장!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68157b72-cd8c-4aa5-95fd-7e1b3937d5ba/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68157b72-cd8c-4aa5-95fd-7e1b3937d5ba/Untitled.png)

## 3. Flux 패턴 용어 정리

- 뷰 : 액션 발생(액션 생성자를 통해 액션을 준비). 스토어에 데이터가 변경되면 스토어에서 데이터가 변경된 것을 뷰에 알려주고 다시 렌더링
- 액션 생성자 : 타입(type) 과 페이로드(payload) 를 포함한 액션을 생성
- 액션 : 액션 생성자를 통하여 만들어 진다. 스토어에 변경할 데이터를 가지고 있다.
- 디스패처 : 데이터 흐름을 관리하는 허브 역할. 액션이 발생하면 디스패처로 액션 객체 전달되고 디스패처에서 등록된 콜백함수를 통해 스토어에 전달. ⇒ 액션을 스토어에 전달. 동기적으로 실행된다.
- 스토어 : 상태 저장소. 무조건 디스패처를 통해 액션을 보내야만 데이터 변경이 가능하다.

[https://t1.daumcdn.net/cfile/tistory/995759505B5BDFFC0C?download](https://t1.daumcdn.net/cfile/tistory/995759505B5BDFFC0C?download)

## 4. Flux 패턴을 사용한 예제

flux 패턴을 사용한 react의 context API 예시입니다.

⇒ 부모-자식 간의 데이터 공유가 아닌 자식-자식. 즉 컴포넌트 간의 데이터 공유를 할 수 있도록 해준다.
전역적(global)으로 데이터 관리가 가능해진다. (예시로 로그인, 테마 관련 데이터 등. 하나의 데이터가 여러 컴포넌트에서 사용되는 경우에 주로 사용된다.)

- props를 이용한 데이터 흐름

```javascript
// Button 컴포넌트에서 theme 데이터를 쓰는 경우 - props로 넘겨주기

// App.js
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

// Toolbar.js
// 중간 컴포넌트가 데이터를 넘겨줘야 한다.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

// Button.js
class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

- context를 이용한 데이터 흐름

```javascript
  // context api를 사용하여 Button 컴포넌트에서 전역상태 사용하기
  const ThemeContext = React.createContext('light');

  // App.js
  class App extends React.Component {
    render() {
      // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
      // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
      // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
      return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
  }

  // Toolbar.js
  // 중간 컴포넌트가 일일이 테마를 넘겨줄 필요가 없다.
  function Toolbar() {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }

  // Button.js
  class ThemedButton extends React.Component {
    // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
    // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
    // 이 예시에서 현재 선택된 테마는 dark입니다.
    static contextType = ThemeContext;

    function onThemeChange() {
  		dispatch({
  	    type: 'COLOR_CHANGE',
  			payload: ,'white'
  		})
    }

    render() {
      return <Button theme={this.context} onClick={this.onThemeChange} />;
    }
  }
```

- context api를 사용하면 컴포넌트의 재사용이 어렵다.
  ⇒ 재사용이 어려운 경우에는 리액트에서 [컴포넌트 합성](https://ko.reactjs.org/docs/composition-vs-inheritance.html)을 추천한다.

## 참고

- [리액트 데이터 흐름 참고
- Redux 사용하기전 알아야할 Flux 개념](https://medium.com/hivelab-dev/react-js-tutorial-part1-c632e34fc32)
  [- F](https://lemontia.tistory.com/637)[lux docs -](https://facebook.github.io/flux/docs/in-depth-overview) [Redux](https://blog.naver.com/backsajang420/221368106022)
- [상태 관리 라이브러리의 미학: Redux 또는 MobX 를 통한 상태 관리](https://velog.io/@velopert/redux-or-mobx)
- [react context](https://ko.reactjs.org/docs/context.html#gatsby-focus-wrapper)
- [velopert의 MVC vs Flux](https://www.youtube.com/watch?v=LRUQfJLuPA8)
