---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 9
prerequisites: []
related: []
sources:
  - "[2026-09-27 자바 스트림과 IO 핵심](</sources/%EC%9E%90%EB%B0%94%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%88%98%EC%97%85/2026-09-27%20%EC%9E%90%EB%B0%94%20%EC%8A%A4%ED%8A%B8%EB%A6%BC%EA%B3%BC%20IO%20%ED%95%B5%EC%8B%AC>)"
created: 2026-10-10
updated: 2026-10-10
---

# 스트림 API와 리듀스

## 자바 스트림과 IO 핵심

### 자바 스트림과 IO 핵심


### 2. 기본형 스트림과 리듀스

> 기본형 스트림은 수치 데이터 처리에 특화된 스트림이며, 순차적으로 전달되는 요소를 변환, 비교, 누적하여 최종 결과를 생성합니다.

`IntStream`, `LongStream`, `DoubleStream`은 각각 `int`, `long`, `double` 데이터 처리에 특화된 스트림입니다.

객체 스트림을 사용할 때 발생할 수 있는 불필요한 박싱과 언박싱을 줄일 수 있으며, 합계, 평균, 최솟값, 최댓값 같은 수치 연산을 간결하게 제공합니다.

#### 스트림 종류

일반 객체와 기타 타입은 다음과 같이 처리합니다.

```java
Stream<T>
```

정수형 데이터는 다음과 같이 처리합니다.

```java
IntStream
```

긴 정수형 데이터는 다음과 같이 처리합니다.

```java
LongStream
```

실수형 데이터는 다음과 같이 처리합니다.

```java
DoubleStream
```

스트림은 컬렉션 데이터를 연산하기 위한 파이프라인으로 생각할 수 있습니다.

```text
데이터
↓
스트림 생성
↓
중간 연산
↓
중간 연산
↓
최종 연산
↓
결과
```

중간 연산은 요소를 변환하거나 걸러낸 뒤 다음 단계로 전달합니다.

대표적으로 다음과 같은 연산이 있습니다.

```java
filter()
map()
sorted()
distinct()
flatMap()
```

최종 연산은 스트림 파이프라인을 실제로 실행하고 결과를 생성합니다.

대표적으로 다음과 같은 연산이 있습니다.

```java
forEach()
count()
min()
max()
reduce()
collect()
```

#### min()과 max()

`min()`과 `max()`는 모든 요소를 한 번에 비교하는 것이 아닙니다.

현재까지 선택된 값과 다음 값을 계속 비교합니다.

예를 들어 다음 데이터에서 최솟값을 찾는다고 가정합니다.

```text
7, 3, 9, 1, 5
```

처리 과정은 다음과 같이 생각할 수 있습니다.

```text
7과 3 비교 → 3 유지
3과 9 비교 → 3 유지
3과 1 비교 → 1 유지
1과 5 비교 → 1 유지

최솟값 = 1
```

`max()`는 반대로 더 큰 값을 계속 유지합니다.

```java
int min = IntStream.of(7, 3, 9, 1, 5)
    .min()
    .orElseThrow();

int max = IntStream.of(7, 3, 9, 1, 5)
    .max()
    .orElseThrow();
```

`min()`과 `max()`는 스트림에 값이 하나도 없을 가능성이 있기 때문에 `OptionalInt`를 반환합니다.

```java
OptionalInt
```

`orElseThrow()`는 값이 존재하면 내부 값을 꺼내 반환하고, 값이 없으면 예외를 발생시킵니다.

#### reduce()

`reduce()`는 여러 개의 요소를 **하나의 결과로 줄이는 최종 연산**입니다.

예를 들어 다음 숫자가 있다고 가정합니다.

```text
1, 2, 3, 4
```

합계를 구하면 다음과 같은 누적 과정이 발생합니다.

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

즉 이전 계산 결과가 다음 계산의 입력으로 다시 사용됩니다.

```java
int result = IntStream.of(7, 3, 9, 1, 5)
    .map(n -> n * 2)
    .reduce(0, Integer::sum);
```

먼저 `map()`이 실행되면 다음과 같이 변환됩니다.

```text
7 → 14
3 → 6
9 → 18
1 → 2
5 → 10
```

따라서 스트림은 다음과 같습니다.

```text
14, 6, 18, 2, 10
```

이후 `reduce()`가 누적합니다.

```text
0 + 14 = 14
14 + 6 = 20
20 + 18 = 38
38 + 2 = 40
40 + 10 = 50
```

최종 결과는 다음과 같습니다.

```text
50
```

---


### 3. 병렬 리듀스와 collect()

> 병렬 리듀스는 분할된 부분 결과를 누적 함수와 컴바이너로 결합하며, `collect()`는 가변 컨테이너에 데이터를 목적별로 수집합니다.

`reduce()`를 이해할 때 중요한 구성 요소는 다음 세 가지입니다.

| 구성 요소 | 역할 | 합계 예시 |
|---|---|---|
| 항등값 | 연산 시작값과 빈 스트림의 기본 결과를 제공합니다. | `0` |
| 누적 함수 | 현재 누적값과 다음 요소를 결합합니다. | `Integer::sum` |
| 컴바이너 | 병렬 처리된 부분 결과를 최종 결합합니다. | `Integer::sum` |

#### 항등값

항등값은 연산 결과를 바꾸지 않는 값입니다.

덧셈에서는 다음과 같습니다.

```text
10 + 0 = 10
```

따라서 덧셈의 항등값은 `0`입니다.

곱셈에서는 다음과 같습니다.

```text
10 × 1 = 10
```

따라서 곱셈의 항등값은 `1`입니다.

#### 누적 함수

누적 함수는 현재까지 계산한 결과와 다음 요소를 결합합니다.

