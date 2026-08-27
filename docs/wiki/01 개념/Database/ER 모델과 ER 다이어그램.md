---
type: concept
aliases: [ERD, Entity-Relationship Model, 개체 관계 모델]
knowledge_type: practical-core
classification_reason: 데이터베이스 설계와 JPA 엔터티 관계를 시각화하는 데 자주 사용된다.
difficulty: 초급
status: growing
certifications: [정보처리기사, SQLD]
exam_importance: high
practical_importance: high
memorization_required: medium
sources: ["[2026-08-23 정보처리기사 데이터 모델링과 정규화](</wiki/03%20%EC%B6%9C%EC%B2%98%20%EB%85%B8%ED%8A%B8/2026-08-23%20%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%AA%A8%EB%8D%B8%EB%A7%81%EA%B3%BC%20%EC%A0%95%EA%B7%9C%ED%99%94>)"]
created: 2026-08-25
updated: 2026-08-25
---

# ER 모델과 ER 다이어그램

## 핵심 요소

- 개체(Entity): 관리할 대상
- 속성(Attribute): 대상에 관해 저장할 정보
- 관계(Relationship): 개체 사이의 의미 있는 연관성

ER 모델은 피터 첸이 제안한 개념적 데이터 모델이다. ER 다이어그램은 그 모델링 결과를 그림으로 나타낸 것이다.

## 유도 속성

다른 속성으로 계산할 수 있는 속성이다. 예를 들어 `판매가격 = 가격 × (1 - 할인율)`이라면 판매가격은 유도 속성으로 볼 수 있다. 실제 저장 여부는 정확성, 계산 비용과 이력 보존 요구를 보고 결정한다.

## 국비수업 연결

Spring/JPA의 `@Entity`가 ER 모델의 개체와 완전히 같은 개념은 아니지만, 데이터베이스 엔터티와 객체 모델을 연결할 때 중요한 출발점이다.

## 자격증 시험 포인트

전통적인 Chen 표기에서 개체는 사각형, 관계는 마름모, 속성은 타원으로 나타낸다. 실무 도구는 Crow's Foot 등 다른 표기법을 많이 사용한다.

