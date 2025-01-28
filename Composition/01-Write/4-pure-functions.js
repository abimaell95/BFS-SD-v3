// Ejemplo 1: Separación de lógica pura e impura

// Funciones Impuras (con side effects)
class UserService {
    constructor() {
        this.users = new Map();
    }

    // Impura: Modifica el estado (this.users)
    addUser(user) {
        this.users.set(user.id, user);
        this.logUserAction(user, 'added'); // Side effect: logging
    }

    // Impura: Depende de estado externo y hace logging
    logUserAction(user, action) {
        console.log(`User ${user.id} was ${action} at ${new Date()}`);
    }
}

// Funciones Puras
class UserValidator {
    // Pura: Mismo input -> mismo output, sin side effects
    static validateUser(user) {
        const errors = [];

        if (!user.email?.includes('@')) {
            errors.push('Invalid email');
        }

        if (!user.name?.trim()) {
            errors.push('Name is required');
        }

        if (user.age < 18) {
            errors.push('Must be 18 or older');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Pura: Transformación de datos sin efectos secundarios
    static normalizeUser(user) {
        return {
            ...user,
            email: user.email?.toLowerCase().trim(),
            name: user.name?.trim(),
            createdAt: new Date().toISOString()
        };
    }
}

// Ejemplo 2: Cálculos puros vs. Operaciones con side effects

// Funciones Puras (Cálculos)
class PriceCalculator {
    // Pura: Solo cálculos basados en input
    static calculateSubtotal(items) {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // Pura: Cálculo de descuento basado en reglas
    static calculateDiscount(subtotal, userType) {
        const discounts = {
            'VIP': 0.2,
            'REGULAR': 0.1,
            'NEW': 0.05
        };
        return subtotal * (discounts[userType] || 0);
    }

    // Pura: Cálculo de impuestos
    static calculateTax(subtotal) {
        return subtotal * 0.16; // 16% tax
    }
}

// Operaciones Impuras (Side Effects)
class OrderProcessor {
    constructor(database, emailService) {
        this.database = database;
        this.emailService = emailService;
    }

    // Impura: Múltiples side effects
    async processOrder(order) {
        // Side effect: Database interaction
        await this.database.save(order);

        // Side effect: Email sending
        await this.emailService.sendOrderConfirmation(order);

        // Side effect: Logging
        console.log(`Order ${order.id} processed at ${new Date()}`);
    }
}

// Ejemplo 3: Separación de validaciones puras y efectos

// Validaciones Puras
class OrderValidator {
    // Pura: Validación de estructura
    static validateOrderStructure(order) {
        return {
            hasItems: Array.isArray(order.items) && order.items.length > 0,
            hasValidTotal: typeof order.total === 'number' && order.total > 0,
            hasValidCustomer: Boolean(order.customerId)
        };
    }

    // Pura: Validación de reglas de negocio
    static validateBusinessRules(order) {
        const rules = {
            isWithinLimit: order.total <= 10000,
            hasValidItemCount: order.items.length <= 50,
            hasValidItemPrices: order.items.every(item => item.price > 0)
        };

        return {
            isValid: Object.values(rules).every(Boolean),
            rules
        };
    }
} 