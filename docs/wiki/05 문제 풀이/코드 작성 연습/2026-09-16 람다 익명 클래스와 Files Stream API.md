---
type: coding-practice
area: Java
topic: 람다·익명 클래스와 Files Stream API
created: 2026-09-16
updated: 2026-09-16
---

# 람다 ↔ 익명 클래스 + Files.list/filter/forEach 정리

## 1. 함수형 인터페이스 4개

### Consumer\<T>

```text
Consumer<T>
→ accept(T)
→ 값을 하나 받음
→ 반환값 없음
→ "받아서 소비/처리"
```

예시 람다:

```java
Consumer<String> c = s -> System.out.println(s);
```

익명 클래스:

```java
Consumer<String> c = new Consumer<String>() {
    @Override
    public void accept(String s) {
        System.out.println(s);
    }
};
```

### Predicate\<T>

```text
Predicate<T>
→ test(T)
→ 값을 하나 받음
→ boolean 반환
→ "조건 판단"
```

예시 람다:

```java
Predicate<Integer> p = n -> n % 2 == 0;
```

익명 클래스:

```java
Predicate<Integer> p = new Predicate<Integer>() {
    @Override
    public boolean test(Integer n) {
        return n % 2 == 0;
    }
};
```

### Function\<T, R>

```text
Function<T, R>
→ apply(T)
→ T를 받음
→ R을 반환
→ "값을 다른 값으로 변환"
```

예시 람다:

```java
Function<String, Integer> f = s -> s.length();
```

익명 클래스:

```java
Function<String, Integer> f = new Function<String, Integer>() {
    @Override
    public Integer apply(String s) {
        return s.length();
    }
};
```

### Supplier\<T>

```text
Supplier<T>
→ get()
→ 입력값 없음
→ T 반환
→ "값을 공급"
```

예시 람다:

```java
Supplier<String> s = () -> "java";
```

익명 클래스:

```java
Supplier<String> s = new Supplier<String>() {
    @Override
    public String get() {
        return "java";
    }
};
```

## 2. 람다를 익명 클래스로 바꾸는 순서

1. 어떤 함수형 인터페이스인지 확인
2. 추상 메서드 이름 확인
3. 매개변수 확인
4. 반환형 확인
5. 람다 내용을 메서드 몸체로 옮김

예:

```java
Predicate<Integer> p = n -> n >= 60;
```

```text
Predicate
→ test(T)
→ boolean 반환
```

익명 클래스로:

```java
Predicate<Integer> p = new Predicate<Integer>() {
    @Override
    public boolean test(Integer n) {
        return n >= 60;
    }
};
```

## 3. Files.list() 코드

```java
Path path = Path.of("C:/study");

Files.list(path)
        .filter(p -> p.getFileName().toString().endsWith(".java"))
        .forEach(p -> System.out.println(p.getFileName()));
```

## 4. Files.list(path)의 반환형

Files API에서 `list()`를 보면:

```java
Stream<Path> list(Path dir)
```

```text
Files.list(path)
↓
Stream<Path>
```

`Stream<Path>`는 Path 타입 값들이 여러 개 흘러가는 Stream이다.

예:

```text
Main.java
Test.java
memo.txt
images
```

각각 하나의 Path라고 보면 된다.

## 5. filter()는 어디서 찾나?

`Files.list(path)`의 반환형이 `Stream<Path>`이므로 그 뒤에 붙는 `filter()`는 Stream API에서 찾는다.

Stream API:

```java
Stream<T> filter(Predicate<? super T> predicate)
```

읽는 법:

```text
Stream<T>
→ 반환형

Predicate<? super T>
→ 매개변수 타입

predicate
→ 매개변수 이름
```

현재 T는 Path이므로 초급 단계에서는 다음 정도로 생각하면 된다.

```java
filter(Predicate<Path> predicate)
```

## 6. filter 안의 람다

```java
.filter(p -> p.getFileName().toString().endsWith(".java"))
```

filter는 Predicate를 받는다.

```text
Predicate<Path>
→ test(Path p)
→ boolean 반환
```

익명 클래스로 바꾸면:

```java
.filter(
    new Predicate<Path>() {
        @Override
        public boolean test(Path p) {
            return p.getFileName()
                    .toString()
                    .endsWith(".java");
        }
    }
)
```

즉:

```java
p -> p.getFileName().toString().endsWith(".java")
```

는 사실상 다음을 짧게 쓴 것이다.

```java
public boolean test(Path p) {
    return p.getFileName()
            .toString()
            .endsWith(".java");
}
```

## 7. filter()의 반환형

`filter()`도 다시 Stream을 반환한다.

처음:

```text
Stream<Path>

Main.java
Test.java
memo.txt
images
```

filter 후:

```text
Stream<Path>

Main.java
Test.java
```

즉:

```text
Stream<Path>
→ filter
→ Stream<Path>
```

filter는 요소를 걸러낼 뿐 요소의 타입 자체는 바꾸지 않는다.

## 8. forEach()

`filter()`의 반환형도 `Stream<Path>`이므로 `forEach()`도 Stream API에서 찾는다.

`forEach()`는 Consumer를 받는다.

```text
Consumer<Path>
→ accept(Path p)
→ 반환형 void
```

람다:

```java
.forEach(p -> System.out.println(p.getFileName()))
```

익명 클래스로:

```java
.forEach(
    new Consumer<Path>() {
        @Override
        public void accept(Path p) {
            System.out.println(p.getFileName());
        }
    }
)
```

## 9. 전체 흐름

```text
Files.list(path)
↓
Stream<Path>

filter(...)
↓
Predicate<Path>
↓
조건을 true/false로 판단
↓
true인 Path만 남김
↓
Stream<Path>

forEach(...)
↓
Consumer<Path>
↓
남아 있는 Path를 하나씩 받아 처리
↓
출력
```

## 10. 중요한 점

```java
.filter(p -> ...)
.forEach(p -> ...)
```

두 람다에서 `p`라는 이름을 똑같이 썼지만 같은 변수 하나를 공유하는 것이 아니다. 각 람다의 독립적인 매개변수다.

## 11. API 찾는 핵심 습관

점(`.`) 앞의 타입을 확인한다.

```text
Files.list(path)
↓
반환형 Stream<Path>

.filter(...)
↓
Stream API에서 찾기

filter() 반환형도 Stream<Path>

.forEach(...)
↓
Stream API에서 찾기
```
