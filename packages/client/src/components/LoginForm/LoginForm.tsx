import { useState } from 'preact/hooks';
import { Input } from './Input';

export function LoginForm() {
  const [userId, setUserId] = useState('');
  const [apiKey, setApiKey] = useState('');

  return (
    <form class="container flex flex-col mx-auto my-3 w-">
      <Input
        type="text"
        label="UserID"
        placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        callback={setUserId}
      />
      <Input type="password" label="API Key" callback={setApiKey} />
    </form>
  );
}
