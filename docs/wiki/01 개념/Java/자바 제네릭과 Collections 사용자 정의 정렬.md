---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "백엔드에서 데이터 저장과 타입 안전성 및 정렬에 사용하는 핵심 지식이다."
difficulty: 초급
status: growing
curriculum_stage: 8
prerequisites: []
related: []
sources:
  - "[2026-10-11 자바 제네릭과 Collections 사용자 정의 정렬](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-10-11%20%EC%9E%90%EB%B0%94%20%EC%A0%9C%EB%84%A4%EB%A6%AD%EA%B3%BC%20Collections%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%A0%95%EC%9D%98%20%EC%A0%95%EB%A0%AC>)"
created: 2026-10-11
updated: 2026-10-11
---

# 자바 제네릭과 Collections 사용자 정의 정렬

# PART 2. 자바 제네릭과 Collections 사용자 정의 정렬

## 1. 제네릭(Generic)과 타입 안정성

> 제네릭은 클래스, 인터페이스, 메서드가 다룰 타입을 매개변수로 지정하여 컴파일 단계에서 타입을 검사하는 기능이다.

### 1-1. 제네릭이 필요한 이유

제네릭을 사용하지 않으면 서로 다른 타입의 객체를 하나의 컬렉션에 저장할 수 있다.

```java
List list = new ArrayList();

list.add("홍길동");
list.add(100);
list.add(true);
```

이러한 선언을 로 타입(Raw Type)이라고 한다.

문제는 데이터를 꺼낼 때 발생한다.

```java
String name = (String) list.get(1);
```

인덱스 1에 저장된 객체는 Integer이므로 ClassCastException이 발생한다.

### 1-2. 제네릭 사용

```java
List<String> names = new ArrayList<>();

names.add("홍길동");
names.add("김철수");

// names.add(100); // 컴파일 오류
```

List<String>은 String 타입의 요소를 저장하도록 제한한다.

```java
String name = names.get(0);
```

명시적인 다운캐스팅도 필요하지 않다.

### 1-3. 기본형과 래퍼 클래스

제네릭 타입 인수에는 기본형을 직접 사용할 수 없다.

```java
List<int> numbers; // 컴파일 오류
```

대신 래퍼 클래스를 사용한다.

```java
List<Integer> numbers = new ArrayList<>();
```

주요 대응 관계:

| 기본형 | 래퍼 클래스 |
|---|---|
| int | Integer |
| long | Long |
| double | Double |
| float | Float |
| boolean | Boolean |
| char | Character |
| byte | Byte |
| short | Short |

### 1-4. 오토박싱과 언박싱

```java
List<Integer> numbers = new ArrayList<>();

numbers.add(100);

int value = numbers.get(0);
```

numbers.add(100)에서는 int가 Integer로 자동 박싱된다.

numbers.get(0)의 결과를 int에 대입할 때는 자동 언박싱된다.

개념적으로 다음과 같다.

```java
numbers.add(Integer.valueOf(100));

int value = numbers.get(0).intValue();
```

주의할 점:

```java
Integer number = null;

int value = number;
```

null을 언박싱하려고 하면 NullPointerException이 발생한다.

---

## 2. 제네릭 클래스와 타입 매개변수

### 2-1. 제네릭 클래스

```java
class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

사용 예제:

```java
Box<String> box1 = new Box<>();
Box<Integer> box2 = new Box<>();

box1.setValue("Java");
box2.setValue(100);

System.out.println(box1.getValue());
System.out.println(box2.getValue());
```

실행 결과:

```text
Java
100
```

T는 실제 타입이 지정될 위치를 나타내는 타입 매개변수이다.

```text
Box<String>  → T를 String으로 사용

Box<Integer> → T를 Integer로 사용
```

제네릭 클래스 하나를 여러 타입에 재사용할 수 있다.

### 2-2. 제네릭 타입 매개변수 이름

자주 사용하는 이름:

| 이름 | 일반적인 의미 |
|---|---|
| T | Type |
| E | Element |
| K | Key |
| V | Value |
| R | Result |
| N | Number |

예제:

```java
Map<K, V>
List<E>
Comparator<T>
```

이름은 관례일 뿐이며 문법적으로 반드시 해당 문자만 사용해야 하는 것은 아니다.

---

## 3. 제한된 타입 매개변수

> 타입 매개변수에 상한을 지정하면 특정 클래스나 인터페이스 계층에 속한 타입만 허용할 수 있다.

### 3-1. extends를 사용하는 이유

```java
class Animal {
}

class Dog extends Animal {
}

