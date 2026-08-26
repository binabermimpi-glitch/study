---
type: concept
aliases: [static, 정적 멤버, 인스턴스 멤버]
knowledge_type: foundation
classification_reason: 객체 생성 여부와 멤버 호출 방식을 구분하는 Java 객체지향의 핵심이다.
difficulty: 입문
status: growing
prerequisites: ["[[20 위키/01 개념/Java/클래스와 접근 제한자]]", "[[20 위키/01 개념/Java/참조와 점 연산자]]"]
related: []
sources: ["[[20 위키/03 출처 노트/2026-08-23 자바 참조와 자료형 기초]]"]
created: 2026-08-23
updated: 2026-08-27
---

# static과 인스턴스 멤버

## 한 문장 설명

`static` 멤버는 클래스에 속하고, 인스턴스 멤버는 생성된 각 객체에 속한다.

```java
class Counter {
    static int total;
    int value;

    static void resetTotal() {
        total = 0;
    }

    void increase() {
        value++;
        total++;
    }
}

Counter.resetTotal();
Counter counter = new Counter();
counter.increase();
```

## 구분

| 구분 | 권장 호출 형태 | 상태의 소유자 |
|---|---|---|
| static 멤버 | `클래스명.멤버` | 클래스 차원에서 공유 |
| 인스턴스 멤버 | `참조변수.멤버` | 생성된 객체 각각 |

## 흔한 실수

- 모든 메소드에 습관적으로 `static`을 붙인다.
- 공유하면 안 되는 상태를 static 필드로 만들어 객체 사이에서 값이 섞인다.
- static 메소드에서 특정 객체 없이 인스턴스 필드에 직접 접근하려 한다.

## 실무에서는 어떻게 쓰이나

상수와 상태 없는 유틸리티 기능에는 static이 쓰인다. 애플리케이션의 변경 가능한 상태를 무분별하게 static으로 만들면 테스트와 동시성 관리가 어려워질 수 있다.

## 메서드 호출과 바인딩

메서드 호출이 실제 실행 대상과 연결되는 것을 바인딩이라고 한다. static 메서드는 클래스 기준으로 결정되지만, 바인딩이라는 말 자체가 단순히 메모리 주소를 미리 할당한다는 뜻만은 아니다. 이후 상속과 다형성을 배울 때 정적 바인딩과 동적 디스패치를 더 정확히 구분한다.

## 출처

- [[20 위키/03 출처 노트/2026-08-23 자바 참조와 자료형 기초]]
- [[20 위키/03 출처 노트/2026-08-24 자바 메서드와 연산자 기초]]
- [[20 위키/03 출처 노트/2026-08-27 자바 메소드와 객체 생성]]
