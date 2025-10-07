import { Login, LoginProps } from 'react-admin';
import LoginForm from './LoginForm';

const WarachaLogin = (props: LoginProps) => (
    <Login {...props}>
        <LoginForm />
    </Login>
);

export default WarachaLogin;