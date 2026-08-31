---
type: concept
aliases: [향상된 for문, for-each, break, continue]
knowledge_type: practical-core
classification_reason: 배열과 컬렉션을 순회하고 반복 흐름을 제어하는 데 자주 사용하는 기본 문법이다.
difficulty: 초급
status: growing
prerequisites: ["[배열과 2차원 배열](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EB%B0%B0%EC%97%B4%EA%B3%BC%202%EC%B0%A8%EC%9B%90%20%EB%B0%B0%EC%97%B4>)", "[변수의 종류와 생명주기](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EB%B3%80%EC%88%98%EC%9D%98%20%EC%A2%85%EB%A5%98%EC%99%80%20%EC%83%9D%EB%AA%85%EC%A3%BC%EA%B8%B0>)"]
related: ["[반환형과 return](</wiki/01%20%EA%B0%9C%EB%85%90/Java/%EB%B0%98%ED%99%98%ED%98%95%EA%B3%BC%20return>)"]
sources: ["[2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)"]
created: 2026-08-31
updated: 2026-08-31
---

# 향상된 for문과 반복 제어

## 한 문장 설명

향상된 `for`문은 배열이나 컬렉션의 요소를 순서대로 지역 변수에 받아 처리하는 문법이다.

```java
int[] nums = {11, 20, 33, 40, 55};

for (int num : nums) {
    System.out.println(num);
}
```

`for (int num : nums)`는 `nums`에서 값을 하나씩 읽어 `num`에 넣는다는 뜻이다.

## 일반 for문과 선택 기준

- 요소의 값만 읽으면 향상된 `for`가 간단하다.
- 인덱스가 필요하거나 배열 요소 자체를 바꾸려면 일반 `for`를 사용한다.

```java
for (int i = 0; i < nums.length; i++) {
    nums[i] = 100;
}
```

기본형 배열에서 `for (int num : nums) { num = 100; }`은 지역 변수 `num`만 바꾸므로 원본 요소가 변하지 않는다. 참조형 요소에서는 참조를 재대입해도 배열은 바뀌지 않지만, 참조 대상 객체의 상태를 변경하면 같은 객체에 영향이 갈 수 있다.

## `continue`, `break`, `return`

| 문법 | 영향 범위 |
|---|---|
| `continue` | 현재 반복의 남은 본문을 건너뛰고 다음 반복으로 이동 |
| `break` | 가장 가까운 반복문 또는 `switch` 종료 |
| `return` | 현재 메서드 종료 |

## for와 while에서 continue

`for`문의 `continue`는 갱신식으로 이동하지만, `while`문은 직접 작성한 증가 코드를 건너뛸 수 있다.

```java
int i = 0;
while (i < 5) {
    if (i == 2) {
        i++;       // 상태를 먼저 변경
        continue;
    }
    i++;
}
```

## 흔한 실수

- `while`에서 상태 변경 전에 `continue`를 실행하여 무한 반복을 만든다.
- `break`가 메서드 전체를 끝낸다고 생각한다.
- 향상된 `for`의 반복 변수에 대입하면 원본 배열 요소가 바뀐다고 생각한다.
- 반복 중 배열이나 컬렉션의 인덱스가 필요하면서 향상된 `for`를 억지로 사용한다.

## 실무에서는 어떻게 쓰이나

DTO 목록 변환, 검증, 합계 계산 등에서 배열과 `List`를 순회할 때 사용한다. 다만 `continue`가 너무 많아 흐름이 복잡해지면 조건을 메서드로 분리하는 편이 읽기 쉽다.

## 출처

- [2026-08-31 Java 배열 반복문 패턴 매칭 복습](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-31%20Java%20%EB%B0%B0%EC%97%B4%20%EB%B0%98%EB%B3%B5%EB%AC%B8%20%ED%8C%A8%ED%84%B4%20%EB%A7%A4%EC%B9%AD%20%EB%B3%B5%EC%8A%B5>)

