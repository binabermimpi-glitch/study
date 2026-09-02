---
type: concept
aliases: [instanceof, 타입 검사]
knowledge_type: foundation
classification_reason: 상속과 다형성에서 참조 대상의 런타임 타입을 안전하게 확인하는 문법이다.
difficulty: 초급
status: growing
prerequisites:
  - "[[20 위키/01 개념/Java/참조와 점 연산자]]"
related: ["[[20 위키/01 개념/Java/switch 표현식과 패턴 매칭]]", "[[20 위키/01 개념/Java/상속 오버라이딩 다형성]]"]
sources: ["[[20 위키/03 출처 노트/2026-08-26 Java 객체 생성자 캡슐화 복습]]", "[[20 위키/03 출처 노트/2026-08-31 Java 배열 반복문 패턴 매칭 복습]]", "[[20 위키/03 출처 노트/2026-09-03 자바 배열과 객체지향 핵심]]"]
created: 2026-08-26
updated: 2026-09-03
---

# instanceof와 타입 검사

## 한 문장 설명

`instanceof`는 참조 대상 객체가 지정한 타입으로 취급될 수 있는지 검사하고 `boolean`을 반환한다.

```java
Animal animal = new Dog();

System.out.println(animal instanceof Animal); // true
System.out.println(animal instanceof Dog);    // true
```

`null instanceof Person`은 예외가 아니라 `false`다.

참조 변수의 선언 타입과 실제 객체 타입은 다를 수 있다.

```java
Object obj = "hello";
System.out.println(obj instanceof String); // true
```

Java 16 이상에서는 검사와 형변환을 한 번에 하는 패턴 매칭을 사용할 수 있다.

```java
if (obj instanceof String text) {
    System.out.println(text.toUpperCase());
}
```

## 실무에서는 어떻게 쓰이나

안전한 타입 변환이나 패턴 매칭에 사용할 수 있다. 다만 수많은 `instanceof` 분기로 객체 종류를 계속 확인한다면 다형성으로 설계를 개선할 수 있는지 검토한다.

`getClass()`는 실제 클래스가 정확히 무엇인지 `Class` 객체로 확인할 때 사용하고, `instanceof`는 상위 타입·인터페이스 관계까지 포함해 해당 타입으로 취급 가능한지 확인한다. `getClass()`를 호출할 대상이 `null`이면 `NullPointerException`이 발생하지만 `null instanceof Type`은 `false`다.

## 반복 학습 이력

- 2026-08-26 — 실제 객체 타입 검사 최초 정리
- 2026-08-31 — 패턴 변수와 선언 타입·실제 타입 차이 재확인
- 2026-09-03 — 배열 타입 판별과 `getClass()` 차이 재확인

## 출처

- [[20 위키/03 출처 노트/2026-08-26 Java 객체 생성자 캡슐화 복습]]
- [[20 위키/03 출처 노트/2026-08-31 Java 배열 반복문 패턴 매칭 복습]]
- [[20 위키/03 출처 노트/2026-09-03 자바 배열과 객체지향 핵심]]
