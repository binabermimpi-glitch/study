---
type: concept
aliases: [encapsulation, Getter, Setter, 정보 은닉]
knowledge_type: practical-core
classification_reason: 객체의 유효한 상태를 보호하고 변경 영향을 줄이는 객체지향 설계의 핵심이다.
difficulty: 초급
status: growing
prerequisites:
  - "[클래스와 접근 제한자](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80%20%EC%A0%91%EA%B7%BC%20%EC%A0%9C%ED%95%9C%EC%9E%90>)"
  - "[this 참조](</wiki/01%20%EA%B0%9C%EB%85%90/Java/this%20%EC%B0%B8%EC%A1%B0>)"
related:
  - "[가변 객체와 불변 객체](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EA%B0%80%EB%B3%80%20%EA%B0%9D%EC%B2%B4%EC%99%80%20%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4>)"
sources: ["[2026-08-26 Java 객체 생성자 캡슐화 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-26%20Java%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%BA%A1%EC%8A%90%ED%99%94%20%EB%B3%B5%EC%8A%B5>)"]
created: 2026-08-26
updated: 2026-08-26
---

# 캡슐화와 Getter·Setter

## 한 문장 설명

캡슐화는 객체 내부 상태와 구현을 숨기고, 객체가 허용한 동작을 통해서만 유효한 상태를 읽거나 변경하게 하는 설계다.

```java
class Person {
    private int age;

    public int getAge() {
        return age;
    }

    public void changeAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 음수일 수 없습니다.");
        }
        this.age = age;
    }
}
```

## Getter와 Setter에 대한 주의

- 모든 필드에 Getter와 Setter를 만드는 것이 캡슐화는 아니다.
- 읽을 필요가 없는 값은 Getter를 공개하지 않을 수 있다.
- 자유롭게 바뀌면 안 되는 값은 Setter를 만들지 않을 수 있다.
- `setAge()`보다 `changeAge()`, `increaseAge()`처럼 업무 의미를 드러내는 메소드가 더 나을 수 있다.

## Spring 연결

DTO 바인딩이나 일부 프레임워크 사용 때문에 접근자가 필요한 경우가 있지만, 도메인 객체의 상태 변경 규칙까지 포기해야 한다는 뜻은 아니다.