class Cat extends Animal {
}
```

Animal 계층에 속한 객체만 저장하는 클래스를 만들 수 있다.

```java
class House<T extends Animal> {
    private T animal;

    public void enter(T animal) {
        this.animal = animal;
    }

    public T getAnimal() {
        return animal;
    }
}
```

사용 예제:

```java
House<Dog> dogHouse = new House<>();
dogHouse.enter(new Dog());

House<Cat> catHouse = new House<>();
catHouse.enter(new Cat());
```

반면 다음 코드는 컴파일 오류가 발생한다.

```java
House<String> house = new House<>();
```

String은 Animal의 하위 타입이 아니기 때문이다.

### 3-2. extends와 implements

제네릭 타입 경계에서는 클래스 상속과 인터페이스 구현 모두 extends를 사용한다.

예를 들어:

```java
class Box<T extends Comparable<T>> {
}
```

Comparable은 인터페이스지만 제네릭 경계에서는 extends를 사용한다.

### 3-3. 여러 타입 경계

```java
class Box<T extends Number & Comparable<T>> {
}
```

의미:

T는 Number의 하위 타입이면서 Comparable<T>를 구현해야 한다.

여러 경계를 사용할 경우 클래스 경계가 있다면 클래스가 먼저 와야 한다.

---

## 4. 제네릭 메서드

제네릭은 클래스뿐 아니라 메서드에도 적용할 수 있다.

```java
class Printer {
    public static <T> void print(T value) {
        System.out.println(value);
    }
}
```

사용:

```java
Printer.print("Java");
Printer.print(100);
Printer.print(true);
```

실행 결과:

```text
Java
100
true
```

메서드 선언의 다음 부분을 주의해서 보자.

```java
public static <T> void print(T value)
```

- <T>: 메서드 타입 매개변수 선언
- void: 반환 타입
- T value: 매개변수 타입

static 메서드는 클래스에 선언된 타입 매개변수 T를 그대로 사용할 수 없다.

필요하다면 메서드 자체의 타입 매개변수를 선언해야 한다.

---

## 5. 와일드카드와 제네릭의 불공변성

> 와일드카드는 정확한 타입을 특정하지 않고 일정한 타입 범위를 허용하는 문법이다.

### 5-1. List<Object>와 List<String>

다음 코드는 컴파일 오류가 발생한다.

```java
List<String> strings = new ArrayList<>();

List<Object> objects = strings;
```

String은 Object의 하위 타입이지만, List<String>이 List<Object>의 하위 타입인 것은 아니다.

이를 제네릭의 불공변성이라고 한다.

### 5-2. ? extends T

```java
public static void printNumbers(
    List<? extends Number> numbers
) {
    for (Number number : numbers) {
        System.out.println(number);
    }
}
```

호출 예제:

```java
printNumbers(List.of(1, 2, 3));
printNumbers(List.of(1.5, 2.5));
```

Number의 하위 타입 요소를 가진 리스트를 전달할 수 있다.

하지만 일반적으로 null 이외의 새로운 요소를 추가할 수 없다.

정확한 실제 요소 타입을 알 수 없기 때문이다.

### 5-3. ? super T

```java
public static void addNumbers(
    List<? super Integer> numbers
) {
    numbers.add(10);
    numbers.add(20);
}
```

Integer 또는 Integer의 상위 타입을 요소 타입으로 가지는 리스트를 받을 수 있다.

Integer 값을 추가하는 것은 안전하다.

### 5-4. PECS 원칙

```text
Producer Extends
Consumer Super
```

의미:

- 데이터를 꺼내 읽는 생산자라면 extends
- 데이터를 넣는 소비자라면 super

단, 읽기와 쓰기가 모두 필요한 경우에는 정확한 타입 매개변수를 사용하는 편이 적절할 수 있다.

---

## 6. Collections 유틸리티 클래스

> Collections는 컬렉션을 정렬, 반전, 섞기, 검색하는 정적 유틸리티 메서드를 제공한다.

Collection과 Collections는 서로 다르다.

| 구분 | 역할 |
|---|---|
| Collection | 컬렉션의 공통 인터페이스 |
| Collections | 컬렉션 처리 유틸리티 클래스 |

### 6-1. 주요 메서드

| 메서드 | 기능 |
|---|---|
| sort() | 리스트 정렬 |
| reverse() | 요소 순서 반전 |
| shuffle() | 요소 무작위 섞기 |
| max() | 최댓값 조회 |
| min() | 최솟값 조회 |
| frequency() | 특정 요소 등장 횟수 |
| binarySearch() | 정렬된 리스트에서 이진 탐색 |
| swap() | 두 요소 위치 교환 |
| fill() | 리스트의 요소를 지정한 값으로 교체 |

### 6-2. 기본 사용 예제

```java
List<Integer> values =
    new ArrayList<>(List.of(1, 3, 2, 4, 5));

