---
type: concept
aliases: [Comparator, Comparable, 자연 정렬, 비교 기준]
knowledge_type: practical-core
classification_reason: 컬렉션 정렬과 TreeSet·TreeMap의 요소 구분 기준을 직접 정의하는 핵심 Java API다.
difficulty: 중급
status: growing
prerequisites: ["[인터페이스](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4>)", "[중첩 클래스](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EC%A4%91%EC%B2%A9%20%ED%81%B4%EB%9E%98%EC%8A%A4>)", "[Set 구현체와 중복 판단](</wiki/01%20%EA%B0%9C%EB%85%90/Java/Set%20%EA%B5%AC%ED%98%84%EC%B2%B4%EC%99%80%20%EC%A4%91%EB%B3%B5%20%ED%8C%90%EB%8B%A8>)"]
related: ["[IO와 NIO 파일 처리](</wiki/01%20%EA%B0%9C%EB%85%90/Java/IO%EC%99%80%20NIO%20%ED%8C%8C%EC%9D%BC%20%EC%B2%98%EB%A6%AC>)", "[Java API 선언문 읽기](</wiki/06%20%EB%82%98%EB%A7%8C%EC%9D%98%20%EC%9A%94%EC%95%BD/Java/Java%20API%20%EC%84%A0%EC%96%B8%EB%AC%B8%20%EC%9D%BD%EA%B8%B0>)"]
sources: ["[2026-09-22 Java 컬렉션 다형성 Comparator 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-22%20Java%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%8B%A4%ED%98%95%EC%84%B1%20Comparator%20%EC%A0%95%EB%A6%AC>)"]
created: 2026-09-22
updated: 2026-09-22
---

# Comparator와 정렬

## 한 문장 설명

`Comparator<T>`는 T 타입 객체 두 개를 받아 어느 객체를 앞에 둘지 정하는 함수형 인터페이스다.

## Comparator의 역할

`compare(a, b)`의 반환값은 다음과 같이 읽는다.

- 음수: a가 b보다 앞
- 0: 같은 순위
- 양수: a가 b보다 뒤

사용처:

- `Collections.sort()`
- `Arrays.sort()`
- `TreeSet`
- `TreeMap`

자연 정렬 기준이 없는 객체에도 비교 기준을 제공할 수 있다.

## 문자열 길이 비교

아래 네 코드는 같은 비교 동작을 한다. 같은 변수명이므로 각각 따로 사용하는 예제다.

```java
// ① 메서드 참조
Comparator<String> byLength =
        Comparator.comparingInt(String::length);

// ② 길이 추출 부분을 람다로 변경
Comparator<String> byLength =
        Comparator.comparingInt(s -> s.length());

// ③ Comparator 자체를 람다로 작성
Comparator<String> byLength =
        (s1, s2) -> Integer.compare(s1.length(), s2.length());

// ④ 익명 클래스로 작성
Comparator<String> byLength = new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return Integer.compare(s1.length(), s2.length());
    }
};
```

```java
byLength.compare("DB", "Java");   // 음수
byLength.compare("Java", "Ruby"); // 0
byLength.compare("Python", "DB"); // 양수
```

메서드 참조·람다·익명 클래스의 변환 과정은 [Java API 선언문 읽기](</wiki/06%20%EB%82%98%EB%A7%8C%EC%9D%98%20%EC%9A%94%EC%95%BD/Java/Java%20API%20%EC%84%A0%EC%96%B8%EB%AC%B8%20%EC%9D%BD%EA%B8%B0>)에 따로 보존한다.

## equals와 일관된 비교 기준

다음 두 식의 참·거짓이 항상 같도록 비교 기준을 만드는 것이 equals와 일관된 비교다.

```java
a.equals(b)
comparator.compare(a, b) == 0
```

- equals가 true이면 비교 결과도 0이어야 한다.
- equals가 false이면 비교 결과도 0이 아니어야 한다.

일관되지 않으면 다음 문제가 생길 수 있다.

- equals는 false인데 비교 결과가 0: 서로 다른 요소인데 TreeSet에는 하나만 저장될 수 있다.
- equals는 true인데 비교 결과가 0이 아님: 같은 요소로 보아야 하는데 둘 다 저장될 수 있다.

문서의 수학적 설명에서는 `compare(x, y) == 0`인 객체끼리 묶은 그룹과 `x.equals(y)`가 true인 객체끼리 묶은 그룹이 같아야 한다. 이렇게 같은 것으로 묶인 그룹을 동치류라고 한다.

## 자연 정렬과 null

자연 정렬은 Comparable의 `compareTo()`가 제공하는 기본 정렬 기준이다. 정수의 오름차순과 문자열의 사전순이 대표적인 예다.

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

- `nullsFirst()`는 null을 다른 값보다 앞에 배치한다.
- 모든 Comparator가 자동으로 null을 처리하는 것은 아니다.

## Comparator와 직렬화

직렬화는 객체 상태를 저장하거나 전송할 수 있도록 바이트 형태로 변환하는 것이다.

- TreeSet이나 TreeMap을 직렬화할 때는 지정한 Comparator도 `Serializable`을 구현해야 한다.
- 저장된 요소 등 다른 직렬화 대상도 직렬화 가능해야 한다.
- 객체 직렬화의 전체 흐름은 [IO와 NIO 파일 처리](</wiki/01%20%EA%B0%9C%EB%85%90/Java/IO%EC%99%80%20NIO%20%ED%8C%8C%EC%9D%BC%20%EC%B2%98%EB%A6%AC#%EA%B0%9D%EC%B2%B4-%EC%A7%81%EB%A0%AC%ED%99%94%EC%99%80-%EC%97%AD%EC%A7%81%EB%A0%AC%ED%99%94>)에서 확인한다.

## 흔한 실수

- `compare()`가 반드시 -1, 0, 1만 반환해야 한다고 생각한다. 부호가 중요하다.
- TreeSet의 비교 결과 0을 단순히 정렬 위치만 같다는 뜻으로 생각한다.
- null 처리용 Comparator 없이 자연 정렬 TreeSet에 null을 추가한다.
- 직렬화할 컬렉션의 Comparator 직렬화 가능 여부를 확인하지 않는다.

## 출처

- [2026-09-22 Java 컬렉션 다형성 Comparator 정리](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-09-22%20Java%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%8B%A4%ED%98%95%EC%84%B1%20Comparator%20%EC%A0%95%EB%A6%AC>)
