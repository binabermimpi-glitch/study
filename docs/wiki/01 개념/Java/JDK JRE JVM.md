---
type: concept
aliases: [JDK, JRE, JVM]
knowledge_type: foundation
classification_reason: Java 코드가 컴파일되고 실행되는 구조를 이해하는 기반이다.
difficulty: 입문
status: growing
prerequisites: []
related: []
sources: ["[2026-08-23 백엔드 개발과 취업 준비](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%EA%B3%BC%20%EC%B7%A8%EC%97%85%20%EC%A4%80%EB%B9%84>)"]
created: 2026-08-23
updated: 2026-08-23
---

# JDK, JRE, JVM

## 한 문장 설명

JDK는 Java 개발 도구 묶음이고, JVM은 컴파일된 Java 바이트코드를 실행하는 가상 머신이다.

## 핵심 흐름

```text
소스 코드(.java) → javac로 컴파일 → 바이트코드(.class) → JVM에서 실행
```

## 용어 구분

| 용어 | 역할 |
|---|---|
| JVM | `.class`의 바이트코드를 로딩하고 실행한다. |
| JRE | JVM과 Java 프로그램 실행에 필요한 구성요소를 가리키는 개념이다. |
| JDK | 컴파일러 등 개발 도구와 실행에 필요한 구성요소를 제공한다. |

## JDK 설치 구조

- `bin`: `java`, `javac` 등 실행 명령
- `conf`: 런타임 관련 설정
- `include`: JNI 네이티브 연동용 헤더
- `jmods`: Java 9 이후 표준 모듈 파일
- `lib`: 실행에 필요한 내부 라이브러리
- `legal`: 구성요소별 라이선스 정보

Java 9부터 도입된 모듈 시스템은 여러 패키지를 모듈로 묶고 의존성과 공개 범위를 명시하게 한다. 가장 기본적인 표준 모듈은 `java.base`다.

## 주의할 점

현대 Java 배포 방식에서는 독립적인 JRE가 항상 별도 제품으로 제공되는 것은 아니다. 설치한 JDK 버전과 배포판의 문서를 확인한다.

## 실무에서는 어떻게 쓰이나

프로젝트의 Java 버전 불일치, 컴파일 오류와 실행 오류를 구분할 때 필요하다. 실무에서 직접 JVM을 구현하지는 않지만 빌드·배포·성능 문제를 이해하는 토대가 된다.

## 출처

- [2026-08-23 백엔드 개발과 취업 준비](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EB%B0%B1%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%EA%B3%BC%20%EC%B7%A8%EC%97%85%20%EC%A4%80%EB%B9%84>)
- [2026-08-23 자바 참조와 자료형 기초](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EC%9E%90%EB%B0%94%20%EC%B0%B8%EC%A1%B0%EC%99%80%20%EC%9E%90%EB%A3%8C%ED%98%95%20%EA%B8%B0%EC%B4%88>)
- [2026-08-23 자바 실행 구조와 기초 문법](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EC%9E%90%EB%B0%94%20%EC%8B%A4%ED%96%89%20%EA%B5%AC%EC%A1%B0%EC%99%80%20%EA%B8%B0%EC%B4%88%20%EB%AC%B8%EB%B2%95>)
