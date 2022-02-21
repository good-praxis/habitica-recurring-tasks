import { Input } from './Input';

export function LoginForm() {
  return (
    <form class="container flex flex-col mx-auto my-3 w-">
      <Input
        type="text"
        label="UserID"
        placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
      />
      <Input type="password" label="API Key" />
    </form>
  );
}