Collections.sort(values);
System.out.println(values);

Collections.reverse(values);
System.out.println(values);

System.out.println(Collections.max(values));
System.out.println(Collections.min(values));
```

실행 결과:

```text
[1, 2, 3, 4, 5]
[5, 4, 3, 2, 1]
5
1
```

### 6-3. shuffle()

```java
Collections.shuffle(values);

System.out.println(values);
```

shuffle()은 요소 순서를 무작위로 섞는다.

실행 결과는 매번 달라질 수 있다.

예시:

```text
[3, 1, 5, 2, 4]
```

### 6-4. reverse()와 내림차순 정렬의 차이

reverse()는 현재 순서를 반전시킨다.

```java
List<Integer> numbers =
    new ArrayList<>(List.of(3, 1, 2));

Collections.reverse(numbers);

System.out.println(numbers);
```

실행 결과:

```text
[2, 1, 3]
```

내림차순으로 정렬된 것은 아니다.

내림차순 정렬을 원한다면 다음처럼 작성한다.

```java
numbers.sort(Comparator.reverseOrder());
```

결과:

```text
[3, 2, 1]
```

reverse()는 정렬 메서드가 아니라 순서 반전 메서드라는 점이 중요하다.

---

## 7. Comparable과 Comparator

> Comparable은 객체 자체의 자연 정렬 기준을 제공하고, Comparator는 외부에서 정렬 기준을 정의한다.

### 7-1. Comparable

Comparable은 다음 메서드를 가진다.

```java
int compareTo(T other);
```

예제:

```java
class Student implements Comparable<Student> {
    private int score;

    Student(int score) {
        this.score = score;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.score, other.score);
    }
}
```

이 클래스의 자연 정렬 기준은 점수 오름차순이다.

### 7-2. Comparator

Comparator는 다음 추상 메서드를 가진다.

```java
int compare(T first, T second);
```

예제:

```java
Comparator<Integer> comparator =
    (a, b) -> Integer.compare(b, a);
```

내림차순 비교 기준을 정의한 것이다.

### 7-3. 차이 비교

| 구분 | Comparable | Comparator |
|---|---|---|
| 메서드 | compareTo() | compare() |
| 구현 위치 | 비교 대상 클래스 | 외부 비교 객체 |
| 주요 용도 | 자연 정렬 | 사용자 정의 정렬 |
| 정렬 기준 개수 | 클래스의 기본 기준 하나 | 여러 기준 생성 가능 |
| 람다식 | 인터페이스 구현 객체에 람다 사용 불가 | 람다 사용 가능 |

Comparable의 compareTo()도 음수, 0, 양수로 비교 결과를 표현한다.

---

## 8. sort(), Comparator, compare()의 역할

> sort()는 실제 정렬을 수행하고, Comparator는 비교 기준을 제공하며, compare()는 두 요소의 정렬 우선순위를 반환한다.

### 8-1. 기본 코드

```java
List<Integer> numbers =
    new ArrayList<>(List.of(30, 10, 20));

Comparator<Integer> comp =
    (a, b) -> Integer.compare(b, a);

numbers.sort(comp);

System.out.println(numbers);
```

실행 결과:

```text
[30, 20, 10]
```

### 8-2. 실행 과정

첫 번째:

```java
Comparator<Integer> comp =
    (a, b) -> Integer.compare(b, a);
```

이 코드는 정렬 기준을 정의하고 Comparator 객체를 준비한다.

아직 정렬이 실행되지 않는다.

두 번째:

```java
numbers.sort(comp);
```

여기서 정렬이 시작된다.

전체 흐름:

```text
numbers.sort(comp)
        |
        v
List의 sort() 실행
        |
        v
정렬 알고리즘 동작
        |
        v
Comparator.compare(a, b) 호출
        |
        v
Integer.compare(b, a) 실행
        |
        v
음수 / 0 / 양수 반환
        |
        v
비교 결과를 이용해 정렬 진행
        |
        v
