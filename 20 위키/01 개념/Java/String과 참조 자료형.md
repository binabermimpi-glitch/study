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
  - "[[10 원문/2026-08-23 자바 참조와 자료형 기초]]"
  - "[[10 원문/자바 백엔드 수업/2026-08-31 Java 배열 반복문 패턴 매칭 복습]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-10 자바 상속과 객체 설계]]"
created: 2026-10-10
updated: 2026-10-10
---

# String과 참조 자료형

## 2026-08-23 자바 참조와 자료형 기초

### 문자열과 참조 자료형

> String은 참조 타입이지만 문자열 리터럴을 사용하여 간편하게 객체를 생성하고 사용할 수 있습니다.

문자열은 문자 하나 이상이 연결된 데이터이며, 자바에서는 `String` 클래스로 처리합니다. `String`은 객체의 주소를 참조하는 자료형이지만 문자열 리터럴을 사용하여 기본 타입처럼 선언하고 사용할 수 있습니다.

```java
String first = "Java";
String second = " Programming";
String message = first.concat(second);

System.out.println(message);
```

문자열 연결에는 `concat()` 메소드를 사용할 수 있으며, 이후에는 `+` 연산자와 문자열 빌더 계열 도구의 차이도 함께 다룰 수 있습니다. 문자열은 불변 객체이므로 연결, 치환, 분할 등의 작업에서 새 객체 생성 여부를 고려해야 합니다.

여러 줄 텍스트는 텍스트 블록 문법을 사용할 수 있습니다. 텍스트 블록은 큰따옴표 세 개로 시작하고 끝나며, 여러 줄의 문자열을 비교적 읽기 쉬운 형태로 작성할 수 있습니다.

```java
String text = """
        AAA
        BBB
        CCC
        """;

System.out.println(text);
```

기본 자료형은 값 자체를 직접 저장하지만, 참조 자료형은 객체가 위치한 주소를 통해 대상에 접근합니다. `String`, 배열, 클래스 타입은 대표적인 참조 자료형이며, 점 연산자를 통해 객체가 제공하는 기능을 호출합니다.


## 2026-08-31 Java 배열 반복문 패턴 매칭 복습

### 8. 배열 length와 String length()

배열:

```java
int[] nums = {10, 20, 30};

nums.length
```

String:

```java
String text = "hello";

text.length()
```

차이:

```text
배열   → length
String → length()
```

왜?

#### 배열의 length

배열 객체가 가지고 있는 **특별한 길이 값**이다.

```java
nums.length
```

→ 값을 확인

그래서 `()`가 없다.

#### String의 length()

String 클래스에 정의되어 있는 **메서드**이다.

```java
text.length()
```

→ 메서드를 실행

그래서 `()`가 있다.

비슷하게:

```java
text.isEmpty()
text.toUpperCase()
text.toLowerCase()
```

전부 메서드이므로 `()`가 붙는다.

---


### 9. isEmpty()와 isBlank()

```java
String a = "";
String b = " ";
```

#### isEmpty()

문자열 길이가 0인가?

```java
a.isEmpty();   // true
b.isEmpty();   // false
```

`" "`에는 공백 문자 1개가 있기 때문이다.

#### isBlank()

내용이 없거나 공백뿐인가?

```java
a.isBlank();   // true
b.isBlank();   // true
```

정리:

```text
""      → isEmpty true / isBlank true
" "     → isEmpty false / isBlank true
"java"  → 둘 다 false
```

---


## 2026-09-10 자바 상속과 객체 설계

### 문자열 풀과 비교 연산

> 문자열 리터럴은 String Pool에서 공유될 수 있으며, 참조형에서 `==`는 같은 객체를 참조하는지 비교하고 `equals()`는 객체의 논리적 내용이 같은지를 비교합니다.

자바의 문자열 리터럴은 String Pool에서 관리됩니다.

동일한 문자열 리터럴을 여러 변수에 대입하면 기존 문자열 객체를 함께 참조할 수 있습니다.

```java
String str1 = "ABC";
String str2 = "ABC";

System.out.println(str1 == str2);      // true
System.out.println(str1.equals(str2)); // true
```

반면 `new String()`을 사용하면 별도의 `String` 객체가 생성됩니다.

```java
String str1 = "ABC";
String str2 = new String("ABC");

System.out.println(str1 == str2);      // false
System.out.println(str1.equals(str2)); // true
```

여기서 중요한 점은 다음과 같습니다.

* `==` : 두 참조가 같은 객체를 가리키는지 비교
* `equals()` : 객체의 논리적인 내용 비교
* `new String()` : 별도의 문자열 객체 생성
* 문자열 내용 비교에는 일반적으로 `equals()` 사용

문자열 리터럴끼리의 결합은 컴파일 과정에서 하나의 문자열 리터럴로 최적화될 수 있습니다.

```java
String a = "AB" + "C";
String b = "ABC";

System.out.println(a == b); // true가 될 수 있음
```

반면 변수와 문자열을 결합하면 실행 시점에 문자열 연결 작업이 발생할 수 있으므로 참조 동일성을 전제로 작성하면 안 됩니다.

```java
String a = "AB";
String b = a + "C";
String c = "ABC";

System.out.println(b.equals(c)); // true
```


