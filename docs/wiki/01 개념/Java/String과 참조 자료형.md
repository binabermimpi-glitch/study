---
type: concept
aliases: [String, 문자열, 참조 자료형]
knowledge_type: practical-core
classification_reason: 문자열은 거의 모든 Java 백엔드 프로그램의 입력, 출력과 데이터 처리에서 사용된다.
difficulty: 입문
status: growing
prerequisites: ["[기본 자료형과 리터럴](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EA%B8%B0%EB%B3%B8%20%EC%9E%90%EB%A3%8C%ED%98%95%EA%B3%BC%20%EB%A6%AC%ED%84%B0%EB%9F%B4>)", "[참조와 점 연산자](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%B0%B8%EC%A1%B0%EC%99%80%20%EC%A0%90%20%EC%97%B0%EC%82%B0%EC%9E%90>)"]
related: ["[가변 객체와 불변 객체](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EA%B0%80%EB%B3%80%20%EA%B0%9D%EC%B2%B4%EC%99%80%20%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4>)"]
sources: ["[2026-08-23 자바 참조와 자료형 기초](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EC%9E%90%EB%B0%94%20%EC%B0%B8%EC%A1%B0%EC%99%80%20%EC%9E%90%EB%A3%8C%ED%98%95%20%EA%B8%B0%EC%B4%88>)", "[2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)"]
created: 2026-08-23
updated: 2026-08-31
---

# String과 참조 자료형

## 한 문장 설명

`String`은 문자열을 표현하는 클래스이며 기본 자료형이 아니라 참조 자료형이다.

```java
String first = "Java";
String message = first.concat(" Backend");
System.out.println(message);
```

## 핵심 원리

- 문자열 리터럴 덕분에 기본형처럼 간단히 선언할 수 있지만 실제 타입은 클래스다.
- `String` 객체는 생성 후 내용이 바뀌지 않는 불변 객체다.
- 문자열을 변경하는 것처럼 보이는 연산은 일반적으로 새 문자열 결과를 만든다.

## 흔한 실수

- 문자열 내용을 `==`로 비교한다. 내용 비교에는 보통 `equals()`를 사용한다.
- 반복문에서 문자열을 매우 많이 이어 붙이며 중간 객체를 계속 만든다.
- 참조가 `null`일 가능성을 확인하지 않고 메소드를 호출한다.

## 길이와 빈 문자열 확인

- `text.length()`는 문자열의 길이를 반환하는 메서드다.
- `text.isEmpty()`는 길이가 0일 때만 `true`다.
- `text.isBlank()`는 빈 문자열이거나 공백 문자로만 구성되었을 때 `true`다. `isBlank()`는 Java 11부터 사용할 수 있다.

```java
System.out.println("".isEmpty());  // true
System.out.println(" ".isEmpty()); // false
System.out.println(" ".isBlank()); // true
```

## 실무에서는 어떻게 쓰이나

HTTP 요청값, JSON 데이터, 로그, 데이터베이스의 문자 데이터 등 거의 모든 백엔드 작업에서 사용된다.

## 출처

- [2026-08-23 자바 참조와 자료형 기초](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EC%9E%90%EB%B0%94%20%EC%B0%B8%EC%A1%B0%EC%99%80%20%EC%9E%90%EB%A3%8C%ED%98%95%20%EA%B8%B0%EC%B4%88>)
- [2026-08-26 Java 객체 생성자 캡슐화 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-26%20Java%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%BA%A1%EC%8A%90%ED%99%94%20%EB%B3%B5%EC%8A%B5>)
- [2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)