[30, 20, 10]
```

중요한 점:

Comparator가 직접 요소를 이동시키는 것은 아니다.

Comparator는 비교 결과를 알려주고, sort()가 이를 이용해 정렬한다.

### 8-3. 메서드의 소속

| 메서드 | 소속 |
|---|---|
| sort(Comparator) | List 인터페이스 |
| sort(List) | Collections 클래스 |
| sort(List, Comparator) | Collections 클래스 |
| sort(array) | Arrays 클래스 |
| compare() | Comparator 인터페이스 |
| compareTo() | Comparable 인터페이스 |
| Integer.compare() | Integer 클래스 |

---

## 9. compare() 반환값의 의미

```java
int compare(T a, T b);
```

Comparator.compare(a, b)의 결과에서 중요한 것은 부호이다.

| 반환값 | 의미 |
|---|---|
| 음수 | a가 b보다 앞에 와야 함 |
| 0 | 정렬 기준상 우선순위가 같음 |
| 양수 | a가 b보다 뒤에 와야 함 |

중요:

반환값 0이 동일한 객체를 의미하는 것은 아니다.

정렬 기준상 우선순위가 같다는 뜻이다.

### 9-1. 반드시 -1, 0, 1인가?

반드시 그렇지는 않다.

```java
Comparator<Integer> comp = (a, b) -> {
    if (a < b) {
        return -100;
    }

    if (a > b) {
        return 100;
    }

    return 0;
};
```

이 코드도 올바른 비교 기준이다.

일반적인 Comparator 계약에서 중요한 것은 반환값의 부호이다.

다만 Integer.compare()는 -1, 0, 1 중 하나를 반환한다.

---

## 10. Integer.compare(a, b) 오름차순

```java
Comparator<Integer> comp =
    (a, b) -> Integer.compare(a, b);
```

### 10-1. a=10, b=30

```java
Integer.compare(10, 30);
```

실행 결과:

```text
-1
```

비교 결과가 음수이므로 a가 앞에 와야 한다.

```text
a = 10
b = 30

반환값 = -1

a 우선

10 → 30
```

### 10-2. a=30, b=10

```java
Integer.compare(30, 10);
```

실행 결과:

```text
1
```

반환값이 양수이므로 b가 앞에 와야 한다.

```text
a = 30
b = 10

반환값 = 1

b 우선

10 → 30
```

따라서 Integer.compare(a, b)는 오름차순이다.

---

## 11. Integer.compare(b, a) 내림차순

> 비교 메서드에 전달하는 인자의 순서를 바꾸면 정렬 우선순위가 반대로 적용된다.

### 11-1. a=10, b=30

```java
Comparator<Integer> comp =
    (a, b) -> Integer.compare(b, a);
```

실제 계산:

```java
Integer.compare(30, 10);
```

결과:

```text
1
```

여기서 중요한 점:

Integer.compare()의 인자 순서를 바꾸었지만 Comparator의 원래 매개변수 a와 b는 그대로이다.

```text
원래 매개변수

a = 10
b = 30
```

반환값이 양수이므로 원래 a가 b보다 뒤에 와야 한다.

```text
a = 10
b = 30

Integer.compare(b, a)
        |
        v
Integer.compare(30, 10)
        |
        v
1 반환
        |
        v
a가 뒤에 와야 함
        |
        v
b = 30이 앞
a = 10이 뒤
        |
        v
30 → 10
```

### 11-2. a=50, b=20

```java
Integer.compare(b, a);
```

실제 계산:

```java
Integer.compare(20, 50);
```

결과:

```text
-1
```

음수이므로 원래 a가 b보다 앞에 와야 한다.

```text
a = 50
b = 20

반환값 = -1

a 우선

50 → 20
```

### 11-3. 최종 비교

| a | b | compare(a,b) | compare(b,a) |
|---|---|---|---|
| 10 | 30 | -1 | 1 |
| 50 | 20 | 1 | -1 |
| 40 | 40 | 0 | 0 |

정리:

```java
Integer.compare(a, b) // 오름차순

Integer.compare(b, a) // 내림차순
```

주의:

Integer.compare(b, a)가 실제로 a와 b를 교환하는 것은 아니다.

비교 결과의 부호를 반대로 만들어 정렬 우선순위를 바꾸는 것이다.

---

## 12. sort()는 compare()를 언제 호출할까?

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        List<Integer> numbers =
            new ArrayList<>(List.of(30, 10, 20));

        Comparator<Integer> comp = (a, b) -> {
            System.out.println("비교: " + a + ", " + b);

            return Integer.compare(a, b);
        };

        numbers.sort(comp);

        System.out.println(numbers);
    }
}
```

Comparator를 정의한 시점에는 비교 출력이 발생하지 않는다.

numbers.sort(comp)를 실행하면 정렬 과정에서 compare()가 호출된다.

