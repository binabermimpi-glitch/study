---
type: concept
aliases: []
knowledge_type: foundation
classification_reason: "Java 실행과 문법을 이해하기 위한 학습 토대다."
difficulty: 초급
status: growing
curriculum_stage: 3
prerequisites: []
related: []
sources:
  - "[[10 원문/자바 백엔드 수업/2026-08-27 자바 메소드와 객체 생성]]"
created: 2026-10-10
updated: 2026-10-10
---

# 반환형과 return

## 자바 메소드와 객체 생성

### 반환형 메소드와 return

> 반환형 메소드는 선언된 타입의 값을 호출 위치로 반환하며, `return`은 값을 반환하면서 해당 메소드를 즉시 종료합니다.

`void` 메소드는 수행할 명령만 포함하며 호출 위치에 반환할 값이 없습니다. 반면 `int`, `double`, `String` 등 반환형이 선언된 메소드는 해당 타입과 호환되는 값을 `return`해야 합니다.

```java
public static int getA() {
    return 100;
}
```

반환형 메소드는 선언부의 반환 타입, `return` 뒤 값의 타입, 호출 결과를 받는 위치의 타입이 서로 호환되어야 합니다. 이를 통해 메소드 호출 결과가 안전하게 다음 연산이나 대입에 사용됩니다.

```java
int a = getA();
System.out.println(a);
```

- 메소드 선언의 반환형은 호출 결과의 데이터 타입을 결정합니다.
- `return` 값은 선언된 반환형과 호환되어야 합니다.
- 호출 결과를 변수에 대입할 경우 대입 대상의 타입도 호환되어야 합니다.
- `return` 이후의 실행 불가능한 문장은 컴파일 오류가 됩니다.

`return`은 메소드 내부에서만 사용할 수 있는 제어 키워드입니다. 값 없이 사용하면 메소드만 종료하고, 값과 함께 사용하면 값을 반환한 뒤 메소드를 종료합니다. `void` 메소드에서도 조기 종료 목적으로 값 없는 `return;`을 사용할 수 있습니다.

같은 클래스 내부의 `static` 메소드는 메소드 이름만으로 호출할 수 있습니다. 이는 같은 클래스 범위에서 클래스 이름이 생략될 수 있기 때문이며, 필요하다면 `클래스명.메소드명()` 형태로 명시할 수도 있습니다.


