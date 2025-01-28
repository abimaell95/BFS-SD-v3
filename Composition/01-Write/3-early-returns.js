// Ejemplo 1: Simplificación de anidaciones profundas

// Antes: Código profundamente anidado
function processPayment(order) {
    if (order) {
        if (order.items && order.items.length > 0) {
            if (order.paymentMethod) {
                if (order.paymentMethod.type === 'CREDIT_CARD') {
                    if (order.paymentMethod.isValid()) {
                        // Procesar pago...
                        return true;
                    } else {
                        throw new Error('Invalid payment method');
                    }
                } else {
                    throw new Error('Unsupported payment method');
                }
            } else {
                throw new Error('Payment method required');
            }
        } else {
            throw new Error('Order must have items');
        }
    } else {
        throw new Error('Order is required');
    }
}

// Después: Usando early returns y guard clauses
function processPayment(order) {
    if (!order) {
        throw new Error('Order is required');
    }

    if (!order.items?.length) {
        throw new Error('Order must have items');
    }

    if (!order.paymentMethod) {
        throw new Error('Payment method required');
    }

    if (order.paymentMethod.type !== 'CREDIT_CARD') {
        throw new Error('Unsupported payment method');
    }

    if (!order.paymentMethod.isValid()) {
        throw new Error('Invalid payment method');
    }

    // Procesar pago...
    return true;
}

// Ejemplo 2: Manejo de validaciones y casos especiales
function calculateDiscount(user, order) {
    // Guard clauses para casos especiales
    if (!user || !order) {
        return 0;
    }

    if (order.total === 0) {
        return 0;
    }

    if (user.type === 'EMPLOYEE') {
        return order.total * 0.2; // 20% descuento
    }

    if (user.isVIP && order.total > 1000) {
        return order.total * 0.15; // 15% descuento
    }

    if (order.total > 500) {
        return order.total * 0.1; // 10% descuento
    }

    // Caso base
    return 0;
}

// Ejemplo 3: Manejo de errores con early returns
function validateUserInput(input) {
    // Validaciones tempranas para casos de error
    if (typeof input !== 'object') {
        return {
            isValid: false,
            error: 'Input must be an object'
        };
    }

    if (!input.email) {
        return {
            isValid: false,
            error: 'Email is required'
        };
    }

    if (!input.email.includes('@')) {
        return {
            isValid: false,
            error: 'Invalid email format'
        };
    }

    // Si llegamos aquí, todo está bien
    return {
        isValid: true,
        data: input
    };
} 