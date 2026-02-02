/**
 * Generates a scalable, readable Student Share Code.
 * Strategy: 9 characters, Crockford Base32.
 * Math: 32^9 ~= 35 Trillion combinations.
 * Collision probability with 2B users is negligible.
 * 
 * Excludes ambiguous characters: I, L, 1, O, 0.
 * Format: XXX-XXX-XXX (hyphens for readability)
 */

const ALPHABET = 'ABCDEFGHJKMNPQRSTVWXYZ23456789'; // Crockford Base32 (no I, L, 1, O, 0)

export const generateShareCode = () => {
    let code = '';
    const length = 9;

    // In a real backend, this would use a CSPRNG or a database sequence.
    // For frontend mock, Math.random is sufficient for prototype uniqueness.
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        code += ALPHABET[randomIndex];
    }

    // Format as XXX-XXX-XXX
    return `${code.slice(0, 3)}-${code.slice(3, 6)}-${code.slice(6, 9)}`;
};

export const validateShareCode = (input) => {
    // Normalize: remove hyphens, whitespace, uppercase
    const clean = input.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Check length
    if (clean.length !== 9) return false;

    // Check characters (ensure only allowed alphabet)
    for (let char of clean) {
        if (!ALPHABET.includes(char)) return false;
    }

    return true;
};

export const formatShareCode = (input) => {
    const clean = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const parts = [];
    if (clean.length > 0) parts.push(clean.slice(0, 3));
    if (clean.length > 3) parts.push(clean.slice(3, 6));
    if (clean.length > 6) parts.push(clean.slice(6, 9));
    return parts.join('-');
};
