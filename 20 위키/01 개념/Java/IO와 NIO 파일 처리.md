---
type: concept
aliases: []
knowledge_type: practical-core
classification_reason: "제공된 수업 자료에서 객체 설계와 데이터 처리에 사용하는 주제다."
difficulty: 초급
status: growing
curriculum_stage: 10
prerequisites: []
related: []
sources:
  - "[[10 원문/자바 백엔드 수업/2026-08-27 자바 메소드와 객체 생성]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-17 자바 IO와 NIO 파일 처리]]"
  - "[[10 원문/2026-08-23 자바 참조와 자료형 기초]]"
  - "[[10 원문/자바 백엔드 수업/2026-09-27 자바 스트림과 IO 핵심]]"
created: 2026-10-10
updated: 2026-10-10
---

# IO와 NIO 파일 처리

## 2026-08-27 자바 메소드와 객체 생성

### 자바 메소드와 객체 생성


## 2026-09-17 자바 IO와 NIO 파일 처리

### 자바 IO와 NIO 파일 처리


### Path와 Files의 역할 구분

> `Path`는 파일, 디렉터리의 경로를 표현하고, `Files`는 해당 경로를 대상으로 생성, 복사, 이동, 삭제, 조회 작업을 수행합니다.

자바의 전통적인 `java.io.File`은 파일 또는 디렉터리를 나타내는 객체입니다. 반면 NIO의 `Path`는 파일 자체가 아니라 위치 정보인 경로를 표현하며, 실제 파일 시스템 작업은 정적 유틸리티 클래스인 `Files`가 담당합니다.

`Path.of()`로 경로 객체를 만들어도 파일이나 디렉터리가 즉시 생성되지는 않습니다. 경로를 지정한 뒤 `Files.createDirectory()`, `Files.createDirectories()`, `Files.createTempFile()` 등의 메서드를 호출해야 실제 파일 시스템에 대상이 생성됩니다.

| 구분 | 주요 역할 | 대표 API |
|---|---|---|
| `File` | 전통 IO 방식의 파일, 디렉터리 객체를 표현합니다. | `new File(...)` |
| `Path` | 파일 시스템 위치를 생성, 결합, 변환합니다. | `Path.of(...)`, `toAbsolutePath()` |
| `Files` | 경로 대상의 생성, 삭제, 복사, 이동, 읽기, 쓰기를 수행합니다. | `createTempFile()`, `copy()`, `deleteIfExists()` |
| `FileSystem` | 파일 시스템과 경로 관련 기능을 제공합니다. | `FileSystems.getDefault()` |

임시 파일은 운영체제의 임시 디렉터리에 생성됩니다. `System.getProperty("java.io.tmpdir")`로 기본 임시 디렉터리를 확인할 수 있으며, `Files.createTempFile(prefix, suffix)`는 접두사, 난수, 접미사를 조합한 고유한 임시 파일을 생성합니다.

```java
Path tempFile = Files.createTempFile("stream-", ".txt");

System.out.println(System.getProperty("java.io.tmpdir"));
System.out.println(tempFile.toAbsolutePath());
```

사용 완료된 임시 파일은 즉시 삭제하는 방식이 일반적입니다. `Files.deleteIfExists(path)`는 대상 파일이 존재할 때만 삭제하므로 정리 코드에서 안전하게 사용할 수 있습니다.

`Path.toFile()`은 NIO의 경로 객체를 기존 IO API가 요구하는 `File` 객체로 변환합니다. 따라서 `Path`로 경로를 관리하면서 `FileInputStream`, `FileOutputStream` 같은 기존 스트림 생성자와 연동할 수 있습니다.


### 바이트 스트림과 파일 복사

> 바이트 스트림은 이미지, 영상, 바이너리 파일처럼 문자 인코딩으로 해석하지 않는 이진 데이터를 처리하는 기본 방식입니다.

`InputStream`과 `OutputStream`은 1바이트 단위의 데이터 입출력을 담당합니다. `FileInputStream`은 파일의 바이트를 읽고, `FileOutputStream`은 바이트 데이터를 파일에 기록합니다.

`read()`는 읽은 바이트 값을 `int`로 반환합니다. 파일의 끝에 도달하면 더 이상 읽을 데이터가 없음을 의미하는 `-1`을 반환하므로, 반복 조건에서 종료 여부를 판단해야 합니다.

