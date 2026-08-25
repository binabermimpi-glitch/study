---
type: concept
aliases: [main method, public static void main, 엔트리 포인트]
knowledge_type: foundation
classification_reason: Java 프로그램의 시작점을 직접 작성하고 각 선언 요소를 읽는 입문 필수 지식이다.
difficulty: 입문
status: growing
prerequisites:
  - "[[20 위키/01 개념/Java/메서드 선언과 호출]]"
  - "[[20 위키/01 개념/Java/static과 인스턴스 멤버]]"
  - "[[20 위키/01 개념/Java/클래스와 접근 제한자]]"
related:
  - "[[20 위키/01 개념/Java/String과 참조 자료형]]"
sources:
  - "[[20 위키/03 출처 노트/2026-08-24 main 메서드 학습 회고]]"
created: 2026-08-24
updated: 2026-08-24
---

# main 메서드 선언 읽기

## 한 문장 설명

`public static void main(String[] args)`는 JVM이 Java 애플리케이션을 시작할 때 호출할 수 있는 진입점 메서드의 선언이다.

## 완성된 예시

```java
public class MainExample {
    public static void main(String[] args) {
        System.out.println("프로그램을 시작합니다.");
    }
}
```

## 한 조각씩 읽기

| 코드 | 문법상 역할 | 이 선언에서의 의미 |
|---|---|---|
| `public` | 접근 제한자 | JVM이 클래스 외부에서 호출할 수 있다. |
| `static` | 기타 제어자 | 객체를 만들지 않고 클래스 차원에서 호출할 수 있다. |
| `void` | 반환형 | 호출자에게 돌려주는 값이 없다. |
| `main` | 메서드 이름 | JVM이 시작점으로 찾는 이름이다. |
| `String[] args` | 매개변수 선언 | 문자열 배열을 `args`라는 변수로 받는다. |

`String[] args` 전체가 매개변수 하나다. `String[]`는 타입이고 `args`는 매개변수 이름이다. 이름은 바꿀 수 있지만 일반적으로 `args`를 사용한다.

## 문제에 답하는 사고 순서

문제가 “접근 제한자, static, 반환형, 메서드 이름, 매개변수를 사용해 메서드를 작성하라”고 하면 다음 순서로 조립한다.

```text
접근 제한자 → static 여부 → 반환형 → 메서드 이름 → (매개변수) → { 실행문 }
```

예를 들어 두 정수를 받아 합계를 출력하는 정적 메서드는 다음과 같다.

```java
public static void printSum(int first, int second) {
    System.out.println(first + second);
}
```

- `public`: 접근 제한자
- `static`: 정적 메서드
- `void`: 결과를 반환하지 않음
- `printSum`: 메서드 이름
- `int first, int second`: 매개변수 두 개

호출까지 포함한 완전한 코드는 다음과 같다.

```java
public class CalculatorExample {
    public static void main(String[] args) {
        printSum(10, 20);
    }

    public static void printSum(int first, int second) {
        System.out.println(first + second);
    }
}
```

## 3단계 연습

### 1단계: 빈칸 채우기

```java
_____ static _____ main(String[] args) {
    System.out.println("Hello");
}
```

정답: `public`, `void`

### 2단계: 오류 찾기

```java
public void main(String[] args) {
    System.out.println("Hello");
}
```

일반적인 Java 애플리케이션 진입점으로 사용하려면 `static`이 필요하다.

### 3단계: 처음부터 작성하기

다음 조건으로 메서드를 작성한다.

- 어디서나 접근 가능
- 객체 생성 없이 호출 가능
- 문자열 하나를 받음
- 반환값 없음
- 받은 문자열을 출력

<details>
<summary>정답 확인</summary>

```java
public static void printMessage(String message) {
    System.out.println(message);
}
```

</details>

## 학습 상태

- 현재: 각 요소의 의미는 인식하지만 완전한 코드로 조립하는 연습이 필요함
- 다음 목표: 정답 없이 `main`이 포함된 클래스와 별도 static 메서드 하나 작성
- 완료 기준: 각 요소를 설명하면서 3분 안에 컴파일 가능한 예시 작성

## 흔한 실수

- `void`를 메서드 이름으로 착각한다.
- `String[]`와 `args`를 하나의 타입으로 생각한다.
- `main`에 `static`을 빠뜨린다.
- 메서드를 클래스 중괄호 밖에 작성한다.
- 메서드를 선언만 하고 어디에서도 호출하지 않는다.

## 출처

- [[20 위키/03 출처 노트/2026-08-24 main 메서드 학습 회고]]

