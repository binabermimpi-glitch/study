---
type: concept
aliases: [IntelliJ IDEA, 프로젝트 SDK, Language Level, 소스 루트]
knowledge_type: practical-core
classification_reason: Java 프로젝트를 컴파일하고 실행하기 위한 일상적인 개발 환경 설정이다.
difficulty: 입문
status: growing
prerequisites:
  - "[[20 위키/01 개념/Java/JDK JRE JVM]]"
related: []
sources:
  - "[[20 위키/03 출처 노트/2026-08-23 자바 실행 구조와 기초 문법]]"
created: 2026-08-23
updated: 2026-08-23
---

# IntelliJ Java 프로젝트 구조

## 한 문장 설명

IntelliJ Java 프로젝트는 사용할 JDK, 소스 디렉터리, 모듈과 컴파일 출력 위치가 올바르게 연결되어야 한다.

## 주요 설정

| 항목 | 역할 |
|---|---|
| Project SDK | 컴파일과 실행에 사용할 JDK |
| Language Level | IDE와 컴파일러가 허용할 Java 문법 수준 |
| Module | 프로젝트 내부의 빌드·구성 단위 |
| Sources Root | Java 소스가 위치하는 디렉터리 |
| Output Path | 컴파일된 클래스가 생성되는 위치 |

## 주의할 점

- SDK가 빠졌거나 프로젝트와 모듈 설정이 어긋나면 표준 클래스 인식이나 실행이 실패할 수 있다.
- `.idea`와 `.iml`은 IDE 설정 파일이다. Git에 어떤 파일을 포함할지는 프로젝트와 팀 정책에 맞춘다.
- 공백·한글 경로는 현대 도구에서 지원되는 경우가 많지만 일부 오래된 스크립트나 도구에서 문제가 될 수 있다.
- Maven이나 Gradle 프로젝트에서는 출력 디렉터리와 의존성 구성을 빌드 도구가 관리하는 경우가 많다.

## 흔한 실수

- JDK를 설치했지만 프로젝트 SDK에 연결하지 않는다.
- 일반 디렉터리에 코드를 두고 Sources Root로 지정하지 않는다.
- IDE 설정과 Gradle/Maven 설정을 서로 다른 Java 버전으로 둔다.

## 출처

- [[20 위키/03 출처 노트/2026-08-23 자바 실행 구조와 기초 문법]]