```java
try (FileInputStream input = new FileInputStream(path.toFile())) {
    int value;

    while ((value = input.read()) != -1) {
        System.out.print((char) value);
    }
}
```

전체 데이터를 한 번에 배열로 읽을 때는 `readAllBytes()`를 사용합니다. 반환값은 `byte[]`이며, 텍스트로 해석하려면 명시적인 문자 인코딩을 적용해 `String`으로 변환해야 합니다.

```java
byte[] bytes = input.readAllBytes();
String text = new String(bytes, StandardCharsets.UTF_8);
```

파일 복사는 원본 데이터의 크기와 처리 방식에 따라 여러 방법으로 구현할 수 있습니다.

| 방식 | 핵심 API | 적합한 상황 |
|---|---|---|
| NIO 파일 복사 | `Files.copy(source, target)` | 일반적인 파일 복사를 간결하게 구현할 때 적합합니다. |
| 스트림 전송 | `input.transferTo(output)` | 입력 스트림 내용을 출력 스트림으로 전달할 때 적합합니다. |
| 채널 전송 | `FileChannel.transferTo()` | 매우 큰 파일을 고성능으로 처리할 때 적합합니다. |
| 직접 읽기, 쓰기 | `read()`와 `write()` | 변환, 필터링, 사용자 정의 처리가 필요한 경우에 적합합니다. |

대용량 파일은 `FileChannel`과 `ByteBuffer`를 조합한 채널 기반 처리 방식이 유리할 수 있습니다. 반면 일반적인 파일 복사에서는 `Files.copy()` 또는 `transferTo()`가 코드가 짧고 의도가 명확합니다.


### 버퍼 스트림과 이진 파일 처리

> 버퍼 스트림은 기본 스트림을 감싸서 입출력 호출 횟수를 줄이고, 데이터 처리 효율을 높이는 보조 스트림입니다.

기본 스트림은 파일, 네트워크, 데이터베이스 같은 실제 데이터 원본 또는 목적지에 직접 연결됩니다. 보조 스트림은 기본 스트림에 추가 기능을 제공하며, 여러 스트림을 감싸는 구조를 스트림 체이닝이라고 합니다.

| 분류 | 데이터 종류 | 대표 클래스 |
|---|---|---|
| 바이트 스트림 | 이미지, 영상, 압축 파일, 실행 파일 등의 이진 데이터입니다. | `InputStream`, `OutputStream` |
| 문자 스트림 | 텍스트 파일과 문자 데이터입니다. | `Reader`, `Writer` |
| 기본 스트림 | 실제 파일이나 네트워크 자원에 직접 연결됩니다. | `FileInputStream`, `FileReader` |
| 보조 스트림 | 버퍼링, 형식 변환, 객체 처리 등의 기능을 추가합니다. | `BufferedInputStream`, `BufferedReader` |

`BufferedInputStream`과 `BufferedOutputStream`은 각각 입력과 출력 데이터를 내부 버퍼에 모아 처리합니다. 특히 작은 단위의 읽기, 쓰기가 반복될 때 파일 시스템 접근 횟수를 줄일 수 있습니다.

```java
try (
    BufferedInputStream input =
        new BufferedInputStream(new FileInputStream("A.png"));
    BufferedOutputStream output =
        new BufferedOutputStream(new FileOutputStream("B.png"))
) {
    output.write(input.readAllBytes());
}
```

PNG와 같은 이미지는 문자 데이터가 아니라 이진 데이터입니다. 따라서 `Reader`, `Writer`를 사용해 처리하면 데이터 구조가 손상될 수 있으며, 반드시 바이트 스트림을 사용해야 합니다.

`try-with-resources`는 스트림 사용이 끝난 뒤 자동으로 `close()`를 호출합니다. 파일 핸들과 버퍼 자원이 누적되는 문제를 예방하므로 입출력 코드의 기본 구조로 사용하는 것이 좋습니다.


### 문자 스트림과 UTF-8 인코딩

> 문자 스트림은 텍스트를 문자 단위로 처리하며, 파일 저장과 읽기 과정에서 동일한 문자 인코딩을 적용해야 합니다.

`Reader`와 `Writer`는 문자 기반 스트림입니다. 파일의 텍스트를 처리할 때는 바이트를 문자로 변환하는 디코딩과 문자를 바이트로 변환하는 인코딩이 수행되므로 `Charset` 설정이 중요합니다.

