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

# 캡슐화와 Getter Setter

## Java 객체 생성자 캡슐화 복습

### 4. 캡슐화, private, Getter와 Setter

```java
class Person {
    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
}
```

- `private` 필드는 외부 클래스의 직접 접근을 막는다.
- Getter는 값을 읽는 통로이고 Setter는 값을 변경하는 통로다.
- Setter에 조건 검사를 넣어 잘못된 값을 막을 수 있다.
- 객체 내부 데이터를 숨기고 정해진 방법으로 접근시키는 것이 캡슐화의 핵심이다.


