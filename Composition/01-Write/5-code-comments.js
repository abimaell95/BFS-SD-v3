// Ejemplo 1: Evolución de comentarios a código auto-documentado

// Antes: Código con comentarios explicativos
class UserManager {
    // Verifica si el usuario puede realizar la compra
    // Chequea el balance y el límite de crédito
    // Retorna true si puede comprar, false si no
    canPurchase(userId, amount) {
        // Obtiene datos del usuario
        const user = this.getUser(userId);
        
        // Calcula el balance disponible
        const balance = user.accountBalance;
        
        // Verifica el límite de crédito
        const creditLimit = user.creditLimit;
        
        // Chequea si tiene suficiente balance o crédito
        return balance >= amount || creditLimit >= amount;
    }
}

// Después: Código auto-documentado
class UserManager {
    canPurchase(userId, purchaseAmount) {
        const user = this.getUser(userId);
        return this.hasAvailableBalance(user, purchaseAmount) ||
               this.hasAvailableCredit(user, purchaseAmount);
    }

    hasAvailableBalance(user, amount) {
        return user.accountBalance >= amount;
    }

    hasAvailableCredit(user, amount) {
        return user.creditLimit >= amount;
    }
}

// Ejemplo 2: Documentación apropiada de API

/**
 * Gestiona el proceso de pago de una orden.
 * @param {Order} order - Orden a procesar
 * @param {PaymentMethod} paymentMethod - Método de pago a utilizar
 * @throws {PaymentError} Si el pago es rechazado
 * @throws {ValidationError} Si la orden o método de pago son inválidos
 * @returns {Promise<PaymentResult>} Resultado del proceso de pago
 */
async function processPayment(order, paymentMethod) {
    validatePaymentRequest(order, paymentMethod);
    
    const paymentResult = await executePayment(order, paymentMethod);
    
    return createPaymentResult(paymentResult);
}

// Ejemplo 3: Uso apropiado de TODOs y FIXMEs

class PaymentGateway {
    constructor() {
        // FIXME: Reemplazar con configuración desde variables de entorno
        this.apiKey = 'default-key';
    }

    async processTransaction(transaction) {
        // TODO: Implementar retry logic para casos de fallo de red
        const result = await this.sendToPaymentProvider(transaction);
        
        if (!result.success) {
            // TODO: Añadir más detalles al error logging
            console.error('Transaction failed:', result.error);
        }

        return result;
    }

    // TODO: Deprecar este método en la próxima versión mayor
    // Usar processTransaction() en su lugar
    async oldProcessPayment(payment) {
        return this.processTransaction({
            type: 'payment',
            data: payment
        });
    }
}

// Ejemplo 4: Comentarios que explican el "por qué" no el "qué"

class CacheManager {
    constructor() {
        // Usamos Map en lugar de objeto simple porque necesitamos
        // mantener el orden de inserción para la política LRU
        this.cache = new Map();
        
        // 1000 es el límite óptimo basado en análisis de uso
        // Ver: JIRA-123 para detalles del análisis
        this.maxSize = 1000;
    }

    set(key, value) {
        // Eliminamos la entrada más antigua si alcanzamos el límite
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        // Reinsertamos la key si existe para mantenerla como la más reciente
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);
    }
} 