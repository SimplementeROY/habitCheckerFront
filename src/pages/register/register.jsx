import { useState, useEffect } from "react";
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/UserServices";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeteadPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [hasError, setHasError] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Validación general
    const validateEmail = (email) => {
        // Valida que tenga texto@texto.dominio
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validate = (data = formData) => {
        const newErrors = {};

        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.surname.trim()) newErrors.surname = "Surname is required";

        if (!data.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(data.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!data.password.trim()) newErrors.password = "Password is required";

        if (!data.repeteadPassword.trim()) {
            newErrors.repeteadPassword = "You must repeat the password";
        } else if (data.password !== data.repeteadPassword) {
            newErrors.repeteadPassword = "Passwords do not match";
        }

        return newErrors;
    };

    // Validar todo el formulario al cambiar
    useEffect(() => {
        const currentErrors = validate();
        setErrors(currentErrors);
        setHasError(Object.keys(currentErrors).length > 0);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields((prev) => ({ ...prev, [name]: true }));

        const fieldError = validate(formData)[name];
        setErrors((prev) => ({
            ...prev,
            [name]: fieldError
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setTouchedFields({
            name: true,
            surname: true,
            email: true,
            password: true,
            repeteadPassword: true
        });

        if (Object.keys(validationErrors).length > 0) return;

        try {
            const response = await registerUser(JSON.stringify(formData));
            if (!response.ok) throw new Error('Registration failed');
            const { token } = await response.json();
            login(token);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="register">

            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="user-name">
                    <span>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touchedFields.name && errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </span>
                    <span>
                        <label htmlFor="surname">Surname:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            placeholder="Doe"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touchedFields.surname && errors.surname && (
                            <p className="error">{errors.surname}</p>
                        )}
                    </span>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="johndoe@gmail.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touchedFields.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Type password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touchedFields.password && errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="repeteadPassword">Repeat password:</label>
                    <input
                        type="password"
                        id="repeteadPassword"
                        name="repeteadPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touchedFields.repeteadPassword && errors.repeteadPassword && (
                        <p className="error">{errors.repeteadPassword}</p>
                    )}
                </div>

                <input
                    type="submit"
                    value="SIGN IN"
                    disabled={hasError}
                    style={hasError ? { cursor: "not-allowed" } : {}}
                />

                <div className='log-in'>
                    <p>Already a member?</p>
                    <Link to="/login">LOG IN</Link>
                </div>
            </form>
        </main>
    );
}

