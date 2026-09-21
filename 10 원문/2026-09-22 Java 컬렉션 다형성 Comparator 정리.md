# Java 컬렉션 · 다형성 · Comparator 정리

## 1. ListIterator의 previous()

- 현재 커서 바로 앞 요소를 반환하고 커서를 뒤로 한 칸 이동한다.
- 항상 맨 끝에서 시작하는 것이 아니라 현재 커서 위치부터 역방향으로 이동한다.

예: `[Java, SQL]`을 `next()`로 끝까지 순회한 상태

```java
while (it.hasPrevious()) {
    System.out.println(it.previous()); // SQL → Java
}
```

## 2. HashSet / LinkedHashSet / TreeSet

| 종류 | 순회 순서 | 중복 판단 |
| --- | --- | --- |
| HashSet | 순서 보장 없음 | `hashCode()`와 `equals()` |
| LinkedHashSet | 삽입 순서 유지 | `hashCode()`와 `equals()` |
| TreeSet | 정렬 순서 | 비교 결과가 0인지 |

- 모두 Set 계열이므로 중복을 허용하지 않는다.
- HashSet의 순서 보장 없음은 매번 무작위라는 뜻이 아니다.
- LinkedHashSet에 이미 있는 요소를 `add()`해도 기존 위치는 바뀌지 않는다.

## 3. 인터페이스 구현과 다형성

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

예:

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

## 4. Java 문서 영어 표현

```text
All Known Implementing Classes
→ 이 인터페이스를 구현하는 것으로 알려진 모든 클래스
→ NavigableSet 문서에서 TreeSet 등을 보여준다.

All Implemented Interfaces
→ 이 클래스가 구현한 모든 인터페이스
→ TreeSet 문서에서 NavigableSet, SortedSet, Set 등을 보여준다.

Implementing Classes
→ 구현하는 클래스들

Implemented Interfaces
→ 구현된 인터페이스들
```

- Implemented는 여기서 “구현했다”가 아니라 “구현된”이라는 뜻이다.
- 뒤의 Interfaces를 꾸며준다.
- 직접 구현뿐 아니라 간접적인 구현 관계도 포함된다.

## 5. Comparator의 역할

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

## 6. 문자열 길이 비교: 메서드 참조 → 람다 → 익명 클래스

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

차이:

- `String::length`와 `s -> s.length()`
  - 문자열 하나를 받아 길이를 반환한다.
- `(s1, s2) -> Integer.compare(s1.length(), s2.length())`
  - 문자열 두 개를 받아 길이를 비교한 결과를 반환한다.
- `Comparator.comparingInt()`
  - 정수를 추출하는 함수를 받아 Comparator를 만들어준다.

사용 예:

```java
byLength.compare("DB", "Java");   // 음수
byLength.compare("Java", "Ruby"); // 0
byLength.compare("Python", "DB"); // 양수
```

## 7. TreeSet은 비교 결과가 0이면 중복으로 판단한다

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

## 8. equals와 일관된 비교 기준

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

## 9. 자연 정렬과 null

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

## 10. Serializable과 직렬화

- 직렬화는 객체 상태를 저장하거나 전송할 수 있도록 바이트 형태로 변환하는 것이다.
- TreeSet이나 TreeMap을 직렬화할 때는 지정한 Comparator도 Serializable을 구현해야 한다.
- 저장된 요소 등 다른 직렬화 대상도 직렬화 가능해야 한다.
