---
type: concept
aliases: [java.lang.Object, toString, equals, hashCode, getClass]
knowledge_type: practical-core
classification_reason: 모든 Java 클래스 계층의 루트이며 객체 비교와 표현 규칙의 기반이다.
difficulty: 초급
status: growing
prerequisites:
  - "[클래스와 접근 제한자](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80%20%EC%A0%91%EA%B7%BC%20%EC%A0%9C%ED%95%9C%EC%9E%90>)"
related:
  - "[instanceof와 타입 검사](</wiki/01%20%EA%B0%9C%EB%85%90/Java/instanceof%EC%99%80%20%ED%83%80%EC%9E%85%20%EA%B2%80%EC%82%AC>)"
sources: ["[2026-08-27 자바 메소드와 객체 생성](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-27%20%EC%9E%90%EB%B0%94%20%EB%A9%94%EC%86%8C%EB%93%9C%EC%99%80%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1>)", "[2026-09-14 자바 상속과 다형성 핵심 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-14%20%EC%9E%90%EB%B0%94%20%EC%83%81%EC%86%8D%EA%B3%BC%20%EB%8B%A4%ED%98%95%EC%84%B1%20%ED%95%B5%EC%8B%AC%20%EC%A0%95%EB%A6%AC>)"]
created: 2026-08-27
updated: 2026-09-14
---

# Object 클래스

## 한 문장 설명

`java.lang.Object`는 Java 클래스 계층의 최상위 클래스이며 모든 객체가 공통으로 갖는 기본 메소드를 정의한다.

| 메소드 | 역할과 주의점 |
|---|---|
| `toString()` | 객체의 문자열 표현. 의미 있는 출력을 위해 재정의 가능 |
| `equals()` | 논리적 동등성 비교. 필요하면 `hashCode()`와 함께 재정의 |
| `hashCode()` | 해시 기반 컬렉션에서 사용하는 값 |
| `getClass()` | 실행 중 객체의 런타임 클래스 정보 반환 |
| `clone()` | `protected` 메소드이며 복제 계약과 `Cloneable`에 주의 |

## 상속 표현 주의

다른 부모 클래스를 명시하지 않은 클래스는 `Object`를 직접 상속한다. 부모를 명시한 클래스는 그 부모를 직접 상속하고, 상속 계층의 최상위에서 결국 `Object`와 연결된다.

## 실무에서는 어떻게 쓰이나

DTO·엔터티·값 객체의 `equals()`와 `hashCode()` 계약, 로그에 출력할 `toString()`을 설계할 때 중요하다. 비밀번호 같은 민감정보를 `toString()`에 포함하지 않는다.

## equals와 hashCode 계약

논리적으로 같은 객체를 판단하도록 `equals()`를 재정의했다면 일반적으로 같은 필드를 기준으로 `hashCode()`도 함께 재정의한다. `equals()`가 `true`인 두 객체는 반드시 같은 해시 코드를 반환해야 HashSet과 HashMap에서 일관되게 동작한다.

## 반복 학습 이력

- 2026-09-14 — `equals()`·`hashCode()` 계약과 `toString()` 재정의 목적 재확인

## 출처

- [2026-08-27 자바 메소드와 객체 생성](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-27%20%EC%9E%90%EB%B0%94%20%EB%A9%94%EC%86%8C%EB%93%9C%EC%99%80%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1>)
- [2026-09-14 자바 상속과 다형성 핵심 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-14%20%EC%9E%90%EB%B0%94%20%EC%83%81%EC%86%8D%EA%B3%BC%20%EB%8B%A4%ED%98%95%EC%84%B1%20%ED%95%B5%EC%8B%AC%20%EC%A0%95%EB%A6%AC>)
