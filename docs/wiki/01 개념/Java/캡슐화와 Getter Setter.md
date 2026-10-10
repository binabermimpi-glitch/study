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
  - "[2026-08-26 Java 객체 생성자 캡슐화 복습](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-08-26%20Java%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%BA%A1%EC%8A%90%ED%99%94%20%EB%B3%B5%EC%8A%B5>)"
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


