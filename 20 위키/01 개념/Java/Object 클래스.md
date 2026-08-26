---
type: concept
aliases: [java.lang.Object, toString, equals, hashCode, getClass]
knowledge_type: practical-core
classification_reason: 모든 Java 클래스 계층의 루트이며 객체 비교와 표현 규칙의 기반이다.
difficulty: 초급
status: growing
prerequisites:
  - "[[20 위키/01 개념/Java/클래스와 접근 제한자]]"
related:
  - "[[20 위키/01 개념/Java/instanceof와 타입 검사]]"
sources: ["[[20 위키/03 출처 노트/2026-08-27 자바 메소드와 객체 생성]]"]
created: 2026-08-27
updated: 2026-08-27
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

