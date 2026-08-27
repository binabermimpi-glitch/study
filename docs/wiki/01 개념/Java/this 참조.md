---
type: concept
aliases: [this, this 호출]
knowledge_type: foundation
classification_reason: 현재 객체의 필드와 메소드를 명확히 참조하고 생성자를 연결하는 기초다.
difficulty: 초급
status: growing
prerequisites:
  - "[static과 인스턴스 멤버](</wiki/01%20%EA%B0%9C%EB%85%90/Java/static%EA%B3%BC%20%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%20%EB%A9%A4%EB%B2%84>)"
  - "[생성자와 생성자 오버로딩](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%83%9D%EC%84%B1%EC%9E%90%EC%99%80%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%98%A4%EB%B2%84%EB%A1%9C%EB%94%A9>)"
related: []
sources: ["[2026-08-26 Java 객체 생성자 캡슐화 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-26%20Java%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%BA%A1%EC%8A%90%ED%99%94%20%EB%B3%B5%EC%8A%B5>)"]
created: 2026-08-26
updated: 2026-08-26
---

# this 참조

## 한 문장 설명

`this`는 현재 인스턴스 메소드나 생성자가 실행되고 있는 객체 자신을 가리키는 참조다.

```java
class Person {
    private String name;

    Person(String name) {
        this.name = name;
    }
}
```

- `this.name`: 현재 객체의 필드
- `name`: 생성자의 매개변수

`this`는 생성자 전용이 아니며 인스턴스 메소드에서도 사용할 수 있다. 특정 인스턴스가 없는 static 문맥에서는 사용할 수 없다.

## `this(...)`와 구분

`this`는 현재 객체 참조이고, `this(...)`는 같은 클래스의 다른 생성자를 호출하는 문법이다. `this(...)`는 생성자의 첫 문장이어야 한다.

