---
type: concept
aliases: [HashSet, LinkedHashSet, TreeSet, NavigableSet]
knowledge_type: practical-core
classification_reason: 중복 없는 데이터 관리와 구현체별 순서·비교 규칙은 Java 컬렉션 사용의 핵심이다.
difficulty: 초급
status: growing
prerequisites: ["[[20 위키/01 개념/Java/인터페이스]]", "[[20 위키/01 개념/Java/상속 오버라이딩 다형성]]"]
related: ["[[20 위키/01 개념/Java/List와 ListIterator]]", "[[20 위키/01 개념/Java/Comparator와 정렬]]"]
sources: ["[[20 위키/03 출처 노트/2026-09-22 Java 컬렉션 다형성 Comparator 정리]]"]
created: 2026-09-22
updated: 2026-09-22
---

# Set 구현체와 중복 판단

## 한 문장 설명

Set은 중복을 허용하지 않는 컬렉션이며, 구현체에 따라 순회 순서와 중복을 판단하는 기준이 달라진다.

## HashSet·LinkedHashSet·TreeSet 비교

| 종류 | 순회 순서 | 중복 판단 |
| --- | --- | --- |
| `HashSet` | 순서 보장 없음 | `hashCode()`와 `equals()` |
| `LinkedHashSet` | 삽입 순서 유지 | `hashCode()`와 `equals()` |
| `TreeSet` | 정렬 순서 | 비교 결과가 0인지 |

- 모두 Set 계열이므로 중복을 허용하지 않는다.
- HashSet의 순서 보장 없음은 매번 무작위라는 뜻이 아니다.
- LinkedHashSet에 이미 있는 요소를 `add()`해도 기존 위치는 바뀌지 않는다.

## 인터페이스 구현과 다형성

```java
NavigableSet<Integer> scores = new TreeSet<>();
```

- 변수 `scores`의 타입: `NavigableSet<Integer>`
- 실제 생성된 객체: `TreeSet<Integer>`
- TreeSet은 NavigableSet을 구현한다.
- 인터페이스 타입으로 구현 객체를 참조하는 것도 다형성이다.

```text
extends    → 상속
implements → 인터페이스 구현
```

```java
TreeSet<Integer> tree = new TreeSet<>();
NavigableSet<Integer> a = tree;
Set<Integer> b = tree;
```

- `a`와 `b`는 같은 TreeSet 객체를 참조한다.
- 변수 타입에 따라 호출할 수 있는 메서드가 달라진다.
- 실제 실행되는 동작은 객체의 구현을 따른다.

```java
a.higher(80);    // 가능: 80보다 큰 요소 중 가장 작은 요소 반환
// b.higher(80); // 컴파일 오류: Set에는 higher()가 없음
```

`Set`에는 `higher()`가 선언되어 있지 않으므로 `b.higher(80)`은 컴파일할 수 없다. 하지만 두 변수 모두 같은 TreeSet 객체를 가리킨다.

## TreeSet의 중복 판단

TreeSet은 정렬에 사용한 비교 결과가 `0`이면 두 요소를 중복으로 판단한다.

```java
Set<String> words =
        new TreeSet<>(Comparator.comparingInt(String::length));

words.add("Java"); // true: 저장
words.add("Ruby"); // false: 길이가 같아 저장되지 않음

System.out.println(words); // [Java]
```

- `"Java".equals("Ruby")`는 false다.
- 길이 비교 결과는 0이다.
- 따라서 TreeSet에서는 중복으로 취급한다.
- TreeSet에서는 정렬 기준이 중복 판단 기준까지 된다.

비교 기준의 일관성은 [[20 위키/01 개념/Java/Comparator와 정렬]]에서 이어서 다룬다.

## 흔한 실수

- HashSet이 입력 순서를 유지한다고 생각한다.
- LinkedHashSet에 기존 값을 다시 추가하면 맨 뒤로 이동한다고 생각한다.
- TreeSet도 `equals()`만으로 중복을 판단한다고 생각한다.
- 참조 변수의 타입과 실제 객체의 타입을 구분하지 않는다.

## 출처

- [[20 위키/03 출처 노트/2026-09-22 Java 컬렉션 다형성 Comparator 정리]]
