import { FC, useState, useEffect } from 'react';
import { getVerificationCode, validateCode } from '../utils/verification/codes';
import { formatPhoneNumber, formatVerificationDisplay } from '../utils/verification/display';

interface SmsVerificationProps {
  phoneNumber: string;
  onVerify: () => void;
  onCancel: () => void;
}

export const SmsVerification: FC<SmsVerificationProps> = ({ 
  phoneNumber, 
  onVerify, 
  onCancel 
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    setVerificationCode(getVerificationCode());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Kod 6 haneli olmalıdır');
      return;
    }

    if (validateCode(code)) {
      onVerify();
    } else {
      setError('Geçersiz kod');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setCode(value);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
          Telefon Doğrulama
        </h2>
        
        <div className="mb-6 text-center">
          <p className="text-gray-600 mb-2">
            Telefon: {formatPhoneNumber(phoneNumber)}
          </p>
          <p className="text-gray-600 font-semibold">
            Doğrulama Kodu: {formatVerificationDisplay(verificationCode)}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <div className="flex justify-center gap-2 mb-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-12 flex items-center justify-center border rounded-lg bg-gray-50"
                  >
                    <span className="text-2xl font-semibold">
                      {code[index] || ''}
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={handleCodeChange}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Doğrula
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};