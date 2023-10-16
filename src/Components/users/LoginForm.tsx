import {
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;

		// 이메일
		if (name === "email") {
			setEmail(value);
			const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if (!value?.match(validRegex)) {
				setError("이메일 형식이 올바르지 않습니다.");
			} else {
				setError("");
			}
		}

		// 비밀번호
		if (name === "password") {
			setPassword(value);
			if (value.length < 8) {
				setError("비밀번호는 8글자 이상이어야 합니다");
			} else {
				setError("");
			}
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const auth = getAuth(app);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
			toast.success("로그인이 완료되었습니다.");
		} catch (error: any) {
			toast.error("로그인에 실패하였습니다.");
		}
	};

	const onClickSocialLogin = async (e: any) => {
		const {
			target: { name },
		} = e;

		let provider;
		const auth = getAuth(app);

		if (name === "google") {
			provider = new GoogleAuthProvider();
		}

		if (name === "github") {
			provider = new GithubAuthProvider();
		}

		await signInWithPopup(auth, provider as GithubAuthProvider | GoogleAuthProvider)
			.then((result) => {
				console.log(result);
				toast.success("로그인 되었습니다.");
			})
			.catch((error) => {
				console.log(error);
				toast.error("로그인에 실패했습니다.");
			});
	};

	return (
		<form className='form form--lg' onSubmit={onSubmit}>
			<div className='form__title'>로그인</div>
			<div className='form__block'>
				<label htmlFor='email'>이메일</label>
				<input type='text' name='email' id='email' onChange={onChange} required />
			</div>
			<div className='form__block'>
				<label htmlFor='password'>비밀번호</label>
				<input type='password' name='password' id='password' onChange={onChange} required />
			</div>
			{error && error.length > 0 && (
				<div className='form__block'>
					<div className='form__error'>{error}</div>
				</div>
			)}
			<div className='form__block'>
				계정이 없으신가요?
				<Link to='/user/signup' className='form__link'>
					회원가입하기
				</Link>
			</div>
			<div className='form__block--lg'>
				<button type='submit' className='form__btn--submit' disabled={error?.length > 0}>
					로그인
				</button>
			</div>
			<div className='form__block'>
				<button
					type='button'
					name='google'
					className='form__btn--google'
					disabled={error?.length > 0}
					onClick={onClickSocialLogin}>
					Google 로그인
				</button>
			</div>
			<div className='form__block'>
				<button
					type='button'
					name='github'
					className='form__btn--github'
					disabled={error?.length > 0}
					onClick={onClickSocialLogin}>
					Github 로그인
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
