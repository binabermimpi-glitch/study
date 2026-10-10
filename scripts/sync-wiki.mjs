import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(scriptDir, '..')
const docsDir = path.join(root, 'docs')

const sections = [
  { source: '20 위키', destination: 'wiki', label: 'Wiki' },
  { source: '10 원문', destination: 'sources', label: '원문' },
  { source: '90 템플릿', destination: 'templates', label: '템플릿' },
  { source: '00 인박스', destination: 'inbox', label: '인박스' }
]

const slash = value => value.split(path.sep).join('/')
const withoutExtension = value => value.replace(/\.md$/i, '')
const cleanLabel = value => value.replace(/^\d+\s*/, '').replace(/\.md$/i, '')

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => {
      const fullPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return listMarkdownFiles(fullPath)
      return entry.isFile() && entry.name.endsWith('.md') ? [fullPath] : []
    })
}

function outputRelativePath(relativePath) {
  const normalized = slash(relativePath)
  if (/(^|\/)README\.md$/i.test(normalized)) {
    return normalized.replace(/README\.md$/i, 'index.md')
  }
  return normalized
}

const records = sections.flatMap(section => {
  const sourceRoot = path.join(root, section.source)
  return listMarkdownFiles(sourceRoot).map(sourceFile => {
    const sourceRelative = slash(path.relative(root, sourceFile))
    const insideSection = slash(path.relative(sourceRoot, sourceFile))
    const destinationRelative = slash(path.join(section.destination, outputRelativePath(insideSection)))
    const routePath = '/' + withoutExtension(destinationRelative).replace(/\/index$/i, '/')

    return {
      section,
      sourceFile,
      sourceRelative,
      destinationRelative,
      destinationFile: path.join(docsDir, destinationRelative),
      routePath
    }
  })
})

const bySourcePath = new Map()
const byBasename = new Map()

for (const record of records) {
  const sourceKey = withoutExtension(record.sourceRelative)
  bySourcePath.set(sourceKey, record)

  const basename = path.posix.basename(sourceKey)
  if (basename.toLowerCase() === 'readme') continue

  const matches = byBasename.get(basename) || []
  matches.push(record)
  byBasename.set(basename, matches)
}

function slugifyHeading(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\;:'",.<>/?]/g, '')
    .replace(/\s+/g, '-')
}

function resolveWikiTarget(rawTarget) {
  const [pathPart, ...headingParts] = rawTarget.split('#')
  const heading = headingParts.join('#').trim()
  const target = withoutExtension(pathPart.trim().replaceAll('\\', '/'))

  let record = bySourcePath.get(target)

  if (!record) {
    const basenameMatches = byBasename.get(path.posix.basename(target)) || []
    if (basenameMatches.length === 1) record = basenameMatches[0]
  }

  if (!record) return null

  const anchor = heading ? `#${slugifyHeading(heading)}` : ''
  return encodeURI(record.routePath + anchor)
}

function convertObsidianLinks(markdown, sourceRelative) {
  const unresolved = []

  const converted = markdown.replace(/(!?)\[\[([^\]]+)\]\]/g, (whole, imageMark, inner) => {
    if (imageMark) {
      unresolved.push(`${sourceRelative}: ${whole}`)
      return whole
    }

    const separator = inner.indexOf('|')
    const rawTarget = separator >= 0 ? inner.slice(0, separator) : inner
    const alias = separator >= 0 ? inner.slice(separator + 1).trim() : ''
    const labelTarget = rawTarget.split('#')[0].trim()
    const label = alias || path.posix.basename(labelTarget)
    const resolved = resolveWikiTarget(rawTarget)

    if (!resolved) {
      unresolved.push(`${sourceRelative}: [[${inner}]]`)
      return `\`${label}\``
    }

    return `[${label}](<${resolved}>)`
  })

  return { converted, unresolved }
}

for (const section of sections) {
  const target = path.join(docsDir, section.destination)
  fs.rmSync(target, { recursive: true, force: true })
  fs.mkdirSync(target, { recursive: true })
}

const unresolvedLinks = []

for (const record of records) {
  const markdown = fs.readFileSync(record.sourceFile, 'utf8')
  const { converted, unresolved } = convertObsidianLinks(markdown, record.sourceRelative)
  unresolvedLinks.push(...unresolved)

  fs.mkdirSync(path.dirname(record.destinationFile), { recursive: true })
  fs.writeFileSync(record.destinationFile, converted, 'utf8')
}

