# Readme Editor

<p align="center">
<img src="./docs/og_image.jpeg" alt="readme_editor_og_image" width="256px" />
</p>

<p align="center">
온라인 블럭베이스 Readme 에디터
</p>

## TODO

### Advanced

- [ ] details 편리하게 개선하기 (Next)
  - [ ] summary에서 enter시 split하기
  - [ ] summary 하위 간격 추가

#### optional 기능

- [ ] 다운로드 옵션 강화
  - [ ] mdx로 내보내기
  - [ ] 빈줄 제거하기
  - [ ] 이미지를 <img> 태그로 파싱하기
  - [ ] 이미지를 <feature>태그로 파싱
  - [ ] frontmatter 추가 여부 결정 기능
- [ ] 마크다운 preview 기능 만들기

#### 디자인

- [ ] ui 개선
- [ ] Frontmatter를 선택적으로 추가할 수 있게 수정
  - [ ] plus버튼으로 frontmatter를 추가할 수 있음
  - [ ] 당연히 삭제도 가능함
  - [ ] date 타입인지, text 타입인지 선택 가능
  - [ ] frontmatter는 따라서 배열로 관리하도록 수정해야함

#### 블럭 기능

- [ ] table 블럭
- [ ] 이미지 블럭 (Next)
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

## Reference

https://tiptap.dev/docs/editor/api/nodes
https://github.com/ueberdosis/tiptap/blob/main/packages/extension-blockquote/src/blockquote.ts

https://tiptap.dev/docs/editor/guide/custom-extensions

https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#headings
