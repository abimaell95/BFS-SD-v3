// Ejemplo 1: Separación de responsabilidades en un sistema de usuarios

// Antes: Clase que hace demasiado
class UserManager {
    constructor(database) {
        this.database = database;
    }

    async createUser(userData) {
        // Validación
        if (!userData.email || !userData.email.includes('@')) {
            throw new Error('Invalid email');
        }
        if (!userData.password || userData.password.length < 8) {
            throw new Error('Invalid password');
        }

        // Transformación
        const user = {
            ...userData,
            password: this.hashPassword(userData.password),
            createdAt: new Date()
        };

        // Persistencia
        await this.database.save('users', user);

        // Notificación
        await this.sendWelcomeEmail(user);

        // Logging
        console.log(`User created: ${user.email}`);

        return user;
    }

    hashPassword(password) {
        // Lógica de hashing
        return `hashed_${password}`;
    }

    async sendWelcomeEmail(user) {
        // Lógica de envío de email
        console.log(`Welcome email sent to ${user.email}`);
    }
}

// Después: Clases con responsabilidades únicas

// Responsabilidad: Validación de datos de usuario
class UserValidator {
    validate(userData) {
        this.validateEmail(userData.email);
        this.validatePassword(userData.password);
    }

    validateEmail(email) {
        if (!email || !email.includes('@')) {
            throw new Error('Invalid email');
        }
    }

    validatePassword(password) {
        if (!password || password.length < 8) {
            throw new Error('Invalid password');
        }
    }
}

// Responsabilidad: Transformación de datos de usuario
class UserDataTransformer {
    transform(userData) {
        return {
            ...userData,
            email: userData.email.toLowerCase(),
            password: this.hashPassword(userData.password),
            createdAt: new Date()
        };
    }

    hashPassword(password) {
        return `hashed_${password}`;
    }
}

// Responsabilidad: Persistencia de usuarios
class UserRepository {
    constructor(database) {
        this.database = database;
    }

    async save(user) {
        return this.database.save('users', user);
    }
}

// Responsabilidad: Notificaciones
class UserNotifier {
    async sendWelcomeEmail(user) {
        // Lógica de envío de email
        console.log(`Welcome email sent to ${user.email}`);
    }
}

// Responsabilidad: Logging
class UserActivityLogger {
    logUserCreation(user) {
        console.log(`User created: ${user.email}`);
    }
}

// Coordinador que usa las clases especializadas
class UserService {
    constructor(
        validator,
        transformer,
        repository,
        notifier,
        logger
    ) {
        this.validator = validator;
        this.transformer = transformer;
        this.repository = repository;
        this.notifier = notifier;
        this.logger = logger;
    }

    async createUser(userData) {
        // Cada clase maneja su responsabilidad
        this.validator.validate(userData);
        
        const transformedUser = this.transformer.transform(userData);
        
        const savedUser = await this.repository.save(transformedUser);
        
        await this.notifier.sendWelcomeEmail(savedUser);
        
        this.logger.logUserCreation(savedUser);
        
        return savedUser;
    }
}

// Ejemplo de uso
const userService = new UserService(
    new UserValidator(),
    new UserDataTransformer(),
    new UserRepository(database),
    new UserNotifier(),
    new UserActivityLogger()
);

// Uso simplificado
userService.createUser({
    email: 'user@example.com',
    password: 'securepass123'
}); 