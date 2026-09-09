---
type: concept
aliases: [sealed, permits, non-sealed, 봉인 클래스]
knowledge_type: limited-use
classification_reason: 허용할 하위 타입을 엄격히 제한할 때 유용하지만 일반적인 입문 백엔드 코드에서 항상 사용하지는 않는다.
difficulty: 중급
status: seed
prerequisites: ["[[20 위키/01 개념/Java/상속 오버라이딩 다형성]]"]
related: ["[[20 위키/01 개념/Java/인터페이스]]"]
sources: ["[[20 위키/03 출처 노트/2026-09-10 자바 상속과 객체 설계]]"]
created: 2026-09-10
updated: 2026-09-10
---

# sealed 클래스

## 한 문장 설명

sealed는 어떤 클래스나 인터페이스가 자신의 직접 하위 타입이 될 수 있는지 제한하는 Java 문법이다.

직접 하위 타입은 보통 final, sealed, non-sealed 중 하나로 이후 상속 가능 범위를 밝혀야 한다. permits 목록과 하위 타입 배치에는 컴파일 규칙이 적용된다.

## 적용 버전

sealed 클래스는 Java 17에서 정식 기능이 되었다. 국비수업이나 프로젝트의 JDK 버전을 먼저 확인한다.

## 언제 쓰나

허용 가능한 타입 종류가 명확한 도메인 모델이나 패턴 매칭에서 유용하다. 단순히 상속을 막기만 한다면 final이 더 간단하다.

## 흔한 실수

- sealed를 접근 제한자라고 생각한다.
- 허용된 하위 클래스가 아무 선언 없이 다시 자유롭게 상속될 수 있다고 생각한다.

## 출처

- [[20 위키/03 출처 노트/2026-09-10 자바 상속과 객체 설계]]
