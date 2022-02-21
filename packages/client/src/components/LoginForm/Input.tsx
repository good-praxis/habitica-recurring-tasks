import { JSX } from 'preact';

export function Input({ label, placeholder, type, callback }: InputProps) {
  function onChange(e: Event) {
    var el = e.target as HTMLInputElement;
    callback(el.value);
  }

  return (
    <>
      {label && (
        <label class="text-blue-600" for={label}>
          {label}
        </label>
      )}
      <input
        type={type}
        label={label || ''}
        class="border-2 border-gray-600 rounded-lg mb-3 px-2 py-0.5"
        placeholder={placeholder || ''}
        onChange={onChange}
      />
    </>
  );
}

type InputProps = {
  label?: string;
  placeholder?: string;
  type: 'text' | 'password';
  callback: (e: any) => void;
};