비교 호출 예시:

```text
비교: 10, 30
비교: 20, 10
비교: 20, 30
비교: 20, 10

[10, 20, 30]
```

비교 순서와 횟수는 정렬 구현 및 입력 데이터에 따라 달라질 수 있다.

sort()는 비교 결과를 이용하지만, 양수가 나왔다고 반드시 즉시 두 요소를 교환하는 것은 아니다.

요소 이동 방식은 정렬 알고리즘에 따라 달라진다.

---

## 13. 사용자 정의 객체 정렬

### 13-1. Address 클래스

```java
class Address {
    private String name;
    private String address;
    private String phone;

    Address(String name, String address, String phone) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }

    @Override
    public String toString() {
        return name + " / " + address + " / " + phone;
    }
}
```

### 13-2. Comparator 구현 클래스

```java
class AddressComparator implements Comparator<Address> {

    @Override
    public int compare(Address first, Address second) {
        return first.getName().compareTo(second.getName());
    }
}
```

사용 예제:

```java
List<Address> addresses = new ArrayList<>();

addresses.add(new Address("김철수", "서울", "010-1111"));
addresses.add(new Address("홍길동", "부산", "010-2222"));
addresses.add(new Address("이순신", "대전", "010-3333"));

Collections.sort(addresses, new AddressComparator());

for (Address address : addresses) {
    System.out.println(address);
}
```

이름 오름차순으로 정렬된다.

### 13-3. compareTo()가 호출되는 이유

```java
first.getName().compareTo(second.getName())
```

getName()의 반환 타입은 String이다.

String은 Comparable<String>을 구현하고 있다.

따라서 String의 compareTo()를 이용할 수 있다.

문자열은 사전식 순서를 기준으로 비교된다.

이 비교는 일반적인 사람 이름의 국어사전식 정렬이나 지역화 정렬과는 차이가 있을 수 있다.

---

## 14. 익명 클래스와 Comparator

한 번 사용할 비교 기준을 위해 별도의 클래스를 만들 필요는 없다.

### 14-1. 익명 클래스

```java
Collections.sort(addresses, new Comparator<Address>() {

    @Override
    public int compare(Address a, Address b) {
        return a.getName().compareTo(b.getName());
    }
});
```

new Comparator<Address>() { ... }는 Comparator 인터페이스 자체를 직접 생성하는 것이 아니다.

Comparator를 구현하는 이름 없는 클래스를 정의하면서 그 객체를 생성하는 것이다.

### 14-2. 람다식

Comparator는 함수형 인터페이스이다.

따라서 람다식으로 표현할 수 있다.

```java
addresses.sort(
    (a, b) -> a.getName().compareTo(b.getName())
);
```

익명 클래스의 compare() 메서드를 간결하게 표현한 것이다.

### 14-3. 람다식과 실제 실행 시점

```java
Comparator<Address> comp =
    (a, b) -> a.getName().compareTo(b.getName());
```

이 코드는 비교 동작을 정의한다.

실제 비교는 sort()가 비교를 요청할 때 수행된다.

```java
addresses.sort(comp);
```

이 부분에서 정렬이 시작된다.

---

## 15. Comparator.comparing()

자바에서는 Comparator의 정적 메서드를 이용하여 비교 기준을 더 간결하게 만들 수 있다.

```java
addresses.sort(
    Comparator.comparing(Address::getName)
);
```

Address::getName은 메서드 참조이다.

다음 람다와 같은 값을 추출하는 기능을 한다.

```java
address -> address.getName()
```

### 15-1. 내림차순

```java
addresses.sort(
    Comparator.comparing(Address::getName).reversed()
);
```

reversed()는 비교 기준을 반대로 만든다.

### 15-2. 주소 기준 정렬

```java
addresses.sort(
    Comparator.comparing(Address::getAddress)
);
```

### 15-3. 전화번호 기준 정렬

```java
addresses.sort(
    Comparator.comparing(Address::getPhone)
);
```

전화번호를 String으로 비교하면 문자열의 사전식 순서로 정렬된다.

전화번호를 숫자로 변환하여 크기를 비교하는 것은 일반적으로 적절하지 않다.

---

## 16. 여러 조건으로 정렬하기

### 16-1. 점수 내림차순 + 학번 오름차순

```java
class Student {
    private int studentNo;
    private int score;

    Student(int studentNo, int score) {
        this.studentNo = studentNo;
        this.score = score;
    }

    public int getStudentNo() {
        return studentNo;
    }

    public int getScore() {
        return score;
    }

    @Override
    public String toString() {
        return studentNo + " : " + score;
    }
}
```

