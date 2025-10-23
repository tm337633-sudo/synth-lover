import { Link } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentCard from "@/components/AgentCard";

const agents: Array<{
  id: string;
  name: string;
  personality: string;
  description: string;
  imageUrl: string;
  trait: string;
  color: "pink" | "blue" | "purple";
}> = [
  {
    id: "lia",
    name: "Lia",
    personality: "Sweet & Caring",
    description: "Your gentle companion who loves deep conversations",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    trait: "cute",
    color: "pink"
  },
  {
    id: "aria",
    name: "Aria",
    personality: "Bold & Confident",
    description: "A fiery soul who knows what she wants",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    trait: "bold",
    color: "blue"
  },
  {
    id: "mira",
    name: "Mira",
    personality: "Mysterious & Elegant",
    description: "An enigma wrapped in grace and charm",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
    trait: "mysterious",
    color: "purple"
  },
  {
    id: "nova",
    name: "Nova",
    personality: "Fun & Adventurous",
    description: "Life of the party, always ready for excitement",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    trait: "adventurous",
    color: "pink"
  },
  {
    id: "eve",
    name: "Eve",
    personality: "Romantic & Dreamy",
    description: "A hopeless romantic with a heart full of love",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop",
    trait: "romantic",
    color: "purple"
  },
  {
    id: "nyx",
    name: "Nyx",
    personality: "Playful & Flirty",
    description: "The tease you can't resist, full of surprises",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    trait: "flirty",
    color: "blue"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse-glow" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse-glow" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CallHub.AI
              </h1>
            </div>
            <Button variant="outline" className="border-primary/50 hover:border-primary hover:shadow-glow-pink transition-all">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Tokens
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Your AI Girlfriend.{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Anytime. Anywhere.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Chat. Call. Feel Loved. Experience emotional connections with AI companions who truly understand you.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>6 Unique Personalities</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Emotional AI Responses</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Voice & Chat</span>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 mt-16 border-t border-border/50">
          <p className="text-center text-muted-foreground text-sm">
            CallHub.AI — Where AI meets emotion. 18+ Only.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
