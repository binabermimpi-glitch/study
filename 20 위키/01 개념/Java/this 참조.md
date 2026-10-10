---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 5
prerequisites: []
related: []
sources:
  - "[[10 원문/자바 백엔드 수업/2026-08-26 Java 객체 생성자 캡슐화 복습]]"
created: 2026-10-10
updated: 2026-10-10
---

# this 참조

## Java 객체 생성자 캡슐화 복습

#### 2-2. this는 생성자에서 만드는 것이 아니다

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    void printName() {
        System.out.println(this.name);
    }
}
```

- `this`는 현재 실행 중인 객체 자기 자신을 가리키는 참조다.
- 생성자와 non-static 메서드 안에서 사용할 수 있다.
- `this.name`은 현재 객체의 필드이고 오른쪽 `name`은 매개변수다.
- `static` 메서드는 특정 객체 하나에 속하지 않으므로 `this`를 사용할 수 없다.


