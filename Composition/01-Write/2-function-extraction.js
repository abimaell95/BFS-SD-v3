// Ejemplo de refactorización de una función grande

// Antes: Función monolítica con múltiples responsabilidades
function processUserRegistration(userData) {
    // Validación
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email');
    }
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password too short');
    }
    if (!userData.name || userData.name.trim().length === 0) {
        throw new Error('Name is required');
    }

    // Transformación de datos
    const user = {
        email: userData.email.toLowerCase(),
        name: userData.name.trim(),
        password: userData.password,
        createdAt: new Date(),
        status: 'PENDING',
        settings: {
            notifications: true,
            theme: 'light'
        }
    };

    // Lógica de negocio
    if (user.email.endsWith('@admin.com')) {
        user.role = 'ADMIN';
    } else {
        user.role = 'USER';
    }

    return user;
}

// Después: Funciones pequeñas y especializadas
function processUserRegistration(userData) {
    validateUserData(userData);
    const user = createUserObject(userData);
    assignUserRole(user);
    return user;
}

function validateUserData(userData) {
    validateEmail(userData.email);
    validatePassword(userData.password);
    validateName(userData.name);
}

function validateEmail(email) {
    if (!email || !email.includes('@')) {
        throw new Error('Invalid email');
    }
}

function validatePassword(password) {
    if (!password || password.length < 8) {
        throw new Error('Password too short');
    }
}

function validateName(name) {
    if (!name || name.trim().length === 0) {
        throw new Error('Name is required');
    }
}

function createUserObject(userData) {
    return {
        email: userData.email.toLowerCase(),
        name: userData.name.trim(),
        password: userData.password,
        createdAt: new Date(),
        status: 'PENDING',
        settings: getDefaultSettings()
    };
}

function getDefaultSettings() {
    return {
        notifications: true,
        theme: 'light'
    };
}

function assignUserRole(user) {
    user.role = user.email.endsWith('@admin.com') ? 'ADMIN' : 'USER';
} 