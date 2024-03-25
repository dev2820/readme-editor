# online-block-base-markdown-editor

온라인 블럭베이스 마크다운 에디터

## TODO

### 에디터

- [ ] frontmatter 추가 기능
- [ ] 마크다운 파일 이름 입력 input 만들기
- [ ] 이미지 폴더 이름 입력 input 만들기
- [ ] 마크다운 preview 기능 만들기

### 블럭 & 인라인

- [ ] prosemirror + tiptap으로 직접 구현?

https://gist.github.com/ihoneymon/652be052a0727ad59601

- [ ] 코드 블럭 만들기
  - [ ] 더 많은 언어 extension 설치
- [ ] 이미지 블럭
  - [ ] 사이즈 조절시 raw code로 파싱하게 설정
  - [ ] 이미지 블럭 꾸미기
  - [ ] 이미지 align 기능 만들기
- [ ] details 블럭
- [ ] github note 블럭
- [ ] 외부 이미지 블럭 만들기
- [ ] table 블럭 파싱 확인
- [ ] 파싱 로직 점검
  - [ ] 파싱 테스트용 파일 만들기

### Advanced

- [ ] 캡션이 있으면 figure로 파싱
- [ ] align에 대해 raw 코드를 통해 동작할 수 있게 구현
- [ ] formatting toolbar 손보기
- [ ] 앱 하단에 SEO
- [ ] SlashMenu 정리
  - [ ] 아이콘 어울리는거 쓰고, https://lucide.dev/guide/packages/lucide 로 교체
- [ ] color text 메뉴 불가능하게 제거하기
- [ ] unocss theme 설정 (font size...)
- [ ] 이미지 확대해보기 기능
- [ ] 커스텀 체크박스 기능

### API

- [ ] README.md 파일 읽어오기

### 실험

### 기타

- [ ] 그냥 raw html로 때려 박아도 되지 않을까?
- [ ] 이모지 입력: 아이콘 Apple Color Emoji 적용(하는지 확인)

### 나중에

- [ ] checkbox 블럭 구현 (BlockNote에서 지원할때까지 기다리는게 좋을 듯 함)
- [ ] commit 만들고 API로 push하기 (규모가 큰 작업이라 미룸 - github login을 달아야할지도)

### TipTap

https://tiptap.dev/docs/editor/api/nodes
https://github.com/ueberdosis/tiptap/blob/main/packages/extension-blockquote/src/blockquote.ts

https://tiptap.dev/docs/editor/guide/custom-extensions