`InputStreamReader`와 `OutputStreamWriter`는 바이트 스트림과 문자 스트림 사이를 연결하는 변환 스트림입니다. 생성자에 `StandardCharsets.UTF_8`을 전달하면 UTF-8 기준으로 텍스트를 읽고 쓸 수 있습니다.

```java
try (
    OutputStreamWriter writer = new OutputStreamWriter(
        new FileOutputStream(path.toFile()),
        StandardCharsets.UTF_8
    )
) {
    writer.write("자바 문자 스트림");
}
```

UTF-8은 다국어 문자를 폭넓게 표현하는 표준 문자 인코딩입니다. 파일을 작성할 때와 읽을 때 서로 다른 인코딩을 사용하면 한글 등의 문자가 깨질 수 있으므로, 입출력 양쪽에 동일한 문자셋을 지정해야 합니다.

`FileReader`와 `FileWriter`는 간단한 문자 파일 처리에 사용할 수 있습니다. 다만 인코딩을 명확하게 지정해야 하는 상황에서는 `InputStreamReader`, `OutputStreamWriter` 또는 NIO의 `Files` 메서드를 사용하는 편이 안전합니다.

API 문서를 확인할 때는 생성자의 매개변수와 반환 타입을 우선 살펴보는 것이 좋습니다. 예를 들어 `InputStreamReader`의 문자셋 관련 생성자를 확인하면 문자열 이름 또는 `Charset` 객체를 사용할 수 있음을 알 수 있습니다.


### 텍스트 파일 읽기 방식 선택

> 작은 텍스트 파일은 전체 읽기 방식을 사용하고, 큰 파일, 로그 파일, 행 단위 제어가 필요한 파일은 버퍼 또는 스트림 기반 방식으로 처리합니다.

`Files.readString()`은 파일 전체를 하나의 `String`으로 읽습니다. 내용이 작고 전체 텍스트를 그대로 처리하면 되는 경우 코드가 가장 단순합니다. 인코딩 문제를 예방하려면 `StandardCharsets.UTF_8`을 함께 지정합니다.

```java
String content = Files.readString(
    Path.of("A.txt"),
    StandardCharsets.UTF_8
);
```

`Files.readAllLines()`는 파일을 줄 단위로 읽어 `List<String>`으로 반환합니다. 각 행을 인덱스로 접근하거나 일반 반복문으로 처리해야 할 때 적합합니다.

```java
List<String> lines = Files.readAllLines(
    Path.of("A.txt"),
    StandardCharsets.UTF_8
);

for (String line : lines) {
    System.out.println(line);
}
```

대용량 텍스트나 로그 파일은 전체를 메모리에 적재하지 않는 방식이 안전합니다. `BufferedReader.readLine()`은 한 줄씩 순차적으로 읽을 수 있으며, `Files.newBufferedReader()`는 NIO 방식으로 버퍼 문자 입력을 생성합니다.

| 처리 목적 | 권장 API | 반환 또는 처리 방식 |
|---|---|---|
| 작은 파일 전체 출력 | `Files.readString()` | 전체 내용을 `String`으로 반환합니다. |
| 전체 행을 목록으로 관리 | `Files.readAllLines()` | 각 행을 `List<String>`으로 반환합니다. |
| 큰 파일의 순차 처리 | `BufferedReader.readLine()` | 한 줄씩 읽으며 반복 처리합니다. |
| 스트림 연산 기반 처리 | `Files.lines()` | 각 행을 `Stream<String>`으로 반환합니다. |

`Files.lines()`는 파일의 각 줄을 `Stream<String>` 요소로 제공합니다. 스트림은 파일 자원을 유지하므로 반드시 `try-with-resources`로 감싸서 사용해야 합니다.

```java
try (Stream<String> lines = Files.lines(
    Path.of("A.txt"),
    StandardCharsets.UTF_8
)) {
    lines
        .filter(line -> !line.isBlank())
        .forEach(System.out::println);
}
```

공백으로 구분된 성적 데이터에서 이름만 추출하려면 각 줄을 `split("\\s+")`로 분리하고 배열의 첫 번째 요소를 사용합니다. 분리 결과가 비어 있을 가능성을 고려해 길이 검증을 함께 수행하는 것이 안전합니다.

```java
String[] parts = line.split("\\s+");

if (parts.length > 0) {
    System.out.println(parts[0]);
}
```

