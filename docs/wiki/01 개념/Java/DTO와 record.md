---
type: concept
aliases: [DTO, Data Transfer Object, record, VO]
knowledge_type: practical-core
classification_reason: Spring 백엔드의 계층·API 사이에서 데이터를 전달할 때 자주 사용된다.
difficulty: 초급
status: growing
prerequisites:
  - "[생성자와 생성자 오버로딩](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%83%9D%EC%84%B1%EC%9E%90%EC%99%80%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%98%A4%EB%B2%84%EB%A1%9C%EB%94%A9>)"
  - "[가변 객체와 불변 객체](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EA%B0%80%EB%B3%80%20%EA%B0%9D%EC%B2%B4%EC%99%80%20%EB%B6%88%EB%B3%80%20%EA%B0%9D%EC%B2%B4>)"
related:
  - "[캡슐화와 Getter Setter](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%BA%A1%EC%8A%90%ED%99%94%EC%99%80%20Getter%20Setter>)"
sources: ["[2026-08-27 자바 메소드와 객체 생성](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-27%20%EC%9E%90%EB%B0%94%20%EB%A9%94%EC%86%8C%EB%93%9C%EC%99%80%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1>)"]
created: 2026-08-27
updated: 2026-08-27
---

# DTO와 record

## DTO

DTO(Data Transfer Object)는 계층이나 프로세스 사이에서 데이터를 전달하기 위한 객체다. DTO의 목적은 전달이며 반드시 setter를 가져야 하는 것은 아니다.

```java
public record MemberResponse(
        String id,
        String name,
        int age
) {}
```

## record의 특징

- 컴포넌트에 대응하는 `private final` 필드와 접근자 등이 자동 제공된다.
- 정규 생성자 또는 compact constructor로 검증할 수 있다.
- record 클래스 자체는 암시적으로 final이라 다른 클래스가 상속할 수 없다.
- 컴포넌트 참조를 다른 값으로 바꿀 수 없지만 참조 대상까지 깊게 불변인 것은 아니다.

```java
public record MemberRequest(String name, int age) {
    public MemberRequest {
        if (age < 0) {
            throw new IllegalArgumentException("나이는 음수일 수 없습니다.");
        }
    }
}
```

## DTO와 VO

DTO는 전달 역할을 강조한다. VO(Value Object)는 값의 의미, 동등성과 불변성을 강조하는 표현으로 자주 쓰이지만 팀과 문맥에 따라 용어 사용이 다를 수 있으므로 프로젝트의 정의를 확인한다.

## Spring 연결

요청 DTO와 응답 DTO를 엔터티와 분리하면 API 계약과 내부 데이터 모델의 변경 영향을 줄일 수 있다. 비밀번호를 응답 DTO에 포함하지 않는 등 노출 범위를 명확히 정한다.