function titleForRecord(record) {
  const content = fs.readFileSync(record.destinationFile, 'utf8')
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return heading || cleanLabel(path.posix.basename(record.destinationRelative))
}

const javaCurriculumGroups = [
  {
    "text": "1단계 — 실행 환경과 첫 코드",
    "titles": [
      "JDK JRE JVM",
      "JDK 버전과 배포 정책",
      "IntelliJ 프로젝트와 Java API",
      "패키지와 식별자 규칙",
      "main 메서드 선언 읽기"
    ]
  },
  {
    "text": "2단계 — 자료형·변수·연산자",
    "titles": [
      "기본 자료형과 리터럴",
      "형변환과 연산 프로모션",
      "래퍼 클래스와 박싱",
      "변수의 종류와 생명주기",
      "표준 입출력",
      "연산자와 우선순위"
    ]
  },
  {
    "text": "3단계 — 메서드와 참조",
    "titles": [
      "메서드 선언과 호출",
      "매개변수와 인수",
      "메서드 오버로딩",
      "반환형과 return",
      "참조와 점 연산자",
      "String과 참조 자료형"
    ]
  },
  {
    "text": "4단계 — 배열과 반복문",
    "titles": [
      "배열과 2차원 배열",
      "향상된 for문과 반복 제어",
      "배열 복사와 방어적 복사",
      "정렬 알고리즘과 값 교환"
    ]
  },
  {
    "text": "5단계 — 클래스와 객체",
    "titles": [
      "클래스와 접근 제한자",
      "객체 생성과 초기화 순서",
      "생성자와 생성자 오버로딩",
      "this 참조",
      "static과 인스턴스 멤버",
      "캡슐화와 Getter Setter",
      "가변 객체와 불변 객체",
      "Object 클래스",
      "JVM 메모리와 가비지 컬렉션",
      "DTO와 record"
    ]
  },
  {
    "text": "6단계 — 상속·다형성·타입 분기",
    "titles": [
      "객체지향 설계 복습",
      "상속 오버라이딩 다형성",
      "인터페이스",
      "추상 클래스와 추상 메서드",
      "instanceof와 타입 검사",
      "switch 표현식과 패턴 매칭",
      "sealed 클래스",
      "중첩 클래스"
    ]
  },
  {
    "text": "7단계 — 예외 처리",
    "titles": [
      "예외 처리"
    ]
  },
  {
    "text": "8단계 — 컬렉션과 비교",
    "titles": [
      "List와 ListIterator",
      "Set 구현체와 중복 판단",
      "Comparator와 정렬"
    ]
  },
  {
    "text": "9단계 — 람다·메서드 참조·스트림",
    "titles": [
      "람다와 메서드 참조",
      "스트림 API와 리듀스"
    ]
  },
  {
    "text": "10단계 — IO·NIO·파일 처리",
    "titles": [
      "IO와 NIO 파일 처리",
      "객체 직렬화와 역직렬화"
    ]
  }
]

