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
  - "[[10 원문/자바 백엔드 수업/2026-09-10 자바 상속과 객체 설계]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-14 자바 상속과 다형성 핵심 정리]]"
created: 2026-10-10
updated: 2026-10-10
---

# sealed 클래스

## 2026-09-10 자바 상속과 객체 설계

### 상속 구조와 클래스 제어

> 클래스 상속은 하나의 부모 클래스만 직접 상속할 수 있으며, 인터페이스는 여러 개를 구현할 수 있습니다. 또한 `abstract`, `final`, `sealed` 등의 키워드를 사용하여 상속 구조를 제어할 수 있습니다.

일반적인 클래스 상속은 `extends`를 사용합니다.

```java
class Parent {
}

class Child extends Parent {
}
```

자식 클래스는 접근이 허용된 부모 클래스의 멤버를 물려받아 사용할 수 있습니다.

인터페이스끼리도 `extends`를 사용할 수 있습니다.

```java
interface A {
}

interface B extends A {
}
```

클래스가 인터페이스를 구현할 때는 `implements`를 사용합니다.

```java
class Child extends Parent implements InterfaceA, InterfaceB {
}
```

즉 하나의 클래스는 다음과 같은 형태를 가질 수 있습니다.

```text
하나의 부모 클래스 상속
+
여러 인터페이스 구현
```

상속은 단순히 메서드를 재사용하기 위한 수단으로만 사용하는 것이 좋지 않습니다.

두 클래스가 명확한 `is-a` 관계가 아니라면 상속보다 합성(composition)을 고려하는 것이 더 적절할 수 있습니다.

예를 들어:

```text
Dog is an Animal
→ 상속 관계가 자연스러움

Car has an Engine
→ 필드로 포함하는 합성 관계가 자연스러움
```

상속 범위를 제어하는 대표적인 키워드는 다음과 같습니다.

| 키워드          | 의미                                    |
| ------------ | ------------------------------------- |
| `abstract`   | 직접 객체 생성을 제한하고 하위 클래스에서 구체화하도록 유도     |
| `final`      | 해당 클래스를 더 이상 상속할 수 없게 함               |
| `sealed`     | 지정한 타입만 직접 상속 또는 구현하도록 제한             |
| `non-sealed` | `sealed` 계층의 특정 하위 타입부터 다시 자유로운 상속 허용 |

봉인 클래스는 `permits`를 사용하여 직접 상속을 허용할 클래스를 지정할 수 있습니다.

```java
public abstract sealed class Animal
        permits Carnivore, Herbivore {
}
```

```java
public sealed class Carnivore extends Animal
        permits Tiger, Lion {
}
```

```java
public final class Tiger extends Carnivore {
}
```

`sealed` 타입을 직접 상속하는 하위 클래스는 일반적으로 다음 중 하나를 명시해야 합니다.

```text
final
sealed
non-sealed
```

이러한 구조는 프로그램에서 허용되는 하위 타입을 명확히 제한하고 싶을 때 유용합니다.


## 2026-09-14 자바 상속과 다형성 핵심 정리

### 9. sealed

```java
sealed interface Animal permits Dog, Cat {
}
```

sealed는 상속하거나 구현할 수 있는 하위 타입을 제한한다. sealed의 자식은 상황에 따라 `final`, `sealed`, `non-sealed`를 사용한다.


