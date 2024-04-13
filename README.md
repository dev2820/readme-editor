# online-block-base-markdown-editor

온라인 블럭베이스 마크다운 에디터

## TODO

### 에디터

- [ ] frontmatter 기능 추가 (next)
- [ ] 마크다운 파일 이름 입력 input 만들기
- [ ] 마크다운 preview 기능 만들기

### 블럭 & 인라인

https://gist.github.com/ihoneymon/652be052a0727ad59601

- [ ] 코드블럭 언어 표시 기능
- [ ] 이미지 블럭
  - [ ] 이미지 업로드 기능 구현
  - [ ] 이미지 align 기능 만들기
  - [ ] 이미지 블럭 꾸미기
  - [ ] 이미지 크기 조절 기능
- [ ] 다운로드 기능 구현
- [ ] slashmenu 완성

### Advanced

- [ ] 캡션이 있으면 figure로 파싱
- [ ] formatting toolbar 디자인 손보기
- [ ] SlashMenu 디자인 손보기
  - [ ] 아이콘 어울리는거 쓰고, https://lucide.dev/guide/packages/lucide 로 교체
- [ ] 코드블럭 언어 변경 기능
- [ ] table 블럭
- [ ] 앱 하단에 SEO

### 실험

### TipTap

https://tiptap.dev/docs/editor/api/nodes
https://github.com/ueberdosis/tiptap/blob/main/packages/extension-blockquote/src/blockquote.ts

https://tiptap.dev/docs/editor/guide/custom-extensions

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.
>
> ## header
>
> - list
> - list2

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

출처: https://github.com/orgs/community/discussions/16925

<details>
  <summary>summary</summary>
  details content

## header2

  <details>
    <summary> nested header</summary>
    nested contents
  </details>
</details>