숫자 데이터는 파일에서 읽을 때 문자열 상태이므로 산술 연산 전에 `Integer.parseInt()`로 변환해야 합니다. 예를 들어 이름 뒤에 국어, 영어, 수학 점수가 있다면 분리한 배열의 점수 요소를 정수로 변환해 총점을 계산할 수 있습니다.


### NIO 버퍼 상태와 채널 처리

> NIO 버퍼는 `capacity`, `position`, `limit` 상태값으로 데이터 저장 위치와 읽기 범위를 관리하며, `flip()`으로 쓰기 모드에서 읽기 모드로 전환합니다.

`ByteBuffer.allocate(n)`은 지정한 크기의 바이트 버퍼를 생성합니다. 버퍼는 데이터를 저장하는 메모리 공간이며, 채널을 통해 데이터를 주고받을 때 중간 저장소 역할을 수행합니다.

`capacity`는 버퍼의 최대 저장 가능 크기입니다. `position`은 다음 읽기 또는 쓰기가 수행될 위치를 가리키며, `limit`은 읽기 또는 쓰기가 가능한 한계를 나타냅니다.

| 상태 | 의미 | 초기 버퍼 예시 |
|---|---|---|
| `capacity` | 버퍼 전체 용량입니다. | `10` |
| `position` | 다음 작업이 수행될 위치입니다. | `0` |
| `limit` | 현재 접근 가능한 최대 위치입니다. | `10` |

쓰기 모드에서는 `put()`으로 데이터를 추가하며, 데이터가 추가될 때마다 `position`이 증가합니다. 이때 `limit`은 일반적으로 버퍼 전체 용량을 유지합니다.

```java
ByteBuffer buffer = ByteBuffer.allocate(10);

buffer.put((byte) 'A');
buffer.put((byte) 'B');
buffer.put((byte) 'C');
buffer.put((byte) 'D');
```

`flip()`은 버퍼를 읽기 모드로 전환합니다. 현재 `position` 값을 `limit`으로 옮기고, `position`은 `0`으로 초기화합니다. 따라서 기록한 데이터의 처음부터 마지막 기록 위치까지만 읽을 수 있습니다.

```java
buffer.flip();

while (buffer.hasRemaining()) {
    System.out.println((char) buffer.get());
}
```

`hasRemaining()`은 현재 `position`과 `limit` 사이에 읽을 요소가 남았는지 확인합니다. 반복적으로 `get()`을 호출하면 `position`이 증가하며, `position == limit`이 되면 더 이상 읽을 데이터가 없으므로 반복이 종료됩니다.

`FileChannel`은 파일과 버퍼 사이의 데이터 전송을 담당합니다. 읽기 채널은 `StandardOpenOption.READ`, 쓰기 채널은 `CREATE`, `WRITE`, `TRUNCATE_EXISTING` 등의 옵션을 조합해 목적에 맞게 열 수 있습니다.


### 디렉터리 탐색과 파일 감시

> NIO의 디렉터리 탐색 API는 현재 디렉터리 조회, 재귀 탐색, 조건 검색, 방문 이벤트 기반 트리 순회 기능을 제공합니다.

`Files.list()`는 지정한 디렉터리의 바로 아래 항목을 `Stream<Path>`로 반환합니다. 하위 디렉터리까지 재귀적으로 탐색하려면 `Files.walk()`를 사용하며, 탐색 깊이를 제한할 수도 있습니다.

`Files.find()`는 파일 경로와 속성을 기준으로 조건 검색을 수행합니다. 예를 들어 확장자가 특정 문자열인 파일만 찾거나, 파일 크기, 생성 시간 등의 속성을 기준으로 항목을 필터링할 수 있습니다.

| 메서드 | 탐색 범위 | 주요 목적 |
|---|---|---|
| `Files.list()` | 현재 디렉터리만 탐색합니다. | 바로 아래 파일과 폴더 목록을 조회합니다. |
| `Files.walk()` | 하위 디렉터리를 재귀 탐색합니다. | 트리 구조 전체를 순회합니다. |
| `Files.find()` | 재귀 탐색과 조건 검사를 결합합니다. | 조건에 맞는 파일을 검색합니다. |
| `Files.walkFileTree()` | 방문 이벤트를 콜백으로 제어합니다. | 복잡한 트리 순회 로직을 구현합니다. |

