---
type: concept
aliases: []
knowledge_type: foundation
classification_reason: "Java 실행과 문법을 이해하기 위한 학습 토대다."
difficulty: 초급
status: growing
curriculum_stage: 4
prerequisites: []
related: []
sources:
  - "[[10 원문/자바 백엔드 수업/2026-08-31 Java 배열 반복문 패턴 매칭 복습]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-03 자바 배열과 객체지향 핵심]]"
created: 2026-10-10
updated: 2026-10-10
---

# 향상된 for문과 반복 제어

## 2026-08-31 Java 배열 반복문 패턴 매칭 복습

### 1. 향상된 for문

```java
int[] nums = {11, 20, 33, 40, 55};

for (int num : nums) {
    System.out.println(num);
}
```

#### 읽는 방법

```java
for (int num : nums)
```

→ `nums` 배열에서 값을 **하나씩 꺼내서 num에 넣는다.**

실행 과정:

```text
1회차 : num = 11
2회차 : num = 20
3회차 : num = 33
4회차 : num = 40
5회차 : num = 55
```

#### 각 부분의 의미

```text
int   → 배열 요소의 자료형
num   → 하나씩 받아오는 변수
nums  → 반복할 배열
```

#### 홀수만 출력

```java
for (int num : nums) {
    if (num % 2 == 0) {
        continue;
    }
    System.out.println(num);
}
```

`num % 2 == 0`

→ 짝수인가?

짝수이면 `continue`로 출력문을 건너뛰기 때문에 **홀수만 출력된다.**

---


### 2. 일반 for문 vs 향상된 for문

#### 값만 읽고 싶을 때

```java
for (int num : nums) {
    System.out.println(num);
}
```

#### 인덱스가 필요할 때

```java
for (int i = 0; i < nums.length; i++) {
    System.out.println(nums[i]);
}
```

#### 배열 값을 직접 수정할 때도 일반 for

```java
for (int i = 0; i < nums.length; i++) {
    nums[i] = 100;
}
```

주의:

```java
for (int num : nums) {
    num = 100;
}
```

이렇게 해도 원본 배열 값은 바뀌지 않는다.

`num`은 배열의 값을 하나씩 받아오는 **지역 변수**이기 때문이다.

---


### 3. break / continue / return 차이

#### continue

```java
continue;
```

→ **이번 반복만 건너뛰고 다음 반복으로 이동**

#### break

```java
break;
```

→ **현재 반복문 또는 switch 종료**

#### return

```java
return;
```

→ **현재 메서드 자체를 종료**

정리:

```text
continue → 이번 반복만 종료
break    → 반복문 종료
return   → 메서드 종료
```

---


### 4. continue에서 for와 while의 차이

`for`문:

```java
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue;
    }
}
```

`continue`를 만나도 마지막의 `i++`가 실행된다.

```text
본문
 ↓
continue
 ↓
i++
 ↓
조건 검사
```

하지만 `while`에서는 증가식을 직접 작성하기 때문에 주의해야 한다.

```java
int i = 0;

while (i < 5) {
    if (i == 2) {
        continue;
    }

    i++;
}
```

이 경우 `i == 2`가 되면 `i++`까지 가지 못해서 계속 2가 된다.

→ **무한 반복 발생 가능**

---


## 2026-09-03 자바 배열과 객체지향 핵심

### 배열 순회와 유틸리티

> 일반 `for`문은 인덱스 제어가 필요한 순회에 적합하고, 향상된 `for-each`문은 모든 요소를 순서대로 읽는 작업에 적합합니다.

배열의 요소를 직접 출력할 때는 각 인덱스를 명시할 수 있지만, 데이터 수가 많아지면 반복문을 이용하는 편이 효율적입니다. 특히 외부 입력처럼 배열 크기가 가변적인 경우에는 고정 숫자 대신 `length`를 기준으로 반복해야 합니다.

```java
int[] score = {90, 80, 100, 70, 85};

for (int i = 0; i < score.length; i++) {
    System.out.println(score[i]);
}
```

일반 `for`문은 인덱스를 직접 제어할 수 있으므로 역순 출력, 홀수, 짝수 인덱스 선택, 특정 구간 순회와 같은 작업에 적합합니다. 반복 변수 `i`는 `for` 블록 내부에서만 유효한 지역 변수입니다.

향상된 `for-each`문은 배열의 처음부터 끝까지 모든 요소를 순차적으로 읽을 때 사용할 수 있습니다. 요소 자체를 변수로 전달받으므로 인덱스 연산이 필요하지 않은 단순 출력에 간결합니다.

```java
for (int value : score) {
    System.out.println(value);
}
```

`for-each`문의 반복 변수는 매 반복마다 현재 요소의 값을 받는 지역 변수입니다. 따라서 요소의 위치를 기준으로 조건을 적용하거나 특정 인덱스의 값을 변경해야 한다면 일반 `for`문을 선택해야 합니다.

`java.util.Arrays` 클래스는 배열을 문자열로 변환하거나 비교, 복사, 정렬하는 정적 메서드를 제공합니다. `Arrays.toString()`은 1차원 배열 전체를 사람이 읽기 쉬운 문자열 형태로 반환합니다.

```java
import java.util.Arrays;

int[] score = {90, 80, 100, 70, 85};

System.out.println(Arrays.toString(score));
score[1] = 95;
System.out.println(Arrays.toString(score));
```

배열의 내용을 다른 배열로 복사할 때는 `System.arraycopy()`를 사용할 수 있습니다. 이 메서드는 원본 배열, 원본 시작 인덱스, 대상 배열, 대상 시작 인덱스, 복사 길이를 인자로 받습니다.

```java
int[] src = {1, 2, 3, 4, 5};
int[] dst = new int[5];

System.arraycopy(src, 0, dst, 0, src.length);
```

배열 복사 시 원본과 대상 배열의 범위가 유효해야 하며, 참조값이 `null`이면 `NullPointerException`이 발생할 수 있습니다. API 문서에서는 매개변수와 반환 타입뿐 아니라 예외 조건도 함께 확인해야 합니다.


