# Readme Editor

![og_image](/docs/og_image.jpeg)

온라인 블럭베이스 Readme 에디터

## TODO

### 블럭 & 인라인

https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#headings

### Advanced

- [ ] 링크용 컴포넌트 분리 및 동작 개선

#### optional 기능

- [ ] 다운로드 옵션 강화
  - [ ] mdx로 내보내기
  - [ ] 빈줄 제거하기
  - [ ] 이미지를 <img> 태그로 파싱하기
  - [ ] 이미지를 <feature>태그로 파싱
  - [ ] frontmatter 추가 여부 결정 기능
- [ ] 마크다운 preview 기능 만들기

#### 디자인

- [ ] BubbleMenu 디자인 손보기
  - [ ] 일부 블럭에서 BubbleMenu 막기
    - [ ] code block 내부에서 막기
- [ ] SlashMenu 디자인 손보기 (Next)
  - [ ] 아이콘 어울리는거 쓰고, https://lucide.dev/guide/packages/lucide 로 교체
- [ ] ui 개선
- [ ] Frontmatter를 선택적으로 추가할 수 있게 수정
  - [ ] plus버튼으로 frontmatter를 추가할 수 있음
  - [ ] 당연히 삭제도 가능함
  - [ ] date 타입인지, text 타입인지 선택 가능
  - [ ] frontmatter는 따라서 배열로 관리하도록 수정해야함

#### 블럭 기능

- [ ] details 편리하게 개선하기
- [ ] table 블럭
- [ ] 이미지 블럭
  - [ ] 이미지 align 기능 만들기
  - [ ] 이미지 블럭 꾸미기
  - [ ] 이미지 크기 조절 기능
  - [ ] 이미지 caption 기능 (+캡션이 있으면 figure로 파싱)

#### SEO

- [ ] 앱 하단에 SEO

### 실험

- [ ] 머메이드를 어떻게 지원하는게 좋을까?
- [ ] 주석 기능 지원
- [ ] 이모지 기능 지원
- [ ] 이미지 압축 & 리사이즈 기능 (https://github.com/alefduarte/image-resize-compress)

### TipTap

https://tiptap.dev/docs/editor/api/nodes
https://github.com/ueberdosis/tiptap/blob/main/packages/extension-blockquote/src/blockquote.ts

https://tiptap.dev/docs/editor/guide/custom-extensions
