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

# Comparator와 정렬

## Java 컬렉션 다형성 Comparator 정리

### 5. Comparator의 역할

`Comparator<T>`는 두 객체의 비교 기준을 정의하는 함수형 인터페이스다. T는 비교할 객체의 타입이다.

`compare(a, b)`의 반환값:

- 음수: a가 b보다 앞
- 0: 같은 순위
- 양수: a가 b보다 뒤

사용처:

- `Collections.sort()`
- `Arrays.sort()`
- `TreeSet`
- `TreeMap`

자연 정렬 기준이 없는 객체에도 비교 기준을 제공할 수 있다.


### 8. equals와 일관된 비교 기준

다음 두 식의 참·거짓이 항상 같아야 한다는 뜻이다.

```java
a.equals(b)
comparator.compare(a, b) == 0
```

즉:

- equals가 true이면 비교 결과도 0이어야 한다.
- equals가 false이면 비교 결과도 0이 아니어야 한다.

일관되지 않으면:

- equals는 false인데 비교 결과가 0
  - 서로 다른 요소인데 하나만 저장될 수 있다.
- equals는 true인데 비교 결과가 0이 아님
  - 같은 요소로 보아야 하는데 둘 다 저장될 수 있다.

이것이 equals를 기준으로 하는 Set의 일반 규칙을 위반한다는 뜻이다.

문서의 수학적 설명:

- `compare(x, y) == 0`인 객체끼리 묶은 그룹
- `x.equals(y)`가 true인 객체끼리 묶은 그룹

위 두 그룹 구성이 같아야 equals와 일관된다. 이렇게 같은 것으로 묶인 그룹을 “동치류”라고 한다.


### 9. 자연 정렬과 null

자연 정렬:

- Comparable의 `compareTo()`가 제공하는 기본 정렬 기준
- 예: 정수의 오름차순, 문자열의 사전순

```java
TreeSet<Integer> scores = new TreeSet<>();
scores.add(null); // NullPointerException
```

- 자연 정렬을 사용하는 TreeSet은 null을 허용하지 않는다.
- null을 처리하는 Comparator를 지정하면 허용할 수 있다.

```java
Set<Integer> scores =
        new TreeSet<>(Comparator.nullsFirst(Comparator.naturalOrder()));

scores.add(80);
scores.add(null);

System.out.println(scores); // [null, 80]
```

- `nullsFirst()`: null을 다른 값보다 앞에 배치한다.
- 모든 Comparator가 자동으로 null을 처리하는 것은 아니다.