```text
현재 누적값 + 다음 값 → 새로운 누적값
```

예를 들어 다음과 같습니다.

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

#### 컴바이너

컴바이너는 병렬 처리에서 만들어진 **부분 결과끼리 결합**합니다.

```java
int sum = Stream.of(1, 2, 3, 4)
    .parallel()
    .reduce(0, Integer::sum, Integer::sum);
```

개념적으로는 다음과 같이 생각할 수 있습니다.

```text
1, 2, 3, 4

↓ 분할

[1, 2]    [3, 4]

↓ 각각 누적

3          7

↓ 컴바이너

3 + 7

↓

10
```

실제로 데이터가 정확히 두 덩어리로 나뉜다는 의미는 아닙니다. 병렬 스트림의 실제 분할 방식은 데이터 구조와 실행 환경 등에 따라 달라질 수 있습니다.

따라서 중요한 것은 다음 흐름입니다.

```text
데이터 분할
→ 각 부분에서 누적
→ 부분 결과 생성
→ 컴바이너가 부분 결과 결합
→ 최종 결과
```

작은 데이터나 단순한 연산에서는 병렬 처리 준비와 결과 결합 비용이 실제 계산 비용보다 더 커질 수 있으므로 무조건 병렬 스트림이 빠른 것은 아닙니다.

---


### 4. collect()와 Collectors

`collect()`는 스트림 요소를 하나의 자료구조나 결과 컨테이너에 모으는 최종 연산입니다.

`reduce()`와 `collect()`의 차이를 간단하게 생각하면 다음과 같습니다.

```text
reduce()
여러 값 → 하나의 값

collect()
여러 값 → List, Set, Map 등의 결과
```

예를 들어 학생 객체에서 이름만 추출하여 리스트로 만들 수 있습니다.

```java
List<String> names = students.stream()
    .map(Student::name)
    .collect(Collectors.toList());
```

처리 과정은 다음과 같습니다.

```text
Student 객체들
↓
map(Student::name)
↓
학생 이름들
↓
Collectors.toList()
↓
List<String>
```

중복 없는 부서 목록을 만들고 싶다면 `Set`으로 수집할 수 있습니다.

```java
Set<String> departments = students.stream()
    .map(Student::department)
    .collect(Collectors.toSet());
```

`List`는 순서와 중복을 유지할 수 있고, `Set`은 중복 값을 허용하지 않습니다.

#### 주요 Collector

| Collector | 수집 결과 | 활용 목적 |
|---|---|---|
| `joining()` | 문자열 | 여러 문자열을 하나로 연결합니다. |
| `toMap()` | `Map` | 키와 값 형태의 데이터를 만듭니다. |
| `groupingBy()` | 그룹별 `Map` | 특정 기준으로 객체를 묶습니다. |
| `partitioningBy()` | `Map<Boolean, ...>` | 조건에 따라 `true`, `false` 두 그룹으로 나눕니다. |

#### groupingBy()

`groupingBy()`는 특정 기준에 따라 데이터를 그룹으로 묶습니다.

예를 들어 학생들을 도시별로 묶는다면 다음과 같은 형태가 됩니다.

```text
서울 → 학생A, 학생B
부산 → 학생C
인천 → 학생D, 학생E
```

다운스트림 컬렉터를 함께 사용하면 그룹별 평균이나 합계도 계산할 수 있습니다.

```java
Map<String, Double> averageByCity = students.stream()
    .collect(Collectors.groupingBy(
        Student::city,
        Collectors.averagingInt(Student::score)
    ));
```

처리 흐름은 다음과 같습니다.

```text
학생 객체
↓
도시 기준으로 그룹화
↓
같은 도시의 학생 점수 수집
↓
평균 계산
↓
Map<String, Double>
```

#### partitioningBy()

`partitioningBy()`는 `Predicate`의 결과에 따라 데이터를 두 그룹으로 나눕니다.

예를 들어 점수가 80점 이상인지 확인하면 다음과 같이 나뉠 수 있습니다.

```text
true  → 80점 이상 학생
false → 80점 미만 학생
```

따라서 `groupingBy()`가 여러 종류의 그룹으로 나눌 수 있는 것과 달리 `partitioningBy()`는 항상 `true`, `false`를 기준으로 두 그룹으로 나눕니다.

#### flatMap()

`flatMap()`은 중첩된 구조를 하나의 스트림으로 평탄화합니다.

예를 들어 다음과 같은 구조가 있다고 가정합니다.

```text
[[1, 2], [3, 4], [5, 6]]
```

`flatMap()`을 사용하면 다음과 같이 만들 수 있습니다.

```text
1, 2, 3, 4, 5, 6
```

즉,

```text
여러 개의 내부 스트림
→ 하나의 스트림
```

으로 만드는 역할을 합니다.

#### mapMulti()

`mapMulti()`는 하나의 요소를 처리하면서 조건에 따라 0개, 1개 또는 여러 개의 결과를 다음 단계로 전달할 수 있습니다.

따라서 조건부 변환과 필터링을 함께 처리할 때 활용할 수 있습니다.

#### anyMatch(), allMatch(), noneMatch()

이 메서드들은 조건을 검사하고 `boolean` 결과를 반환하는 최종 연산입니다.

```text
anyMatch()
→ 하나라도 조건을 만족하는가?

allMatch()
→ 모든 요소가 조건을 만족하는가?

noneMatch()
→ 조건을 만족하는 요소가 하나도 없는가?
```

이들은 결과가 확정되는 순간 나머지 요소를 검사하지 않을 수 있습니다.

예를 들어 `anyMatch()`에서 첫 번째 요소가 이미 조건을 만족한다면 뒤의 모든 요소를 확인할 필요가 없습니다.

---


