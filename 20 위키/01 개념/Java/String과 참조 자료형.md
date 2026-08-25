---
type: concept
aliases: [String, 문자열, 참조 자료형]
knowledge_type: practical-core
classification_reason: 문자열은 거의 모든 Java 백엔드 프로그램의 입력, 출력과 데이터 처리에서 사용된다.
difficulty: 입문
status: growing
prerequisites: ["[[20 위키/01 개념/Java/기본 자료형과 리터럴]]", "[[20 위키/01 개념/Java/참조와 점 연산자]]"]
related: []
sources: ["[[20 위키/03 출처 노트/2026-08-23 자바 참조와 자료형 기초]]"]
created: 2026-08-23
updated: 2026-08-23
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

## 실무에서는 어떻게 쓰이나

HTTP 요청값, JSON 데이터, 로그, 데이터베이스의 문자 데이터 등 거의 모든 백엔드 작업에서 사용된다.

## 출처

- [[20 위키/03 출처 노트/2026-08-23 자바 참조와 자료형 기초]]