`FileVisitor`는 디렉터리 트리를 탐색할 때 발생하는 이벤트를 처리하는 인터페이스입니다. 모든 메서드를 직접 구현하는 대신, 일반적으로 기본 구현을 제공하는 `SimpleFileVisitor`를 상속해 필요한 이벤트만 재정의합니다.

| 이벤트 메서드 | 호출 시점 |
|---|---|
| `preVisitDirectory()` | 디렉터리에 진입하기 전에 호출됩니다. |
| `visitFile()` | 파일을 방문했을 때 호출됩니다. |
| `visitFileFailed()` | 파일 또는 디렉터리 접근에 실패했을 때 호출됩니다. |
| `postVisitDirectory()` | 디렉터리 탐색을 완료하고 나올 때 호출됩니다. |

```java
Files.walkFileTree(root, new SimpleFileVisitor<>() {
    @Override
    public FileVisitResult visitFile(
        Path file,
        BasicFileAttributes attrs
    ) {
        System.out.println(file);
        return FileVisitResult.CONTINUE;
    }
});
```

`WatchService`는 디렉터리의 생성, 수정, 삭제 이벤트를 감시하는 기능입니다. 파일 시스템 변경 이벤트를 기반으로 업로드 폴더 감시, 로그 변경 감지, 권한 기반 처리 등의 기능을 구현할 수 있습니다.

## 2026-08-23 자바 참조와 자료형 기초

### 바이트와 스트림

> 컴퓨터는 데이터를 비트와 바이트 단위로 저장하며, 스트림은 바이트 단위 데이터가 입출력 장치 사이를 이동하는 통로입니다.

컴퓨터 내부의 모든 데이터는 결국 `0`과 `1`의 비트 형태로 처리됩니다. 비트 8개는 1바이트이며, 바이트는 데이터를 저장하고 전달하는 기본 단위입니다. 메모리에서는 일반적으로 바이트 단위의 저장 공간과 주소가 연결됩니다.

| 단위 | 구성 | 의미 |
|---|---|---|
| 비트 | `0` 또는 `1` 하나로 구성됩니다. | 가장 작은 정보 단위입니다. |
| 바이트 | 비트 8개로 구성됩니다. | 기본 저장 및 전송 단위입니다. |
| ASCII 코드 | 기본 문자와 숫자를 코드값으로 표현합니다. | 1바이트 기반 문자 표현과 연결됩니다. |
| 유니코드 | 다국어 문자를 표현하는 확장 문자 체계입니다. | 자바의 `char` 처리와 연결됩니다. |

키보드로 입력한 문자나 숫자는 내부적으로 바이트 형태로 변환됩니다. 입력된 데이터는 버퍼와 같은 임시 기억 공간을 거쳐 화면, 파일, 네트워크 등의 대상에 전달됩니다.

- 버퍼는 데이터를 일시적으로 보관하여 입출력 속도 차이를 조절하는 임시 기억 공간입니다.
- 스트림은 바이트 단위 데이터를 입력 장치와 출력 장치 사이에서 전달하는 흐름입니다.
- `InputStream`과 `OutputStream` 계열은 바이트 기반 입출력 구조를 나타냅니다.
- 문자 기반 스트림은 내부적으로 문자와 바이트 간 변환 과정을 포함할 수 있습니다.

`java.io` 패키지에서 이름에 `InputStream` 또는 `OutputStream`이 포함된 클래스는 바이트 단위 입출력과 직접적으로 관련됩니다. 파일, 콘솔, 네트워크 통신 등 다양한 입출력 작업은 이러한 스트림 구조를 기반으로 구현됩니다.


## 2026-09-27 자바 스트림과 IO 핵심

### 5. 자바 IO와 파일 처리

> 자바 IO는 바이트, 문자, 객체 단위로 데이터를 읽고 쓰며, 처리 대상과 데이터 특성에 따라 스트림, 버퍼, 파일 시스템 API를 선택합니다.

자바 입출력은 크게 바이트 단위, 문자 단위, 객체 단위 처리로 구분할 수 있습니다.

파일, 네트워크, 채팅, 이미지, 동영상 등 데이터를 전달하는 작업은 입출력 처리와 연결됩니다.

