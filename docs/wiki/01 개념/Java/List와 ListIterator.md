---
type: concept
aliases: [ListIterator, previous, 양방향 반복자]
knowledge_type: practical-core
classification_reason: List 요소를 앞뒤로 순회하고 현재 커서 위치를 이해하는 데 필요한 컬렉션 기본 지식이다.
difficulty: 초급
status: growing
prerequisites: ["[향상된 for문과 반복 제어](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%ED%96%A5%EC%83%81%EB%90%9C%20for%EB%AC%B8%EA%B3%BC%20%EB%B0%98%EB%B3%B5%20%EC%A0%9C%EC%96%B4>)"]
related: ["[Set 구현체와 중복 판단](</wiki/01%20%EA%B0%9C%EB%85%90/Java/Set%20%EA%B5%AC%ED%98%84%EC%B2%B4%EC%99%80%20%EC%A4%91%EB%B3%B5%20%ED%8C%90%EB%8B%A8>)", "[Comparator와 정렬](</wiki/01%20%EA%B0%9C%EB%85%90/Java/Comparator%EC%99%80%20%EC%A0%95%EB%A0%AC>)"]
sources: ["[2026-09-22 Java 컬렉션 다형성 Comparator 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-22%20Java%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%8B%A4%ED%98%95%EC%84%B1%20Comparator%20%EC%A0%95%EB%A6%AC>)"]
created: 2026-09-22
updated: 2026-09-22
---

# List와 ListIterator

## 한 문장 설명

`ListIterator`는 List 안에서 커서를 앞이나 뒤로 움직이며 요소를 읽을 수 있는 양방향 반복자다.

## `previous()`의 동작

- 현재 커서 바로 앞 요소를 반환한다.
- 요소를 반환한 뒤 커서를 뒤로 한 칸 이동한다.
- 항상 맨 끝에서 시작하지 않고 **현재 커서 위치**부터 역방향으로 이동한다.

예를 들어 `[Java, SQL]`을 `next()`로 끝까지 순회했다면 커서는 마지막 요소 뒤에 있다.

```java
List<String> languages = List.of("Java", "SQL");
ListIterator<String> it = languages.listIterator();

while (it.hasNext()) {
    it.next();
}

while (it.hasPrevious()) {
    System.out.println(it.previous()); // SQL → Java
}
```

## 실행 흐름

```text
[Java, SQL] ^   처음 커서는 Java 앞
 Java를 next()
[Java, SQL]      커서는 Java와 SQL 사이
       SQL을 next()
[Java, SQL] ^    커서는 SQL 뒤
       previous() → SQL
 previous()      → Java
```

## 흔한 실수

- `previous()`가 자동으로 목록 끝에서 시작한다고 생각한다.
- `hasPrevious()`로 확인하지 않고 `previous()`를 호출한다.
- 요소의 위치와 요소 사이에 있는 커서 위치를 같은 것으로 생각한다.

## 출처

- [2026-09-22 Java 컬렉션 다형성 Comparator 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-22%20Java%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%8B%A4%ED%98%95%EC%84%B1%20Comparator%20%EC%A0%95%EB%A6%AC>)
