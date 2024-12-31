// Verification code generation and validation
const codes = Array.from({ length: 100 }, () => 
  Math.floor(100000 + Math.random() * 900000).toString()
);

let currentIndex = 0;

export function getVerificationCode(): string {
  const code = codes[currentIndex];
  currentIndex = (currentIndex + 1) % codes.length;
  return code;
}

export function validateCode(input: string): boolean {
  return codes.includes(input);
}