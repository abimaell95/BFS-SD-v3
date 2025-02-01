// Ejemplo 1: Uso excesivo de primitivos para representar información de usuario
class UserService {
    createUser(
        firstName,    // string
        lastName,     // string
        email,        // string
        phoneNumber,  // string
        street,       // string
        city,        // string
        state,       // string
        zipCode,     // string
        country,     // string
        userType,    // string ('admin', 'regular', 'premium')
        status       // string ('active', 'inactive', 'suspended')
    ) {
        // Validaciones dispersas de formato
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error('Invalid email format');
        }

        if (!phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
            throw new Error('Invalid phone number');
        }

        if (!['admin', 'regular', 'premium'].includes(userType)) {
            throw new Error('Invalid user type');
        }

        // Crear usuario con primitivos
        return {
            firstName,
            lastName,
            email,
            phoneNumber,
            address: {
                street,
                city,
                state,
                zipCode,
                country
            },
            userType,
            status
        };
    }
}

// Ejemplo 2: Uso de strings para representar dinero y fechas
class OrderProcessor {
    processPayment(
        amount,           // string "99.99"
        currency,         // string "USD"
        cardNumber,       // string "4111111111111111"
        expiryDate,       // string "12/25"
        securityCode     // string "123"
    ) {
        // Conversiones y validaciones dispersas
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            throw new Error('Invalid amount');
        }

        // Validación de formato de tarjeta
        if (!cardNumber.match(/^\d{16}$/)) {
            throw new Error('Invalid card number');
        }

        // Validación de fecha de expiración
        const [month, year] = expiryDate.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (expiry < new Date()) {
            throw new Error('Card expired');
        }

        // Procesamiento del pago
        return {
            amount: `${numericAmount} ${currency}`,
            last4: cardNumber.slice(-4),
            expiryDate,
            status: 'processed'
        };
    }
}

// Ejemplo 3: Uso de arrays para representar datos estructurados
class ProductCatalog {
    addProduct(
        productInfo // array ['name', 'description', 'category', 'price', 'stock']
    ) {
        // Validaciones basadas en posición
        if (productInfo.length !== 5) {
            throw new Error('Invalid product information');
        }

        const price = parseFloat(productInfo[3]);
        const stock = parseInt(productInfo[4]);

        if (isNaN(price) || price <= 0) {
            throw new Error('Invalid price');
        }

        if (isNaN(stock) || stock < 0) {
            throw new Error('Invalid stock');
        }

        // Guardar producto usando array de valores
        return {
            name: productInfo[0],
            description: productInfo[1],
            category: productInfo[2],
            price: price,
            stock: stock
        };
    }
} 