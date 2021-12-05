# BESIDE FE


## 커밋 번벤션

커밋 컨벤션 예시

```bash
git add .
yarn cm
```

```md
수정한 파일을 `git add` 한 후 `yarn cm` 을 하면
`.cz-config.js` 파일에서 컨벤션에 따라서 선택 할 수 있는 항목이 나옵니다.
컨벤션에 맞는 답을 한 후 `.husky/pre-commit` 에서 `lint` 체크를 한 후
`lint`가 통과 되면 정상적으로 `commit` 이 됩니다.
```

[커밋 메시지 참고](https://webruden.tistory.com/486)