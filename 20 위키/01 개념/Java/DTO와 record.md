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
  - "[[10 원문/자바 백엔드 수업/2026-08-27 자바 메소드와 객체 생성]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-14 자바 상속과 다형성 핵심 정리]]"
created: 2026-10-10
updated: 2026-10-10
---

# DTO와 record

## 2026-08-27 자바 메소드와 객체 생성

### DTO와 record 타입

> DTO는 계층 간 데이터 전달을 위한 객체이며, `record`는 불변 데이터 객체를 간결하게 정의할 수 있는 자바 문법입니다.

DTO는 Data Transfer Object의 약자로, 계층 간에 데이터를 전달하기 위한 객체입니다. 일반적으로 여러 필드와 생성자, getter, setter를 포함하며 데이터 보관과 전달에 초점을 둡니다.

일반 클래스로 DTO를 구현하면 필드 선언, 생성자, getter, setter를 반복해서 작성해야 합니다. 데이터 변경이 필요한 가변 객체라면 일반 클래스와 setter 기반 구현이 적합할 수 있습니다.

```java
public class MemberDto {
    private String id;
    private String password;
    private String name;

    public MemberDto(String id, String password, String name) {
        this.id = id;
        this.password = password;
        this.name = name;
    }
}
```

`record`는 데이터 중심 객체를 간결하게 선언하기 위한 타입입니다. 레코드 컴포넌트를 선언하면 생성자와 접근자 성격의 메소드가 자동으로 제공되며, 구성 요소는 변경할 수 없는 불변 상태로 다뤄집니다.

```java
public record MemberRecord(
    String id,
    String password,
    String name,
    int age
) {
}
```

- 일반 DTO는 setter를 통해 상태를 변경할 수 있는 가변 객체로 구성할 수 있습니다.
- `record`의 컴포넌트는 기본적으로 불변 상태로 취급됩니다.
- `record`는 데이터 전달용 객체의 반복 코드를 줄이는 데 유용합니다.
- 데이터의 변경 여부와 도메인 요구사항에 따라 일반 클래스와 `record`를 선택해야 합니다.

DTO와 VO는 현업에서 혼용되는 경우도 있지만, 일반적으로 DTO는 데이터 전달 목적의 객체를 뜻하며 VO는 값 자체의 의미와 불변성을 강조하는 객체로 이해할 수 있습니다.


## 2026-09-14 자바 상속과 다형성 핵심 정리

### 10. record

```java
record AnimalInfo(String name, int age) {
}

record Dog(AnimalInfo info, int walkCount) implements Animal {
}
```

record는 데이터를 저장하는 클래스를 간단히 작성하는 문법이며 생성자, 접근 메서드, `equals()`, `hashCode()`, `toString()` 등의 주요 기능을 자동 제공한다. 접근할 때는 `dog.info()`, `dog.info().name()`, `dog.walkCount()`처럼 사용한다.

