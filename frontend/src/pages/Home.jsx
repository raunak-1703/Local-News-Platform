import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardContent>
          <h2 className="text-xl font-bold">shadcn/ui is working</h2>
          <p className="text-muted-foreground mt-2">
            You are now on the same design foundation as Emergent.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
