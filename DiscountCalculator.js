/**
 * ShopFast - Módulo de Engenharia de Qualidade
 * Regra de Negócio Refatorada: Validação de Cupom com Verificação de Solvência
 */

class DiscountService {
    /**
     * Aplica o desconto de Black Friday garantindo que a carga só seja liberada
     * se houver lastro financeiro (Saldo >= Valor Final).
     */
    applyBlackFridayDiscount(orderValue, couponCode, userBalance) {
        const DISCOUNT_RATE = 0.50; // BLACK50
        const MINIMUM_BALANCE_REQUIRED = 0.01;

        // 1. Validação de Cupom (Clean Code: Guard Clauses)
        if (couponCode !== 'BLACK50') {
            return orderValue;
        }

        const discountedValue = orderValue * (1 - DISCOUNT_RATE);

        // 2. PROTEÇÃO DE NEGÓCIO (A Causa-Raiz do Desastre)
        // Impede que a carga seja liberada se o saldo não cobrir o valor final
        if (userBalance < discountedValue) {
            throw new Error("Transação Abortada: Saldo insuficiente para liquidação do lote.");
        }

        // 3. Garantia de Integridade
        return {
            finalPrice: discountedValue,
            status: "APROVADO_PARA_LOGISTICA",
            auditHash: Math.random().toString(36).substring(7)
        };
    }
}

module.exports = DiscountService;
