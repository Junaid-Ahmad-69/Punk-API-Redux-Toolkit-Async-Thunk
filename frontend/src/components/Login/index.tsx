import {type ChangeEvent, useState} from "react";
import {InputWithLabel} from "@/components/Input";
import {Button} from "@/components/ui/button.tsx";
import {loginSchema} from "@/schemas/login-schema.tsx";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {loginWithEmail} from "@/features/auth/actions.ts";
import {HomeRoute} from "../../../Routes/Route.tsx";
import type {AppDispatch} from "../../../store/store.ts";

export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [userInput, setUserInput] = useState<Record<string, string>>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleUserLogin = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const {error} = loginSchema.validate(userInput, {abortEarly: false});
        if (!error) return true;

        const newErrors = {email: '', password: ''};
        error.details.forEach(detail => {
            if (detail.path[0] === 'email') {
                newErrors.email = detail.message;
            } else if (detail.path[0] === 'password') {
                newErrors.password = detail.message;
            }
        });
        setErrors(newErrors);
        return false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(loginWithEmail({
                    email: userInput.email,
                    password: userInput.password
                })
            )
            navigate(HomeRoute, {replace: true});
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <InputWithLabel
                    label={'Email'}
                    type={'email'}
                    name={'email'}
                    value={userInput.email}
                    classStyle={errors.email ? 'border border-red-500' : ''}
                    placeholder={'Please Enter Email'}
                    handleChange={handleUserLogin}/>
                {errors.email && <div className="text-xs pt-1 pl-1 text-red-500">{errors.email}</div>}
            </div>
            <div className='mb-8'>
                <InputWithLabel
                    label={'Password'}
                    type={'password'}
                    name={'password'}
                    value={userInput.password}
                    classStyle={errors.password ? 'border border-red-500' : ''}
                    placeholder={'Please Enter Password'}
                    handleChange={handleUserLogin}/>
                {errors.password &&
                    <div className="text-xs pt-1 pl-1 text-red-500">{errors.password}</div>}
            </div>
            <div className='w-full'>
                <Button className='w-full cursor-pointer' type={'submit'} onClick={() => {
                }} variant={"default"}>
                    Sign in
                </Button>
            </div>
        </form>

    );
}