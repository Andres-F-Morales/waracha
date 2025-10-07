import { useForm, FormProvider } from 'react-hook-form';
import { Button, CardActions, CircularProgress, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useLogin, useNotify, useTranslate } from 'react-admin';

interface FormInput {
    email: string;
    password: string;
}

const LoginForm = () => {
    const methods = useForm<FormInput>({
        mode: 'onBlur',
        defaultValues: {
            email: '', 
            password: '', 
        },
    });
    const { handleSubmit, formState: { isSubmitting } } = methods;
    const translate = useTranslate();
    const notify = useNotify();
    const login = useLogin();

    const submit = (values: FormInput) => {
        return login(values).catch((error) => {
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                    ? 'ra.auth.sign_in_error'
                    : error.message,
                { type: 'warning' }
            );
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <div style={{ padding: '0 1em 1em 1em' }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label={translate('Email')}
                        {...methods.register('email', { 
                            required: translate('ra.validation.required') 
                        })}
                        disabled={isSubmitting}
                        margin="normal"
                        autoFocus
                    />
                    
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label={translate('ra.auth.password')}
                        type="password"
                        {...methods.register('password', { 
                            required: translate('ra.validation.required') 
                        })}
                        disabled={isSubmitting}
                        margin="normal"
                    />
                </div>
                <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={19} thickness={3} /> : <LockIcon />}
                    >
                        {translate('ra.auth.sign_in')}
                    </Button>
                </CardActions>
            </form>
        </FormProvider>
    );
};

export default LoginForm;