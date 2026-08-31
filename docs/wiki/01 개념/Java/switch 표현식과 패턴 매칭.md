---
type: concept
aliases: [switch 표현식, 패턴 매칭 switch, when, yield]
knowledge_type: practical-core
classification_reason: 여러 조건을 값으로 매핑하고 런타임 타입별 처리를 간결하게 작성하는 현대 Java 문법이다.
difficulty: 초급
status: growing
prerequisites: ["[instanceof와 타입 검사](</wiki/01%20%EA%B0%9C%EB%85%90/Java/instanceof%EC%99%80%20%ED%83%80%EC%9E%85%20%EA%B2%80%EC%82%AC>)", "[반환형과 return](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EB%B0%98%ED%99%98%ED%98%95%EA%B3%BC%20return>)"]
related: ["[변수의 종류와 생명주기](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EB%B3%80%EC%88%98%EC%9D%98%20%EC%A2%85%EB%A5%98%EC%99%80%20%EC%83%9D%EB%AA%85%EC%A3%BC%EA%B8%B0>)"]
sources: ["[2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)"]
created: 2026-08-31
updated: 2026-08-31
---

# switch 표현식과 패턴 매칭

## 한 문장 설명

`switch` 표현식은 분기 결과를 값으로 만들며, Java 21 이상의 패턴 매칭은 타입 검사와 변수 선언을 함께 수행할 수 있다.

## switch 표현식과 yield

```java
String result = switch (1) {
    case 1 -> {
        System.out.println("실행");
        yield "ONE";
    }
    default -> "ETC";
};
```

- `yield`는 현재 `switch` 표현식 블록의 결과값을 전달한다.
- `return`은 현재 메서드 전체를 종료한다.
- 화살표 오른쪽이 단일 표현식이면 `yield` 없이 바로 값을 적을 수 있다.

## 타입 패턴과 when

다음 예제는 Java 21 이상 기준이다.

```java
static String describe(Object obj) {
    return switch (obj) {
        case String s when s.isEmpty() -> "빈 문자열";
        case String s                  -> "문자열: " + s;
        case Integer i                 -> "정수: " + i;
        default                        -> "기타";
    };
}
```

`case String s`는 객체가 `String`인지 검사하고, 맞으면 그 분기 안에서 `s`로 사용한다. `when`은 타입이 맞은 뒤 추가 조건을 검사한다.

## 순서가 중요한 이유

`case String s when s.isEmpty()`처럼 구체적인 조건을 일반적인 `case String s`보다 먼저 둔다. 일반 분기가 앞에서 모든 String을 처리하면 뒤의 구체적인 분기에 도달할 수 없다.

## 흔한 실수

- 프로젝트의 Java 버전을 확인하지 않고 Java 21 문법을 사용한다.
- `yield`와 `return`의 종료 범위를 혼동한다.
- 모든 가능한 값에 결과를 제공하지 않아 `switch` 표현식을 완성하지 못한다.
- 타입 분기의 구체적인 조건과 일반 조건 순서를 뒤집는다.

## 실무에서는 어떻게 쓰이나

이벤트나 명령 객체의 타입별 결과를 값으로 만들 때 유용하다. 타입 분기가 계속 늘어난다면 다형성이나 설계 분리를 검토한다.

## 출처

- [2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)

