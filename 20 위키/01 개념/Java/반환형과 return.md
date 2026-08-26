---
type: concept
aliases: [return, 반환형 메소드, void]
knowledge_type: practical-core
classification_reason: 메소드의 출력 계약과 실행 흐름을 정의하는 Java의 핵심 문법이다.
difficulty: 입문
status: growing
prerequisites:
  - "[[20 위키/01 개념/Java/메서드 선언과 호출]]"
related:
  - "[[20 위키/01 개념/Java/형변환과 연산 프로모션]]"
sources: ["[[20 위키/03 출처 노트/2026-08-27 자바 메소드와 객체 생성]]"]
created: 2026-08-27
updated: 2026-08-27
---

# 반환형과 return

## 한 문장 설명

메소드의 반환형은 호출 결과의 타입 계약이고, `return`은 메소드를 즉시 끝내면서 필요하면 값을 호출자에게 전달한다.

```java
public static int add(int left, int right) {
    return left + right;
}

int result = add(10, 20);
```

## 규칙

- 반환값은 선언한 반환형과 대입 호환되어야 한다.
- `void` 메소드는 값을 반환하지 않지만 `return;`으로 조기 종료할 수 있다.
- 반환형이 있는 메소드는 정상적으로 끝나는 모든 실행 경로에서 값을 반환해야 한다.
- `return` 뒤의 도달 불가능한 문장은 컴파일 오류가 될 수 있다.

## 국비수업 연결

Controller가 응답 DTO를 반환하고 Service가 처리 결과를 반환하는 구조에서도 같은 입력·출력 계약을 사용한다.

