import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { Layers, Rocket, FileText } from "@gravity-ui/icons";

const Page = () => {
  const cardsData = [
    {
      title: "Browse Opportunities",
      description: "Explore existing resource libraries, frameworks, and curated tools.",
      icon: <Layers className="text-blue-500" width={24} height={24} />,
      gradientClass: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      bgLight: "bg-blue-500/10",
      link: "/opportunities", 
    },
    {
      title: "Browse Startup",
      description: "Discover emerging projects, partners, and active collaborative ventures.",
      icon: <Rocket className="text-emerald-500" width={24} height={24} />,
      gradientClass: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      bgLight: "bg-emerald-500/10",
      link: "/startups",
    },
    {
      title: "My Application",
      description: "Track submission status, review feedback, and manage your pipeline.",
      icon: <FileText className="text-amber-500" width={24} height={24} />,
      gradientClass: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      bgLight: "bg-amber-500/10",
      link: "/dashboard/collaborator/applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-default-50 to-default-100/50 p-6 md:p-12 text-foreground">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="relative border-b border-divider pb-6">
          <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-default-600 bg-clip-text text-transparent">
            Collaborator Dashboard
          </h1>
          <p className="text-medium text-default-500 mt-2">
            Welcome back! Select an avenue below to start building.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <Link 
              href={card.link} 
              key={index} 
              className="group block no-underline focus:outline-none rounded-2xl"
            >
              <Card 
                className={`p-4 h-full border border-transparent bg-content1 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg ${card.gradientClass}`}
              >
                <Card.Header className="flex gap-4 items-center pb-3">
                  <div className={`p-3 rounded-xl ${card.bgLight} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    {card.icon}
                  </div>
                  <Card.Title className="text-lg font-bold m-0 tracking-tight group-hover:text-primary transition-colors">
                    {card.title}
                  </Card.Title>
                </Card.Header>
                
                <Card.Content className="py-2 text-sm text-default-500 leading-relaxed">
                  <p>{card.description}</p>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Page;