| 처리 단위 | 대표 클래스 | 적합한 데이터 |
|---|---|---|
| 바이트 단위 | `InputStream`, `OutputStream` | 이미지, 음성, 영상, 바이너리 파일 |
| 문자 단위 | `Reader`, `Writer` | 텍스트 파일과 문자열 데이터 |
| 객체 단위 | `ObjectInputStream`, `ObjectOutputStream` | 직렬화 가능한 객체 데이터 |

#### 바이트 스트림

바이트 스트림은 바이너리 데이터를 처리하는 기본 스트림입니다.

대표적인 클래스는 다음과 같습니다.

```text
InputStream
OutputStream
```

파일을 대상으로 사용할 때는 다음 클래스를 사용할 수 있습니다.

```text
FileInputStream
FileOutputStream
```

`FileInputStream`은 파일의 데이터를 바이트 단위로 읽습니다.

`FileOutputStream`은 파일에 바이트 데이터를 씁니다.

이미지, 음성, 영상처럼 원본 바이트가 중요한 데이터 처리에 사용할 수 있습니다.

#### FileOutputStream

```java
try (FileOutputStream out = new FileOutputStream("a.txt")) {
    out.write(100);
    out.write(97);
    out.write(98);
}
```

`write(int)`는 정수 전체를 파일에 저장하는 것이 아니라 하위 1바이트를 출력합니다.

기본적으로 기존 파일이 존재하면 내용을 덮어씁니다.

기존 파일 뒤에 내용을 추가하고 싶다면 두 번째 인수에 `true`를 전달합니다.

```java
try (FileOutputStream out = new FileOutputStream("a.txt", true)) {
    out.write(100);
}
```

```text
false 또는 생략 → 기존 내용 덮어쓰기
true            → 기존 내용 뒤에 추가
```

#### FileInputStream

바이트 스트림의 `read()`는 읽은 데이터를 `int`로 반환합니다.

```java
int data = in.read();
```

여기서 반환형이 `int`인 중요한 이유 중 하나는 실제 바이트 값뿐만 아니라 **파일의 끝을 나타내는 `-1`도 표현해야 하기 때문**입니다.

따라서 파일을 끝까지 읽을 때 다음 패턴을 많이 사용합니다.

```java
try (FileInputStream in = new FileInputStream("a.txt")) {

    int data;

    while ((data = in.read()) != -1) {
        System.out.print((char) data);
    }
}
```

처리 흐름은 다음과 같습니다.

```text
read()
↓
데이터 존재
↓
int 값 반환
↓
처리
↓
다시 read()

...

데이터 없음
↓
-1 반환
↓
반복 종료
```

---


### 6. 문자 스트림

문자 스트림은 텍스트 데이터를 처리할 때 사용합니다.

대표적인 클래스는 다음과 같습니다.

```text
Reader
Writer
```

파일을 문자 단위로 처리할 때는 `FileReader`, `FileWriter` 등을 사용할 수 있습니다.

텍스트 처리에서는 문자 인코딩도 중요합니다.

운영체제나 실행 환경에 따라 기본 인코딩이 달라질 수 있으므로 필요한 경우 UTF-8 등의 인코딩을 명시하는 것이 안전합니다.

문자 스트림에서는 다음과 같은 클래스도 자주 사용됩니다.

```text
BufferedReader
BufferedWriter
```

`BufferedReader`는 문자 데이터를 버퍼에 모아 효율적으로 읽을 수 있게 해줍니다.

특히 다음 메서드를 이용하여 한 줄씩 읽을 수 있습니다.

```java
readLine()
```

`BufferedWriter`에서는 플랫폼에 맞는 줄바꿈을 위해 다음 메서드를 사용할 수 있습니다.

```java
newLine()
```

---


### 7. 버퍼

버퍼는 데이터를 바로바로 처리하지 않고 **임시 메모리 공간에 일정량 모아두었다가 처리하는 구조**입니다.

예를 들어 데이터가 하나씩 들어올 때마다 매번 외부 장치와 입출력을 수행하면 많은 입출력 작업이 발생할 수 있습니다.

```text
데이터 → 바로 출력
데이터 → 바로 출력
데이터 → 바로 출력
데이터 → 바로 출력
```

버퍼를 사용하면 다음과 같이 처리할 수 있습니다.

```text
데이터
데이터
데이터
데이터
↓
버퍼에 저장
↓
한꺼번에 처리
```

이를 통해 입출력 횟수를 줄여 성능을 향상시킬 수 있습니다.

