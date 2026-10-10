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
  - "[2026-09-22 Java 컬렉션 다형성 Comparator 정리](</sources/2026-09-22%20Java%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%8B%A4%ED%98%95%EC%84%B1%20Comparator%20%EC%A0%95%EB%A6%AC>)"
created: 2026-10-10
updated: 2026-10-10
---

# Set 구현체와 중복 판단

## Java 컬렉션 다형성 Comparator 정리

### 2. HashSet / LinkedHashSet / TreeSet

| 종류 | 순회 순서 | 중복 판단 |
| --- | --- | --- |
| HashSet | 순서 보장 없음 | `hashCode()`와 `equals()` |
| LinkedHashSet | 삽입 순서 유지 | `hashCode()`와 `equals()` |
| TreeSet | 정렬 순서 | 비교 결과가 0인지 |

- 모두 Set 계열이므로 중복을 허용하지 않는다.
- HashSet의 순서 보장 없음은 매번 무작위라는 뜻이 아니다.
- LinkedHashSet에 이미 있는 요소를 `add()`해도 기존 위치는 바뀌지 않는다.


### 7. TreeSet은 비교 결과가 0이면 중복으로 판단한다

```java
Set<String> words =
        new TreeSet<>(Comparator.comparingInt(String::length));

words.add("Java"); // true: 저장
words.add("Ruby"); // false: 길이가 같아 저장되지 않음

System.out.println(words); // [Java]
```

- `"Java".equals("Ruby")`는 false다.
- 하지만 길이 비교 결과는 0이다.
- 따라서 TreeSet에서는 중복으로 취급한다.
- TreeSet에서는 정렬 기준이 중복 판단 기준까지 된다.


