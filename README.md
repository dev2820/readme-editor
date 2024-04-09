# online-block-base-markdown-editor

온라인 블럭베이스 마크다운 에디터

## TODO

### 에디터

- [ ] frontmatter 기능 추가
- [ ] 마크다운 파일 이름 입력 input 만들기
- [ ] 이미지 폴더 이름 입력 input 만들기
- [ ] 마크다운 preview 기능 만들기

### 블럭 & 인라인

https://gist.github.com/ihoneymon/652be052a0727ad59601

- [ ] 이미지 블럭
  - [ ] 이미지 업로드 기능 구현
  - [ ] 이미지 align 기능 만들기
  - [ ] 이미지 블럭 꾸미기
  - [ ] 이미지 다운로드 기능
- [ ] details 블럭 (try?)
- [ ] github note 블럭
- [ ] 파싱 로직 점검
  - [ ] 파싱 테스트용 파일 만들기
- [ ] 다운로드 기능 구현
- [ ] 코드블럭 언어 표시 기능

### Advanced

- [ ] 캡션이 있으면 figure로 파싱
- [ ] formatting toolbar 디자인 손보기
- [ ] SlashMenu 디자인 손보기
  - [ ] 아이콘 어울리는거 쓰고, https://lucide.dev/guide/packages/lucide 로 교체
- [ ] 앱 하단에 SEO
- [ ] unocss theme 설정 (font size...)
- [ ] 이미지 확대 보기 기능
- [ ] 더 많은 이미지 블럭
- [ ] 코드블럭 복사 기능
- [ ] 코드블럭 언어 변경 기능
- [ ] table 블럭

### API

- [ ] README.md 파일 읽어오기
- [ ] github에 이미지를 바로 업로드할 수 있나?

### 실험

### 나중에

- [ ] commit 만들고 API로 push하기 (규모가 큰 작업이라 미룸 - github login을 달아야할지도)
- [ ] 파이어베이스로 원격 이미지 저장소 만들기 (이때가 되면 가격정책을 고려해야할지도 모른다.)

### TipTap

https://tiptap.dev/docs/editor/api/nodes
https://github.com/ueberdosis/tiptap/blob/main/packages/extension-blockquote/src/blockquote.ts

https://tiptap.dev/docs/editor/guide/custom-extensions
