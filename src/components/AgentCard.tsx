import { Link } from "react-router-dom";
import { Heart, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  personality: string;
  description: string;
  imageUrl: string;
  trait: string;
  color: "pink" | "blue" | "purple";
}

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentCard = ({ agent, index }: AgentCardProps) => {
  const glowClass = agent.color === "pink" ? "shadow-glow-pink" : 
                    agent.color === "blue" ? "shadow-glow-blue" : 
                    "shadow-glow-purple";

  return (
    <Link to={`/agent/${agent.id}`}>
      <Card 
        className="group relative overflow-hidden border-border/50 bg-gradient-card hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={agent.imageUrl} 
            alt={agent.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-90" />
          
          {/* Status Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-foreground">Online</span>
          </div>

          {/* Name & Personality - Floating */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-foreground mb-1">{agent.name}</h3>
            <p className="text-sm text-primary font-medium">{agent.personality}</p>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {agent.description}
          </p>

          <div className="flex gap-2">
            <Button 
              className={`flex-1 bg-primary/20 hover:bg-primary hover:${glowClass} transition-all`}
              onClick={(e) => {
                e.preventDefault();
                // Will implement chat functionality
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button 
              variant="outline"
              className="border-secondary/50 hover:border-secondary hover:shadow-glow-blue transition-all"
              onClick={(e) => {
                e.preventDefault();
                // Will implement voice call functionality
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              className="border-accent/50 hover:border-accent hover:shadow-glow-purple transition-all"
              onClick={(e) => {
                e.preventDefault();
                // Will implement favorite functionality
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgentCard;
