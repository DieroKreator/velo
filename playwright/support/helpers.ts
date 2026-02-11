export function generateOrderCode() {
    const prefix = "VLO";

    // Gera três letras aleatórias (A–Z)
    const letters = Array.from({ length: 3 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");

    // Gera três números aleatórios (0–9)
    const numbers = Math.floor(100 + Math.random() * 900); // garante 3 dígitos

    return `${prefix}-${letters}${numbers}`;
}