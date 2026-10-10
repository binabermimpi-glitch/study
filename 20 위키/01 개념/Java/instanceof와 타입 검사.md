---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 6
prerequisites: []
related: []
sources:
  - "[[10 원문/자바 백엔드 수업/2026-08-26 Java 객체 생성자 캡슐화 복습]]"
  - "[[10 원문/자바 백엔드 수업/2026-08-31 Java 배열 반복문 패턴 매칭 복습]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-14 자바 상속과 다형성 핵심 정리]]"
created: 2026-10-10
updated: 2026-10-10
---

# instanceof와 타입 검사

## 2026-08-26 Java 객체 생성자 캡슐화 복습

### 5. instanceof

`instanceof`는 참조 변수가 가리키는 실제 객체가 특정 타입으로 취급될 수 있는지 확인하며 결과는 `boolean`이다.

```java
Person p1 = new Person();
System.out.println(p1 instanceof Person); // true
```

```java
class Animal { }
class Dog extends Animal { }

Dog d = new Dog();
System.out.println(d instanceof Dog);    // true
System.out.println(d instanceof Animal); // true
```


## 2026-08-31 Java 배열 반복문 패턴 매칭 복습

### 10. instanceof

`instanceof`는:

> **참조 변수가 실제로 가리키고 있는 객체가 특정 타입인지 검사하는 연산자**

이다.

```java
Object obj = "hello";

System.out.println(obj instanceof String);
```

결과:

```text
true
```

왜?

```text
obj
 ↓
"hello"
 ↓
String 객체
```

이기 때문이다.

반대로:

```java
obj instanceof Integer
```

결과:

```text
false
```

#### instanceof의 결과

항상:

```text
true 또는 false
```

즉 `boolean`이다.

그래서 보통 `if`와 같이 사용한다.

```java
if (obj instanceof String) {
    System.out.println("String입니다.");
}
```

---


### 12. 패턴 매칭 instanceof

예전 방식:

```java
if (obj instanceof String) {
    String str = (String) obj;

    System.out.println(str.toUpperCase());
}
```

요즘 방식:

```java
if (obj instanceof String str) {
    System.out.println(str.toUpperCase());
}
```

```java
obj instanceof String str
```

의 뜻:

```text
① obj가 String 객체인가?
② 맞으면 String 변수 str로 사용할 수 있게 한다.
```

---


## 2026-09-14 자바 상속과 다형성 핵심 정리

### 5. 다운캐스팅과 instanceof

```java
Parent parent = new Child();

if (parent instanceof Child child) {
    child.childOnlyMethod();
}
```

실제 객체 타입이 맞지 않으면 `ClassCastException`이 발생할 수 있으므로 `instanceof`로 타입 검사와 다운캐스팅을 함께 수행한다.


