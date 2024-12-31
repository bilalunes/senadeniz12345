import { FC, FormEvent, useState } from 'react';
import { SmsVerification } from './SmsVerification';

interface LoginFormProps {
  onLogin: (name: string, phone: string) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      return;
    }

    // Validate phone number format
    const phoneRegex = /^05[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      setError('Geçerli bir telefon numarası giriniz (05XX XXX XX XX)');
      return;
    }

    setError('');
    setShowVerification(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhone(value);
      setError('');
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7)}`;
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <SmsVerification
          phoneNumber={formatPhoneNumber(phone)}
          onVerify={() => onLogin(name.trim(), phone.trim())}
          onCancel={() => setShowVerification(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
          Sohbete Başla
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Ad Soyad
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Telefon Numarası
          </label>
          <input
            id="phone"
            type="tel"
            value={formatPhoneNumber(phone)}
            onChange={handlePhoneChange}
            placeholder="05XX XXX XX XX"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500"
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Devam Et
        </button>
      </form>
    </div>
  );
};