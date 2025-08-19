import { Wand } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Hello World</h2>
      <Button>Click me</Button>
      <Button variant="link">Click me</Button>
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="destructive">Click me</Button>
      <Button variant="ghost">Click me</Button>

      <Button size="sm">Click me</Button>
      <Button size="lg">Click me</Button>
      <Button size="icon"><Wand /></Button>

      <Button>
        <a href="https://www.google.com">Click me</a>
      </Button>
    </div>
  );
};