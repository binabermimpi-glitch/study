---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 5
prerequisites: []
related: []
sources:
  - "[2026-08-26 Java 객체 생성자 캡슐화 복습](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-08-26%20Java%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1%EC%9E%90%20%EC%BA%A1%EC%8A%90%ED%99%94%20%EB%B3%B5%EC%8A%B5>)"
  - "[2026-08-27 자바 메소드와 객체 생성](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-08-27%20%EC%9E%90%EB%B0%94%20%EB%A9%94%EC%86%8C%EB%93%9C%EC%99%80%20%EA%B0%9D%EC%B2%B4%20%EC%83%9D%EC%84%B1>)"
  - "[2026-09-14 자바 상속과 다형성 핵심 정리](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-09-14%20%EC%9E%90%EB%B0%94%20%EC%83%81%EC%86%8D%EA%B3%BC%20%EB%8B%A4%ED%98%95%EC%84%B1%20%ED%95%B5%EC%8B%AC%20%EC%A0%95%EB%A6%AC>)"
created: 2026-10-10
updated: 2026-10-10
---

# Object 클래스

## Java 객체 생성자 캡슐화 복습

### 7. identityHashCode와 객체 주소

```java
System.out.println(System.identityHashCode(hong));
```

- `System.identityHashCode(hong)`은 객체의 identity 기반 해시 코드를 `int` 값으로 반환한다.
- 이 값은 실제 메모리 주소가 아니다.
- Java 일반 코드에서는 JVM이 관리하는 객체의 실제 메모리 주소를 직접 확인하지 않는다.
- 두 참조가 같은 객체를 가리키는지 확인할 때는 `==`를 사용할 수 있다.

```java
Human h1 = new Human("hong", 100);
Human h2 = h1;
System.out.println(h1 == h2); // true
```


## 자바 메소드와 객체 생성

### Object와 객체 생성

> 자바의 모든 클래스는 명시하지 않아도 `Object` 클래스를 최상위 상위 클래스로 상속하며, 객체 생성은 힙 영역에 인스턴스를 만들고 참조 변수에 주소를 저장하는 과정입니다.

`Object`는 자바 클래스 계층 구조의 최상위 루트 클래스입니다. 개발자가 `extends Object`를 직접 작성하지 않아도, 클래스를 선언하면 내부적으로 `Object`를 상속하는 구조가 적용됩니다.

```java
class UserClass {
    // 내부적으로 Object를 상속합니다.
}
```

`Object` 클래스는 모든 객체가 공통적으로 사용할 수 있는 기본 기능을 제공합니다. 대표적으로 객체 정보 확인, 문자열 표현, 동등성 비교, 해시 코드 확인과 관련된 메소드가 있습니다.

| 주요 메소드 | 역할 |
|---|---|
| `toString()` | 객체를 문자열로 표현합니다. |
| `getClass()` | 실행 중인 객체의 클래스 정보를 반환합니다. |
| `hashCode()` | 객체의 해시 코드 값을 반환합니다. |
| `equals()` | 두 객체의 동등성을 비교합니다. |
| `clone()` | 객체 복제를 위한 기능을 제공합니다. |

객체는 `new` 연산자를 통해 힙 영역에 동적으로 생성됩니다. 힙 영역에 생성된 객체의 시작 주소는 참조 변수에 저장되며, 참조 변수는 객체 자체가 아니라 객체의 주소를 보관합니다.

```java
UserClass user = new UserClass();
System.out.println(user.toString());
```

위 코드에서 `user`는 참조 변수이며, `new UserClass()`는 힙 영역에 객체를 생성합니다. 이후 `user.toString()`처럼 점 연산자를 사용하면 참조 변수가 보관한 주소를 기준으로 객체의 멤버를 찾아 접근합니다.

`toString()`의 기본 구현은 일반적으로 클래스 이름과 해시 코드 기반의 식별 정보를 문자열로 반환합니다. 객체에 의미 있는 정보를 출력하려면 `toString()`을 오버라이딩하여 원하는 문자열 형식으로 재정의할 수 있습니다.


## 자바 상속과 다형성 핵심 정리

### 6. Object의 equals(), hashCode(), toString()

모든 클래스는 최상위 클래스인 Object를 상속하므로 `equals()`, `hashCode()`, `toString()`, `getClass()` 등을 사용할 수 있다.

```java
@Override
public boolean equals(Object obj) {
    if (!(obj instanceof Person other)) {
        return false;
    }
    return name.equals(other.name) && age == other.age;
}
```

`equals()`를 재정의했다면 일반적으로 `hashCode()`도 같은 기준으로 재정의해야 한다. `equals()`가 true인 객체는 hashCode도 같아야 한다. 이는 HashSet과 HashMap에서 중요하다. `toString()`은 객체를 사람이 읽기 좋은 문자열로 표현하도록 재정의한다.


