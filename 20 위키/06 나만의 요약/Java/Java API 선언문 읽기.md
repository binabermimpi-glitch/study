---
type: personal-summary
subject: Java
knowledge_type: practical-core
classification_reason: Java API의 복잡한 메서드 선언을 입력과 반환의 흐름으로 읽기 위한 개인 요약이다.
difficulty: 초급
status: growing
created: 2026-09-14
updated: 2026-09-14
---

# Java API 선언문 읽기

## 1. 메서드 선언문 읽는 순서

```java
public String convert(int number)
```

1. 괄호 바로 앞: 메서드 이름
2. 괄호 안: 매개변수
3. 메서드 이름 왼쪽: 반환 타입
4. 가장 앞: 접근제어자

```text
메서드 이름: convert
받는 값: int number
반환 결과: String
접근 범위: public
```

> `convert()`는 `int` 값을 하나 받아 `String`을 반환하는 공개 메서드다.

타입 흐름은 `int → String`이다.

```java
public T getValue()
```

`T`는 아직 구체적으로 정하지 않은 타입이다. String, Integer, Student 등이 될 수 있다.

```java
public Optional<T> findValue()
```

Optional은 T 타입의 값이 있을 수도 있고 없을 수도 있는 상자다.

## 2. 함수형 인터페이스가 매개변수인 경우

```java
public boolean check(Function<String, Integer> mapper)
```

두 층으로 나누어 읽는다.

```text
check 메서드: Function을 받음 → boolean 반환
mapper 함수: String을 받음 → Integer 반환
```

Function에서 T는 받는 타입이고 R은 반환 타입이다. 바깥 메서드의 반환 타입과 Function 내부의 반환 타입은 서로 다를 수 있다.

## 3. 람다를 변수에 대입한다는 의미

```java
Function<String, Integer> mapper =
        text -> text.length();
```

오른쪽 람다는 실행 결과가 아니라 아직 실행하지 않은 기능이다.

> 나중에 문자열 하나를 받으면 문자열 길이를 반환하겠다.

익명 구현 객체로 풀면 다음과 같다.

```java
Function<String, Integer> mapper =
    new Function<String, Integer>() {
        @Override
        public Integer apply(String text) {
            return text.length();
        }
    };
```

대입하는 순간에는 실행되지 않는다.

```java
Integer result = mapper.apply("Java");
```

```text
text -> text.length() → 기능 만들기
mapper = 람다         → 기능 저장하기
mapper.apply("Java")  → 기능 실행하기
4                     → 실행 결과
```

## 4. 주요 함수형 인터페이스

### Function

```java
Function<String, Integer> length = text -> text.length();
Integer result = length.apply("Java");
```

- 입력: T
- 반환: R
- 실행 메서드: `apply()`
- 역할: 값을 다른 값으로 변환

### Predicate

```java
Predicate<Integer> even = number -> number % 2 == 0;
boolean result = even.test(6);
```

- 입력: T
- 반환: boolean
- 실행 메서드: `test()`
- 역할: 조건 검사

### Consumer

```java
Consumer<String> printer = text -> System.out.println(text);
printer.accept("Java");
```

- 입력: T
- 반환: 없음(void)
- 실행 메서드: `accept()`
- 역할: 값을 출력하거나 사용

### Supplier

```java
Supplier<Integer> numberMaker = () -> 100;
Integer result = numberMaker.get();
```

- 입력: 없음
- 반환: T
- 실행 메서드: `get()`
- 역할: 값을 제공

Supplier에서 Integer는 입력 타입이 아니라 반환 타입이다.

| 함수형 인터페이스 | 입력 | 반환 | 실행 메서드 | 역할 |
|---|---|---|---|---|
| `Function<T,R>` | 있음 | 있음 | `apply()` | 변환 |
| `Predicate<T>` | 있음 | `boolean` | `test()` | 조건 검사 |
| `Consumer<T>` | 있음 | `void` | `accept()` | 값 사용 |
| `Supplier<T>` | 없음 | 있음 | `get()` | 값 제공 |

