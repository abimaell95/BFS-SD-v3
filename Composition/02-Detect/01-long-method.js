// Ejemplo 1: Método largo que procesa una orden con múltiples responsabilidades
function processOrder(order) {
    // Validar el pedido
    if (!order.items || order.items.length === 0) {
        throw new Error('Order must have items');
    }
    if (!order.customerInfo) {
        throw new Error('Customer information is required');
    }
    if (!order.customerInfo.email || !order.customerInfo.address) {
        throw new Error('Email and address are required');
    }

    // Calcular subtotal
    let subtotal = 0;
    for (const item of order.items) {
        if (!item.price || !item.quantity) {
            throw new Error('Invalid item in order');
        }
        subtotal += item.price * item.quantity;
    }

    // Aplicar descuentos
    let discount = 0;
    if (subtotal > 1000) {
        discount = subtotal * 0.1;
    } else if (subtotal > 500) {
        discount = subtotal * 0.05;
    }
    if (order.customerInfo.isVIP) {
        discount += subtotal * 0.05;
    }

    // Calcular impuestos
    const taxRate = 0.21;
    const taxes = (subtotal - discount) * taxRate;

    // Calcular costos de envío
    let shippingCost = 0;
    if (order.customerInfo.address.country === 'Spain') {
        if (subtotal > 100) {
            shippingCost = 0;
        } else {
            shippingCost = 10;
        }
    } else {
        if (order.customerInfo.address.continent === 'Europe') {
            shippingCost = 20;
        } else {
            shippingCost = 50;
        }
    }

    // Calcular total
    const total = subtotal - discount + taxes + shippingCost;

    // Actualizar inventario
    for (const item of order.items) {
        const product = database.getProduct(item.productId);
        if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product ${item.productId}`);
        }
        database.updateStock(item.productId, product.stock - item.quantity);
    }

    // Generar factura
    const invoice = {
        orderId: generateOrderId(),
        customerInfo: order.customerInfo,
        items: order.items,
        subtotal: subtotal,
        discount: discount,
        taxes: taxes,
        shippingCost: shippingCost,
        total: total,
        date: new Date()
    };

    // Guardar orden en base de datos
    database.saveOrder(invoice);

    // Enviar email de confirmación
    const emailContent = `
        Dear ${order.customerInfo.name},
        Your order has been processed successfully.
        Order ID: ${invoice.orderId}
        Total: $${total}
        ...
    `;
    emailService.send(order.customerInfo.email, 'Order Confirmation', emailContent);

    return invoice;
}

// Ejemplo 2: Método largo con validaciones extensas
function validateUserRegistration(userData) {
    // Validar nombre
    if (!userData.firstName || userData.firstName.length < 2) {
        throw new Error('First name must be at least 2 characters long');
    }
    if (!userData.lastName || userData.lastName.length < 2) {
        throw new Error('Last name must be at least 2 characters long');
    }
    if (/[0-9]/.test(userData.firstName) || /[0-9]/.test(userData.lastName)) {
        throw new Error('Names cannot contain numbers');
    }

    // Validar email
    if (!userData.email) {
        throw new Error('Email is required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
    }
    if (database.emailExists(userData.email)) {
        throw new Error('Email already registered');
    }

    // Validar contraseña
    if (!userData.password || userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(userData.password)) {
        throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(userData.password)) {
        throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(userData.password)) {
        throw new Error('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(userData.password)) {
        throw new Error('Password must contain at least one special character');
    }

    // Validar fecha de nacimiento
    if (!userData.birthDate) {
        throw new Error('Birth date is required');
    }
    const birthDate = new Date(userData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
        throw new Error('User must be at least 18 years old');
    }
    if (age > 120) {
        throw new Error('Invalid birth date');
    }

    return true;
}
