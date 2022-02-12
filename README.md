# React-Form-Tutorial

1. aa

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	const data = new FormData(e.currentTarget);
	console.log(Object.fromEntries(data));
};
```

폼데이터는 그냥 객체가 아니라 XMLHttpRequest 전송을 위해 설계되어 문자화할 수 없는 객체여서

formdata를 콘솔에서 확인해보면
데이터의 entries에 담겨잇다는 사실만 확인할 수 잇다.
