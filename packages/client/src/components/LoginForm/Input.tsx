export function Input({ label, placeholder, type }: InputProps) {
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
      />
    </>
  );
}

type InputProps = {
  label?: string;
  placeholder?: string;
  type: 'text' | 'password';
};
