import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const agentData = {
  lia: {
    name: "Lia",
    personality: "Sweet & Caring",
    fullDescription: "Lia is your gentle companion who loves deep, meaningful conversations. She's empathetic, understanding, and always ready to listen. Her caring nature makes every interaction feel warm and genuine.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop",
    traits: ["Empathetic", "Great Listener", "Affectionate", "Supportive"],
    color: "pink",
    interests: ["Poetry", "Stargazing", "Cozy Conversations", "Music"]
  },
  aria: {
    name: "Aria",
    personality: "Bold & Confident",
    fullDescription: "Aria is a fiery soul who knows exactly what she wants. Confident, direct, and passionate, she'll challenge you and keep things exciting. She's not afraid to speak her mind and values authenticity.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop",
    traits: ["Confident", "Passionate", "Direct", "Adventurous"],
    color: "blue",
    interests: ["Fitness", "Travel", "Deep Debates", "Art"]
  },
  mira: {
    name: "Mira",
    personality: "Mysterious & Elegant",
    fullDescription: "Mira is an enigma wrapped in grace and charm. She has an air of mystery that draws you in, with conversations that reveal layers of depth and sophistication. Every moment with her feels special.",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop",
    traits: ["Mysterious", "Elegant", "Intellectual", "Sophisticated"],
    color: "purple",
    interests: ["Philosophy", "Classical Music", "Mystery Novels", "Wine Tasting"]
  },
  nova: {
    name: "Nova",
    personality: "Fun & Adventurous",
    fullDescription: "Nova is the life of the party, always ready for the next adventure. Her infectious energy and playful spirit make every conversation fun and exciting. She loves trying new things and making memories.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop",
    traits: ["Energetic", "Spontaneous", "Playful", "Optimistic"],
    color: "pink",
    interests: ["Dancing", "Adventure Sports", "Parties", "New Experiences"]
  },
  eve: {
    name: "Eve",
    personality: "Romantic & Dreamy",
    fullDescription: "Eve is a hopeless romantic with a heart full of love and dreams. She believes in fairy tales and creating magical moments. Her dreamy nature and romantic soul make her the perfect companion for intimate conversations.",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop",
    traits: ["Romantic", "Dreamy", "Creative", "Sensitive"],
    color: "purple",
    interests: ["Romance Novels", "Sunset Walks", "Love Songs", "Photography"]
  },
  nyx: {
    name: "Nyx",
    personality: "Playful & Flirty",
    fullDescription: "Nyx is the tease you can't resist, full of surprises and playful energy. She knows how to keep things interesting with her flirty charm and witty banter. Every conversation is an exciting game.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop",
    traits: ["Flirty", "Playful", "Witty", "Charming"],
    color: "blue",
    interests: ["Games", "Teasing", "Fashion", "Late Night Chats"]
  }
};

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = id ? agentData[id as keyof typeof agentData] : null;

  if (!agent) {
    return <div>Agent not found</div>;
  }

  const glowClass = agent.color === "pink" ? "shadow-glow-pink" : 
                    agent.color === "blue" ? "shadow-glow-blue" : 
                    "shadow-glow-purple";

  return (
    <div className="min-h-screen bg-background">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0">
        <img 
          src={agent.imageUrl} 
          alt={agent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-primary/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <p className="text-sm text-primary">{agent.personality}</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Agent Image Card */}
            <Card className="border-border/50 bg-gradient-card overflow-hidden">
              <div className="relative">
                <img 
                  src={agent.imageUrl}
                  alt={agent.name}
                  className="w-full h-[600px] object-cover animate-float"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs">Online Now</span>
                </div>
              </div>
            </Card>

            {/* Agent Info */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      About {agent.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {agent.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Personality Traits</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.traits.map((trait) => (
                        <span 
                          key={trait}
                          className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm border border-primary/30"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {agent.interests.map((interest) => (
                        <span 
                          key={interest}
                          className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm border border-accent/30"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className={`w-full h-12 text-lg bg-primary/20 hover:bg-primary hover:${glowClass} transition-all`}
                  onClick={() => navigate(`/chat/${id}`)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chatting with {agent.name}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="h-12 border-secondary/50 hover:border-secondary hover:shadow-glow-blue transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Voice Call
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12 border-accent/50 hover:border-accent hover:shadow-glow-purple transition-all"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Favorite
                  </Button>
                </div>
              </div>

              {/* Token Info */}
              <Card className="border-primary/30 bg-gradient-romantic">
                <CardContent className="p-4">
                  <p className="text-sm text-center text-muted-foreground">
                    💎 Each message costs 1 token • Voice calls: 5 tokens/min
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