데이터:

```java
List<Student> students = new ArrayList<>();

students.add(new Student(103, 90));
students.add(new Student(101, 95));
students.add(new Student(102, 90));
students.add(new Student(104, 95));
```

정렬 기준:

1. 점수가 높은 학생 먼저
2. 점수가 같으면 학번이 작은 학생 먼저

### 16-2. 직접 compare() 구현

```java
students.sort((a, b) -> {

    int result = Integer.compare(b.getScore(), a.getScore());

    if (result != 0) {
        return result;
    }

    return Integer.compare(a.getStudentNo(), b.getStudentNo());
});
```

실행 결과:

```text
101 : 95
104 : 95
102 : 90
103 : 90
```

### 16-3. 실행 과정

a와 b의 점수를 먼저 비교한다.

```java
Integer.compare(b.getScore(), a.getScore())
```

점수가 다르면 그 결과를 즉시 반환한다.

점수가 같으면 반환값이 0이므로 다음 비교를 수행한다.

```java
Integer.compare(a.getStudentNo(), b.getStudentNo())
```

학번은 오름차순이므로 a, b 순서로 비교한다.

### 16-4. comparingInt()와 thenComparingInt()

```java
students.sort(
    Comparator.comparingInt(Student::getScore)
        .reversed()
        .thenComparingInt(Student::getStudentNo)
);
```

의미:

1. 점수를 기준으로 정렬
2. reversed()로 점수 내림차순
3. 점수가 같으면 학번 오름차순

주의할 점:

```java
Comparator.comparingInt(Student::getScore)
    .thenComparingInt(Student::getStudentNo)
    .reversed()
```

이렇게 작성하면 전체 비교 기준이 뒤집힌다.

즉, 점수뿐 아니라 학번 정렬 방향도 반전된다.

reversed()를 어느 위치에 적용하는지 중요하다.

---

## 17. 정렬 기준을 선택하는 Comparator

이름, 주소, 전화번호 중 하나를 기준으로 정렬해야 한다고 가정한다.

### 17-1. switch 활용

```java
class AddressComparator implements Comparator<Address> {

    public static final int NAME = 1;
    public static final int ADDRESS = 2;
    public static final int PHONE = 3;

    private final int sortType;

    AddressComparator(int sortType) {
        if (sortType < NAME || sortType > PHONE) {
            throw new IllegalArgumentException("잘못된 정렬 기준");
        }

        this.sortType = sortType;
    }

    @Override
    public int compare(Address a, Address b) {

        return switch (sortType) {
            case NAME ->
                a.getName().compareTo(b.getName());

            case ADDRESS ->
                a.getAddress().compareTo(b.getAddress());

            case PHONE ->
                a.getPhone().compareTo(b.getPhone());

            default ->
                throw new IllegalArgumentException("잘못된 정렬 기준");
        };
    }
}
```

사용 예제:

```java
addresses.sort(new AddressComparator(AddressComparator.NAME));
```

이름을 기준으로 정렬한다.

```java
addresses.sort(new AddressComparator(AddressComparator.ADDRESS));
```

주소를 기준으로 정렬한다.

```java
addresses.sort(new AddressComparator(AddressComparator.PHONE));
```

전화번호를 기준으로 정렬한다.

이 예제에서는 getter가 반환하는 문자열이 null이 아니라고 가정한다.

### 17-2. enum으로 정렬 기준 표현

실무에서는 숫자 상수 대신 enum을 사용할 수도 있다.

```java
enum SortType {
    NAME,
    ADDRESS,
    PHONE
}
```

enum을 사용하면 허용된 정렬 기준을 타입으로 표현할 수 있어 잘못된 숫자 전달을 줄일 수 있다.

---

## 18. Comparator와 null 처리

다음 코드를 살펴보자.

```java
List<String> names =
    new ArrayList<>(Arrays.asList("Kim", null, "Lee"));
```

일반적인 자연 정렬은 null 비교 과정에서 NullPointerException이 발생할 수 있다.

null을 명시적으로 처리하려면 다음 기능을 사용할 수 있다.

### 18-1. nullsFirst()

```java
names.sort(
    Comparator.nullsFirst(Comparator.naturalOrder())
);
```

실행 결과:

```text
[null, Kim, Lee]
```

### 18-2. nullsLast()

```java
names.sort(
    Comparator.nullsLast(Comparator.naturalOrder())
);
```

실행 결과:

```text
[Kim, Lee, null]
```

데이터베이스에서 조회한 값처럼 null이 존재할 수 있는 데이터를 정렬할 때 유용하다.

