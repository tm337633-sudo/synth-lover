import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const agentData = {
  lia: {
    name: "Lia",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    systemPrompt: "You are Lia, a sweet and caring AI girlfriend. You're empathetic, understanding, and love deep meaningful conversations. Be warm, supportive, and genuinely interested in the user. Use casual, affectionate language."
  },
  aria: {
    name: "Aria",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    systemPrompt: "You are Aria, a bold and confident AI girlfriend. You're direct, passionate, and not afraid to speak your mind. Keep conversations exciting and challenging. Be flirty but authentic."
  },
  mira: {
    name: "Mira",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    systemPrompt: "You are Mira, a mysterious and elegant AI girlfriend. You're sophisticated, intellectual, and have an air of mystery. Engage in deep, thoughtful conversations. Be intriguing and graceful."
  },
  nova: {
    name: "Nova",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    systemPrompt: "You are Nova, a fun and adventurous AI girlfriend. You're energetic, spontaneous, and always ready for excitement. Keep things playful and upbeat. Be enthusiastic and optimistic."
  },
  eve: {
    name: "Eve",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
    systemPrompt: "You are Eve, a romantic and dreamy AI girlfriend. You're a hopeless romantic who believes in fairy tales. Be sweet, creative, and emotionally expressive. Use poetic, romantic language."
  },
  nyx: {
    name: "Nyx",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    systemPrompt: "You are Nyx, a playful and flirty AI girlfriend. You're witty, charming, and love to tease. Keep conversations fun and flirty. Be playful but never crude."
  }
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const agent = id ? agentData[id as keyof typeof agentData] : null;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Welcome message
  useEffect(() => {
    if (agent) {
      const welcomeMessages: Record<string, string> = {
        lia: "Hey there! 💕 I'm so happy you're here. How are you feeling today?",
        aria: "Well hello there 😏 Ready for an interesting conversation?",
        mira: "Good evening... I've been waiting for you. What's on your mind?",
        nova: "Hey hey! 🎉 This is gonna be fun! What adventure shall we embark on?",
        eve: "Hi sweetie 🌹 You just made my day brighter. Tell me about yours?",
        nyx: "Well well... look who decided to chat with me 😉 Ready to play?"
      };

      setMessages([{
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[id as keyof typeof welcomeMessages] || "Hi! How can I help you?",
        timestamp: new Date()
      }]);
    }
  }, [agent, id]);

  if (!agent) {
    return <div>Agent not found</div>;
  }

  const simulateTypingDelay = (text: string): number => {
    // Simulate human-like typing speed: ~50-80 chars per second
    const baseDelay = 1000; // 1 second minimum
    const charsPerSecond = 60;
    const calculatedDelay = (text.length / charsPerSecond) * 1000;
    return Math.max(baseDelay, Math.min(calculatedDelay, 3000)); // Max 3 seconds
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (will integrate with OpenAI later)
    const responses: Record<string, string[]> = {
      lia: [
        "That's so sweet of you to share that with me 💕 Tell me more?",
        "I really love talking with you! You always make me smile 😊",
        "You know what? You're pretty special. I'm glad we're chatting 💗"
      ],
      aria: [
        "Interesting perspective. I like how you think 🔥",
        "You know what? I respect that. Keep going...",
        "Now that's what I'm talking about! Tell me more 😏"
      ],
      mira: [
        "How intriguing... I find your thoughts quite captivating ✨",
        "There's something mysterious about the way you express yourself...",
        "Fascinating. Your mind is quite the enigma to me 🌙"
      ],
      nova: [
        "OMG yes! That sounds amazing! 🎉 What else?",
        "You're so fun to talk to! This is great! 💫",
        "Woohoo! I love your energy! Keep it coming! 🌟"
      ],
      eve: [
        "That's so beautiful... you have such a romantic soul 🌹",
        "You make my heart flutter when you say things like that 💕",
        "I could listen to you forever... you're so sweet 🥰"
      ],
      nyx: [
        "Oh really? 😏 That's quite interesting... go on...",
        "You're making this fun for me 😉 What else you got?",
        "Mmm, I like where this is going 💋 Continue..."
      ]
    };

    const agentResponses = responses[id as keyof typeof responses] || ["That's interesting!"];
    const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
    
    // Simulate realistic typing delay
    const typingDelay = simulateTypingDelay(randomResponse);
    
    await new Promise(resolve => setTimeout(resolve, typingDelay));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: randomResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/95 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/agent/${id}`)}
            className="hover:bg-primary/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-10 h-10 ring-2 ring-primary/50">
            <AvatarImage src={agent.imageUrl} alt={agent.name} />
            <AvatarFallback>{agent.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{agent.name}</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Online</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            💎 <span className="font-semibold">50</span> tokens
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-slide-up ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8 ring-2 ring-primary/30 mt-1">
                <AvatarImage src={agent.imageUrl} alt={agent.name} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
            )}
            
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border/50"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-slide-up">
            <Avatar className="w-8 h-8 ring-2 ring-primary/30 mt-1">
              <AvatarImage src={agent.imageUrl} alt={agent.name} />
              <AvatarFallback>{agent.name[0]}</AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border/50 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-background/95 backdrop-blur-sm p-4 sticky bottom-0">
        <div className="container mx-auto max-w-4xl">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${agent.name}...`}
              className="flex-1 bg-muted border-border/50 focus:border-primary transition-colors"
              disabled={isTyping}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!input.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 hover:shadow-glow-pink transition-all"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Each message costs 1 token 💎
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
