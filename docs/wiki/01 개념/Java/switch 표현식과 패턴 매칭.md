---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 6
prerequisites: []
related: []
sources:
  - "[2026-08-31 Java 배열 반복문 패턴 매칭 복습](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)"
  - "[2026-09-14 자바 상속과 다형성 핵심 정리](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-09-14%20%EC%9E%90%EB%B0%94%20%EC%83%81%EC%86%8D%EA%B3%BC%20%EB%8B%A4%ED%98%95%EC%84%B1%20%ED%95%B5%EC%8B%AC%20%EC%A0%95%EB%A6%AC>)"
created: 2026-10-10
updated: 2026-10-10
---

# switch 표현식과 패턴 매칭

## 2026-08-31 Java 배열 반복문 패턴 매칭 복습

### 13. 패턴 매칭 switch

```java
Object obj = "monkey";

switch (obj) {
    case Integer i ->
        System.out.println(i);

    case String s ->
        System.out.println(s);

    default ->
        System.out.println("기타");
}
```

여기서:

```java
case String s
```

뜻:

```text
obj가 String 객체인가?
        ↓
       맞음
        ↓
String 변수 s로 사용
```

즉 `case String s`는

```text
타입 검사 + 변수 생성
```

을 동시에 하는 것이라고 이해하면 된다.

---


### 14. switch의 when

```java
case String s when s.isEmpty() ->
```

실행 순서:

```text
① obj가 String인가?
        ↓
② String이면 s라는 변수로 받음
        ↓
③ s.isEmpty() 실행
        ↓
④ true이면 해당 case 실행
```

예:

```java
Object obj = "";
```

이면:

```text
String인가? → true

s = ""

s.isEmpty() → true

case 실행
```

하지만:

```java
Object obj = "monkey";
```

이면:

```text
String인가? → true

s = "monkey"

s.isEmpty() → false

다음 case로 이동
```

그래서 보통:

```java
case String s when s.isEmpty() -> ...
case String s -> ...
```

순서로 작성한다.

구체적인 조건을 먼저 써야 한다.

---


### 15. switch에서 yield와 return

#### yield

```java
String result = switch (num) {
    case 1 -> {
        System.out.println("실행");
        yield "ONE";
    }
    default -> "ETC";
};
```

`yield "ONE"`은:

```text
switch의 결과값을 ONE으로 결정
        ↓
result = "ONE"
```

한다.

#### return

```java
return "ONE";
```

은 **현재 메서드 전체를 종료한다.**

따라서:

```text
yield  → switch 표현식에 값을 전달
return → 메서드 자체 종료
```

---


## 2026-09-14 자바 상속과 다형성 핵심 정리

### 8. switch 타입 패턴 매칭

```java
switch (animal) {
    case Dog dog -> System.out.println("강아지");
    case Cat cat -> System.out.println("고양이");
}
```

`animal instanceof Dog dog`와 `case Dog dog ->`는 모두 타입 검사와 해당 타입 변수 생성을 수행한다.