#### flush()

`flush()`는 출력 버퍼에 남아 있는 데이터를 실제 출력 대상으로 밀어내는 역할을 합니다.

```text
프로그램
↓
버퍼
↓ flush()
파일 / 네트워크 등의 출력 대상
```

`close()`가 호출될 때 일반적으로 남아 있는 출력 데이터도 처리되지만, 스트림을 닫기 전에 즉시 데이터를 전달해야 하는 상황에서는 `flush()`가 중요할 수 있습니다.

---


### 8. IO, NIO, NIO.2

자바의 파일 및 데이터 입출력 방식은 크게 다음과 같이 구분해서 볼 수 있습니다.

| 구분 | 중심 개념 | 주요 용도 |
|---|---|---|
| IO | 스트림 | 순차적인 데이터 입출력 |
| NIO | 버퍼와 채널 | 버퍼 중심의 효율적인 데이터 처리 |
| NIO.2 | `Path`, `Files` | 파일 및 파일 시스템 관리 |

#### IO

IO는 스트림 중심으로 데이터를 처리합니다.

```text
입력 → InputStream / Reader
출력 → OutputStream / Writer
```

데이터가 순차적으로 흘러가는 구조로 이해하면 됩니다.

#### NIO

NIO는 `Channel`과 `Buffer`를 중심으로 데이터를 처리합니다.

```text
파일
↕
Channel
↕
Buffer
↕
프로그램
```

스트림 기반 IO와 달리 버퍼를 중심으로 데이터를 읽고 쓰는 구조를 사용합니다.

#### NIO.2

NIO.2에서는 파일과 경로 작업을 위한 `Path`, `Files` API가 중요합니다.

```java
Path
Files
```

이를 이용하여 다음과 같은 작업을 수행할 수 있습니다.

```text
파일 생성
파일 복사
파일 이동
파일 삭제
디렉터리 탐색
파일 존재 여부 확인
파일 정보 확인
```

---


### 9. try-with-resources

파일이나 스트림 같은 자원은 사용이 끝난 후 반드시 닫아야 합니다.

기존에는 다음과 같이 직접 `close()`를 호출해야 했습니다.

```java
FileInputStream in = null;

try {
    in = new FileInputStream("a.txt");

} finally {

    if (in != null) {
        in.close();
    }
}
```

이 방식은 코드가 길어지고 자원을 닫는 코드를 직접 관리해야 합니다.

`try-with-resources`를 사용하면 다음처럼 작성할 수 있습니다.

```java
try (FileInputStream in = new FileInputStream("a.txt")) {

    // 파일 읽기

}
```

`try` 블록이 끝나면 자원이 자동으로 닫힙니다.

이 기능을 사용할 수 있는 객체는 기본적으로 `AutoCloseable`을 구현해야 합니다.

개념적으로 다음과 같이 이해할 수 있습니다.

```text
자원 생성
↓
try 블록에서 사용
↓
try 블록 종료
↓
자동 close()
```

따라서 파일이나 스트림을 다룰 때는 `try-with-resources`를 적극적으로 사용하는 것이 좋습니다.

---


### 10. 파일 입출력과 예외

파일을 읽거나 쓰는 작업에서는 여러 문제가 발생할 수 있습니다.

예를 들어 다음과 같은 상황입니다.

```text
파일이 존재하지 않음
파일을 읽을 권한이 없음
파일을 쓰지 못함
입출력 도중 오류 발생
```

대표적인 예외는 다음과 같습니다.

```java
FileNotFoundException
IOException
```

이들은 검사 예외이므로 컴파일 단계에서 예외 처리가 요구됩니다.

방법은 크게 두 가지입니다.

#### 직접 처리

```java
try {

    // 파일 작업

} catch (IOException e) {

    // 예외 처리

}
```

#### 호출한 곳으로 위임

```java
public static void readFile() throws IOException {

    // 파일 작업

}
```

따라서 IO 코드를 볼 때는 다음 흐름을 함께 생각하는 것이 중요합니다.

```text
파일/네트워크 등의 외부 데이터
        ↓
입력 또는 출력 스트림
        ↓
필요하면 버퍼 사용
        ↓
데이터 읽기/쓰기
        ↓
예외 처리
        ↓
자원 close
```

`try-with-resources`를 사용하면 마지막 자원 해제 과정은 자동으로 처리할 수 있습니다.