function sidebarItemsFor(section) {
  const sectionRecords = records.filter(record => record.section === section)
  const rootRecord = sectionRecords.find(record => record.destinationRelative === `${section.destination}/index.md`)

  const makeTree = relativeDirectory => {
    const prefix = relativeDirectory ? `${relativeDirectory}/` : ''
    const directRecords = sectionRecords
      .filter(record => {
        const relative = record.destinationRelative.slice(section.destination.length + 1)
        return path.posix.dirname(relative) === (relativeDirectory || '.')
          && path.posix.basename(relative) !== 'index.md'
      })
      .sort((a, b) => titleForRecord(a).localeCompare(titleForRecord(b), 'ko'))

    const directFiles = directRecords
      .map(record => ({ text: titleForRecord(record), link: record.routePath }))

    if (section.destination === 'wiki' && relativeDirectory === '04 자격증') {
      const certificationOrder = [
        '리눅스마스터 2급',
        '정보처리기사',
        '정보처리기사 기출문제',
        '정보처리기사 어플 공부'
      ]
      const filesByTitle = new Map(directFiles.map(item => [item.text, item]))
      const mainItems = certificationOrder.flatMap(title => {
        const item = filesByTitle.get(title)
        return item ? [item] : []
      })
      const codeBase = '04 자격증/정보처리기사 코드 문제'
      const codeIndex = sectionRecords.find(record => record.destinationRelative === `wiki/${codeBase}/index.md`)
      const languages = ['Python', 'Java', 'C언어'].map(language => {
        const languageBase = `${codeBase}/${language}`
        const languageIndex = sectionRecords.find(record => record.destinationRelative === `wiki/${languageBase}/index.md`)
        const items = sectionRecords
          .filter(record => record.destinationRelative.startsWith(`wiki/${languageBase}/`) && !record.destinationRelative.endsWith('/index.md'))
          .map(record => ({ text: titleForRecord(record), link: record.routePath }))
        return { text: language, ...(languageIndex ? { link: languageIndex.routePath } : {}), collapsed: true, items }
      })
      const codeItem = { text: '정보처리기사 코드 문제', ...(codeIndex ? { link: codeIndex.routePath } : {}), collapsed: false, items: languages }
      const sqld = filesByTitle.get('SQLD')
      return [...mainItems, codeItem, ...(sqld ? [sqld] : [])]
    }

    if (section.destination === 'wiki' && relativeDirectory === '01 개념/Java') {
      const recordsByTitle = new Map(directRecords.map(record => [titleForRecord(record), record]))
      const listedTitles = new Set(javaCurriculumGroups.flatMap(group => group.titles))
      const groups = javaCurriculumGroups.map(group => ({
        text: group.text,
        collapsed: true,
        items: group.titles.flatMap(title => {
          const record = recordsByTitle.get(title)
          return record ? [{ text: title, link: record.routePath }] : []
        })
      }))
      const unlisted = directRecords
        .filter(record => !listedTitles.has(titleForRecord(record)) && titleForRecord(record) !== '자바 스트림과 IO 핵심')
        .map(record => ({ text: titleForRecord(record), link: record.routePath }))

      if (unlisted.length > 0) groups.push({ text: '추가 개념', collapsed: true, items: unlisted })
      return groups
    }

    const childDirectories = [...new Set(sectionRecords.flatMap(record => {
      const relative = record.destinationRelative.slice(section.destination.length + 1)
      if (!relative.startsWith(prefix)) return []
      const remainder = relative.slice(prefix.length)
      if (!remainder.includes('/')) return []
      return [remainder.split('/')[0]]
    }))].sort((a, b) => {
      const aIsSources = cleanLabel(a) === '출처 노트'
      const bIsSources = cleanLabel(b) === '출처 노트'
      if (aIsSources !== bIsSources) return aIsSources ? 1 : -1
      return a.localeCompare(b, 'ko')
    })

    const directoryItems = childDirectories.map(directory => {
      const childRelative = relativeDirectory ? `${relativeDirectory}/${directory}` : directory
      const indexRecord = sectionRecords.find(record =>
        record.destinationRelative === `${section.destination}/${childRelative}/index.md`
      )

      return {
        text: cleanLabel(directory),
        ...(indexRecord ? { link: indexRecord.routePath } : {}),
        collapsed: relativeDirectory !== '',
        items: makeTree(childRelative)
      }
    }).filter(item => item.items.length > 0 || item.link)

    return [...directFiles, ...directoryItems]
  }

  return [{
    text: section.label,
    ...(rootRecord ? { link: rootRecord.routePath } : {}),
    items: makeTree('')
  }]
}

const sidebars = Object.fromEntries(
  sections.map(section => [`/${section.destination}/`, sidebarItemsFor(section)])
)

const sidebarFile = path.join(docsDir, '.vitepress', 'sidebar.mjs')
fs.mkdirSync(path.dirname(sidebarFile), { recursive: true })
fs.writeFileSync(
  sidebarFile,
  `// 이 파일은 npm run docs:sync가 생성합니다. 직접 수정하지 마세요.\nexport default ${JSON.stringify(sidebars, null, 2)}\n`,
  'utf8'
)

console.log(`Synced ${records.length} Markdown files into docs/.`)
if (unresolvedLinks.length > 0) {
  console.warn(`Converted ${unresolvedLinks.length} unresolved Obsidian links to inline text:`)
  for (const link of unresolvedLinks) console.warn(`- ${link}`)
}
