---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 8
prerequisites: []
related: []
sources:
  - "[[10 원문/2026-09-22 Java 컬렉션 다형성 Comparator 정리]]"
created: 2026-10-10
updated: 2026-10-10
---

# List와 ListIterator

## Java 컬렉션 다형성 Comparator 정리

### Java 컬렉션 · 다형성 · Comparator 정리


### 1. ListIterator의 previous()

- 현재 커서 바로 앞 요소를 반환하고 커서를 뒤로 한 칸 이동한다.
- 항상 맨 끝에서 시작하는 것이 아니라 현재 커서 위치부터 역방향으로 이동한다.

예: `[Java, SQL]`을 `next()`로 끝까지 순회한 상태

```java
while (it.hasPrevious()) {
    System.out.println(it.previous()); // SQL → Java
}
```