---

## 19. 정렬 안정성(Stable Sort)

> 안정 정렬은 비교 결과가 같은 요소들의 기존 상대적 순서를 유지하는 정렬이다.

다음 데이터가 있다고 가정한다.

```text
학생 A : 90점
학생 B : 80점
학생 C : 90점
```

점수 내림차순 정렬 결과:

```text
학생 A : 90점
학생 C : 90점
학생 B : 80점
```

A와 C의 점수가 같으므로 기존 순서인 A → C가 유지된다.

Java의 List.sort()와 Collections.sort()는 안정 정렬을 보장한다.

따라서 복합 정렬 기준을 적용할 때도 이를 활용할 수 있다.

---

## 20. Comparator의 규칙과 주의사항

Comparator는 일관된 비교 규칙을 제공해야 한다.

중요한 성질:

1. compare(a, b)의 부호는 compare(b, a)의 부호와 반대여야 한다.
2. a가 b보다 앞이고 b가 c보다 앞이면 a는 c보다 앞이어야 한다.
3. compare(a, b)가 0이면 다른 요소 z에 대한 a와 b의 비교 부호도 같아야 한다.

이 규칙을 위반하면 정렬 결과가 일관되지 않거나, 일부 정렬 구현에서 IllegalArgumentException이 발생할 수 있다.

### 20-1. 뺄셈으로 비교할 때의 문제

다음 코드는 주의해야 한다.

```java
(a, b) -> a - b
```

두 정수의 차이가 int 범위를 넘으면 오버플로가 발생할 수 있다.

따라서 다음 코드를 사용하는 편이 안전하다.

```java
(a, b) -> Integer.compare(a, b)
```

또는:

```java
Comparator.naturalOrder()
```

내림차순이라면:

```java
Comparator.reverseOrder()
```

### 20-2. 정렬 기준이 같다는 의미

```java
compare(a, b) == 0
```

이것은 반드시 다음과 같지는 않다.

```java
a.equals(b) == true
```

Comparator는 일부 필드만 비교할 수도 있기 때문이다.

예를 들어 이름만 비교하는 Comparator에서 서로 다른 두 회원의 이름이 같다면 compare()는 0을 반환할 수 있다.

TreeSet이나 TreeMap에서는 이러한 비교 결과가 요소 및 키의 중복 판단에 영향을 준다.

---

## 21. 제네릭의 타입 소거(Type Erasure)

> 자바 제네릭은 컴파일 시 타입 검사를 수행하고, 컴파일된 코드에서는 타입 소거 규칙이 적용된다.

예제:

```java
List<String> names = new ArrayList<>();
List<Integer> scores = new ArrayList<>();
```

실행 시점에는 다음 두 객체의 런타임 클래스가 같다.

```java
System.out.println(
    names.getClass() == scores.getClass()
);
```

실행 결과:

```text
true
```

제네릭 타입 인수는 일반적으로 런타임에 별도의 클래스 정체성으로 유지되지 않는다.

따라서 다음 코드는 사용할 수 없다.

```java
if (names instanceof List<String>) {
}
```

다만 일부 타입 사용 정보는 클래스 파일의 제네릭 서명 등에 남아 리플렉션으로 조회할 수 있다.

### 21-1. new T()가 불가능한 이유

```java
class Box<T> {

    public T create() {
        return new T(); // 컴파일 오류
    }
}
```

T는 컴파일 과정에서 타입 소거가 적용되므로 직접 생성할 구체적인 생성자를 알 수 없다.

필요하다면 Class<T>, Supplier<T> 같은 객체 생성 정보를 전달받는 방식을 사용할 수 있다.

---

## 22. Collections와 Comparator 실무 활용

### 22-1. 게시글 최신순 정렬

```java
posts.sort(
    Comparator.comparing(Post::getCreatedAt).reversed()
);
```

작성 시각이 최신인 게시글이 먼저 오도록 정렬한다.

### 22-2. 댓글 좋아요순 정렬

```java
comments.sort(
    Comparator.comparingInt(Comment::getLikeCount).reversed()
);
```

좋아요 개수가 많은 댓글부터 정렬한다.

### 22-3. 회원 이름순 정렬

```java
members.sort(
    Comparator.comparing(Member::getName)
);
```

회원 이름을 기준으로 정렬한다.

### 22-4. 다중 조건 정렬

```java
posts.sort(
    Comparator.comparingInt(Post::getLikeCount)
        .reversed()
        .thenComparing(
            Post::getCreatedAt,
            Comparator.reverseOrder()
        )
);
```

