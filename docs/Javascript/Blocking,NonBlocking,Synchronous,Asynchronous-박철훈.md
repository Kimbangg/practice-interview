# Blocking-NonBlocking-Synchronous-Asynchronous

블로킹, 논블로킹, 동기, 비동기에 대해서 알아보자.

## IBM developerWorks의 2:2 매트릭스

![https://www.ibm.com/developerworks/library/l-async/figure1.gif](https://www.ibm.com/developerworks/library/l-async/figure1.gif)

한 눈에 볼 수 있는 도표로는 위의 IBM developerWorks 매트릭스가 있다. 이걸 보고 파악이 다 되었다면 이제 이 화면을 끄면 된다 ^^ 하지만 좀더 자세하게 알아보도록 하자!

## 좀더 알아보자

우리가 흔히 알고 있는 동기, 비동기는 사실 아래처럼 블로킹 + 동기, 논블로킹 + 비동기 인 경우가 많다.

![http://i.imgur.com/iSafBIF.png](https://www.notion.so/image/http%3A%2F%2Fi.imgur.com%2FiSafBIF.png?table=block&id=608c4f9e-b086-4887-aaef-bcf527493cae&userId=&cache=v2)

그래서 그 예시로는 아래와 같다.

![http://i.imgur.com/06P0Q6m.png](https://www.notion.so/image/http%3A%2F%2Fi.imgur.com%2F06P0Q6m.png?table=block&id=0dc204d9-2514-4c04-8a7a-b1ff9bca3f45&width=3580&userId=&cache=v2)

하지만 다른 조합들도 존재한다.

즉 **블로킹 + 비동기, 논블로킹 + 동기** 라는게 존재하는 것이다.

## Blocking / NonBlocking

> Blocking / NonBlocking은 호출 되는 함수가 바로 제어권을 돌려주느냐가 주된 관심사이다.

호출된 함수가 바로 리턴해서 호출한 함수에게 제어권을 넘겨주고, 호출된 함수가 다른 일을 할 수 있는 기회를 준다면 NonBlocking이다. 아니면 Blocking이다.

## Synchronous / Asynchronous

> Synchronous / Asynchronous는 호출되는 함수의 작업 완료 여부를 누가 신경 쓰느냐가 주된 관심사이다.

호출되는 함수에게 callback을 전달해서 호출되는 함수의 작업이 완료되면 호출되는 함수가 전달받은 callback을 실행하고, 호출하는 함수는 작업 완료 여부를 신경쓰지 않으면 Asynchronous이다.

개인적으로는 호출하는 함수에게 호출당한 함수가 실행이 종료되고 나서 자신의 결과 값을 호출한 함수에게 바로 알려주는 것이 동기이지 않을까 생각한다. 그러면 상태의 동기화가 어느정도는 이루어질 수 있다고 생각하기 때문이다.

이제 다른 조합들도 알아보자

## NonBlocking-Sync

NonBlocking-Sync는 호출되는 함수는 바로 리턴하고, 호출하는 함수는 작업 완료 여부를 신경쓰는 것이다. 신경쓰는 방법이 기다리거나 물어보거나 두 가지가 있었는데 NonBlocking 함수를 호출했다면 사실 기다릴 필요는 없고 물어보는 일이 남는다.

즉 NonBlocking 메서드 호출 후 바로 반환 받아서 다른 작업을 할 수 있게 되지만, 메서드 호출에 의해 수행되는 작업이 완료된 것은 아니며, 호출하는 메서드가 호출되는 메서드 쪽에 작업 완료 여부를 계속 문의한다.

![http://i.imgur.com/a8xZ9No.png](https://www.notion.so/image/http%3A%2F%2Fi.imgur.com%2Fa8xZ9No.png?table=block&id=8ab7a163-5980-4898-8ef1-9c6f6b6f5649&userId=&cache=v2)

```javascript
Future ft = asyncFileChannel.read(~~~);

while(!ft.isDone()) {
    // isDone()은 asyncChannle.read() 작업이 완료되지 않았다면 false를 바로 리턴해준다.
    // isDone()은 물어보면 대답을 해줄 뿐 작업 완료를 스스로 신경쓰지 않고,
    //     isDone()을 호출하는 쪽에서 계속 isDone()을 호출하면서 작업 완료를 신경쓴다.
    // asyncChannle.read()이 완료되지 않아도 여기에서 다른 작업 수행 가능
}

// 작업이 완료되면 작업 결과에 따른 다른 작업 처리

참고해볼 글 : <https://javacan.tistory.com/entry/134>
```

ajax는 조금 경우가 다르긴 하지만 유사한 느낌이라 생각한다.

[https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started)

```text
An EventHandler that is called whenever the readyState attribute changes.
The callback is called from the user interface thread.
The XMLHttpRequest.onreadystatechange property contains the event handler
to be called when the readystatechange event is fired,
that is every time the readyState property of the XMLHttpRequest changes.

더 자세히는
<https://xhr.spec.whatwg.org/#handler-xhr-onreadystatechange> 참고
```

잦은 ajax 호출을 보완하기 위한 롱풀링 기법

## Blocking-Async

호출되는 함수가 바로 리턴하지 않고, 호출하는 함수는 작업 완료 여부를 신경쓰지 않는 것이다.

![http://i.imgur.com/zKF0CgK.png](https://www.notion.so/image/http%3A%2F%2Fi.imgur.com%2FzKF0CgK.png?table=block&id=83c0b63a-6b07-4d8a-8be6-f60bf178ad3c&userId=&cache=v2)

**Blocking-Async의 대표적인 케이스가 Node.js와 MySQL의 조합**이라고 한다.

Node.js 쪽에서 callback 지옥을 헤치면서 Async로 전진해와도, 결국 DB 작업 호출 시에는 MySQL에서 제공하는 드라이버를 호출하게 되는데, 이 드라이버가 Blocking 방식이라고 한다.

이건 사실 Node.js 뿐아니라 Java의 JDBC도 마찬가지다. 다만 Node.js가 싱글 쓰레드 루프 기반이라 멀티 쓰레드 기반인 Java의 Servlet 컨테이너보다 문제가 더 두드러져 보일 뿐, Blocking-Async라는 근본 원인은 같다.

```cpp
#include <time.h>

void delay(double dly){
    /* save start time */
    const time_t start = time(NULL);

    time_t current;
    do{
        /* get current time */
        time(&current);

        /* break loop when the requested number of seconds have elapsed */
    }while(difftime(current, start) < dly);
}

int main() {
  printf("Sleeping for 10 second.\n");
  delay(10.0);
  return 0;
}

// https://stackoverflow.com/questions/3930363/implement-time-delay-in-c
```

## 정리

- **Blocking/NonBlocking은 호출되는 함수가 바로 리턴하느냐 마느냐가 관심사**
  - 바로 리턴하지 않으면 Blocking
  - 바로 리턴하면 NonBlocking
- **Synchronous/Asynchronous는 호출되는 함수의 작업 완료 여부를 누가 신경쓰냐가 관심사**
  - 호출되는 함수의 작업 완료를 호출한 함수가 신경쓰면 Synchronous
  - 호출되는 함수의 작업 완료를 호출된 함수가 신경쓰면 Asynchronous
- 성능과 자원의 효율적 사용 관점에서 가장 유리한 모델은 Async-NonBlocking 모델이다.

![http://i.imgur.com/gKDoKbs.png](https://www.notion.so/image/http%3A%2F%2Fi.imgur.com%2FgKDoKbs.png?table=block&id=4e4148cc-3484-4a3f-9b82-bd41eb724bb2&userId=&cache=v2)

출처 : [https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/](https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/)

참고자료

[https://dev.to/nikhilkumaran/web-workers-for-non-blocking-user-interface-i1a](https://dev.to/nikhilkumaran/web-workers-for-non-blocking-user-interface-i1a)

[https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started)

[https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/basic_usage](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/basic_usage)

---

## 질문

### ajax는 논블락 어싱크인가요

```javascript
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  // 이상 없음, 응답 받았음
} else {
  // 아직 준비되지 않음
}
```

[MDN - web worker](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/basic_usage)

[web worker 재미잇는 예제](https://dev.to/nikhilkumaran/web-workers-for-non-blocking-user-interface-i1a)