```text
Function  : 넣고 → 바꿔서 받는다
Predicate : 넣고 → true/false를 받는다
Consumer  : 넣고 → 반환 없이 끝난다
Supplier  : 안 넣고 → 값을 받는다
```

## 5. 와일드카드 ?

```java
List<?>
```

리스트인 것은 알지만 요소의 정확한 타입은 모른다는 뜻이다. String 목록, Integer 목록, Student 목록 등을 받을 수 있다.

```java
Object value = list.get(0);
```

`?`는 아무 값이나 넣을 수 있다는 뜻이 아니라 정확한 타입을 모른다는 뜻이다.

## 6. ? extends Number

```java
List<? extends Number>
```

정확한 타입은 모르지만 Number 또는 Number의 자식 타입이다. Number, Integer, Double, Long 목록 등이 가능하다.

```java
Number value = list.get(0);
```

꺼낼 때 Number로 받을 수 있지만 Integer로 단정할 수 없다. 실제 타입을 모르므로 값을 추가하는 것도 일반적으로 불가능하다.

```text
? extends Number
꺼내기: Number로 가능
추가하기: 일반적으로 불가능
```

## 7. ? super Integer

```java
List<? super Integer>
```

정확한 타입은 모르지만 Integer 또는 Integer의 부모 타입이다. Integer, Number, Object 목록이 가능하며 Double 목록은 불가능하다.

```java
list.add(10);          // 가능
Object value = list.get(0); // 안전
```

Integer는 안전하게 추가할 수 있지만 꺼낼 때는 Object로 받는다.

```text
? super Integer
추가하기: Integer 가능
꺼내기: Object로 가능
```

## 8. extends와 super 비교

| 선언 | 의미 | 안전한 작업 |
|---|---|---|
| `? extends Number` | Number 또는 자식 중 하나 | Number로 꺼내기 |
| `? super Integer` | Integer 또는 부모 중 하나 | Integer 넣기 |
| `?` | 정확한 타입을 모름 | Object로 꺼내기 |

```text
PECS
Producer Extends
Consumer Super
```

## 9. Function 안의 와일드카드

```java
Function<? super Integer, String> mapper
```

Function의 입력과 출력으로 나누면 Integer를 처리할 수 있고 String을 반환하는 함수다. 입력 자리에 Integer, Number 또는 Object가 오는 함수가 가능하다.

```java
Function<String, ? extends Number> mapper
```

String을 받고 Number와 호환되는 결과를 반환한다. 출력 자리에 Integer, Double 또는 Number가 오는 함수가 가능하다.

## 10. Optional.flatMap() 선언문 읽기

```java
public <U> Optional<U> flatMap(
    Function<? super T,
             ? extends Optional<? extends U>> mapper
)
```

먼저 바깥부터 분리한다.

```text
public      → 다른 클래스에서도 호출 가능
<U>         → 메서드에서 사용할 타입 U 선언
Optional<U> → 메서드 반환 타입
flatMap     → 메서드 이름
(...)       → 매개변수
```

매개변수의 가장 바깥 타입은 Function이며 첫 번째 자리는 입력, 두 번째 자리는 출력이다.

```text
입력: ? super T
출력: ? extends Optional<? extends U>
```

현재 단계에서는 다음처럼 읽는다.

> T를 처리할 수 있고 U를 담은 Optional과 호환되는 결과를 반환하는 함수를 받아 최종적으로 U를 담은 Optional을 반환하는 메서드다.

와일드카드를 제거한 핵심 형태는 다음과 같다.

```java
Optional<U> flatMap(Function<T, Optional<U>> mapper)
```

```text
mapper 함수: T → Optional<U>
flatMap 결과: Optional<U>

map()     : T → U인 함수를 받음
flatMap() : T → Optional<U>인 함수를 받음
```

`flatMap()`은 Optional이 두 겹이 되는 것을 방지한다.

```java
Optional<String> value = Optional.of("123");

Optional<Integer> result =
        value.flatMap(
            text -> Optional.of(Integer.parseInt(text))
        );
```

```text
T = String
U = Integer

String → Optional<Integer> → 최종 결과 Optional<Integer>
```