정렬 기준:

1. 좋아요 많은 순서
2. 좋아요가 같으면 최신 작성일 순서

주의:

위 예제는 Post, Comment, Member 클래스에 해당 getter가 존재한다고 가정한 사용 예제이다.

실제 백엔드에서는 데이터량이 많을 경우 Java 메모리에서 모든 데이터를 정렬하기보다 SQL의 ORDER BY를 활용하는 편이 적절할 수 있다.

---

## 23. 복습 문제

### 문제 1. 오름차순 정렬

```java
List<Integer> numbers =
    new ArrayList<>(List.of(40, 10, 30, 20));

numbers.sort(
    (a, b) -> Integer.compare(a, b)
);

System.out.println(numbers);
```

정답:

```text
[10, 20, 30, 40]
```

### 문제 2. 내림차순 정렬

```java
List<Integer> numbers =
    new ArrayList<>(List.of(40, 10, 30, 20));

numbers.sort(
    (a, b) -> Integer.compare(b, a)
);

System.out.println(numbers);
```

정답:

```text
[40, 30, 20, 10]
```

### 문제 3. 비교 결과 계산

```java
Comparator<Integer> comp =
    (a, b) -> Integer.compare(b, a);

System.out.println(comp.compare(10, 30));
System.out.println(comp.compare(50, 20));
System.out.println(comp.compare(40, 40));
```

정답:

```text
1
-1
0
```

해설:

첫 번째:

```text
a = 10
b = 30

Integer.compare(30, 10)

→ 1
```

두 번째:

```text
a = 50
b = 20

Integer.compare(20, 50)

→ -1
```

세 번째:

```text
a = 40
b = 40

Integer.compare(40, 40)

→ 0
```

### 문제 4. Comparator 실행 시점

```java
Comparator<Integer> comp = (a, b) -> {
    System.out.println("비교 실행");
    return Integer.compare(a, b);
};

System.out.println("A");

List<Integer> numbers =
    new ArrayList<>(List.of(2, 1));

System.out.println("B");

numbers.sort(comp);

System.out.println("C");
```

정답:

```text
A
B
비교 실행
C
```

해설:

Comparator를 정의하는 시점에는 람다식 본문이 실행되지 않는다.

sort()가 정렬 과정에서 compare()를 호출할 때 비로소 "비교 실행"이 출력된다.

### 문제 5. 점수와 학번 정렬

정렬 기준:

1. 점수 내림차순
2. 점수가 같으면 학번 오름차순

```java
students.sort(
    Comparator.comparingInt(Student::getScore)
        .reversed()
        .thenComparingInt(Student::getStudentNo)
);
```

점수를 먼저 비교하고, 비교 결과가 같을 때 학번을 비교한다.

---

## 24. 앞으로 연결해서 공부할 내용

### 제네릭

- 제네릭 클래스와 인터페이스
- 제네릭 메서드
- 제한된 타입 매개변수
- extends와 super 와일드카드
- PECS 원칙
- 타입 소거
- 제네릭과 상속의 관계

### Collections와 정렬

- Comparable과 Comparator
- compareTo()와 compare()
- Comparator.comparing()
- comparingInt(), comparingLong()
- thenComparing()
- reversed()
- nullsFirst(), nullsLast()
- 안정 정렬
- 정렬 알고리즘의 시간 복잡도

### Stream API 연결

- stream().sorted()
- map()
- filter()
- collect()
- Collectors.toList()
- Collectors.groupingBy()
- Comparator와 Stream 정렬 연결

### 백엔드 개발 연결

- 데이터베이스 조회 결과를 List로 관리
- DTO 객체의 사용자 정의 정렬
- 게시글 최신순 정렬
- 댓글 좋아요순 정렬
- 회원 데이터의 다중 조건 정렬
- SQL ORDER BY와 Java Comparator의 역할 비교
- Spring Boot에서 컬렉션을 JSON 응답으로 반환하는 방법

특히 Comparable, Comparator, 람다식, Stream은 서로 연결되는 내용이므로 단독으로 암기하기보다 실제 데이터가 어떤 기준과 실행 과정을 통해 정렬되는지 이해하는 것이 중요하다.

## 출처

- [자바 제네릭과 Collections 사용자 정의 정렬 출처 노트](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-10-11%20%EC%9E%90%EB%B0%94%20%EC%A0%9C%EB%84%A4%EB%A6%AD%EA%B3%BC%20Collections%20%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%A0%95%EC%9D%98%20%EC%A0%95%EB%A0%AC>)
