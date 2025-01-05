"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationControls } from "@/hooks/useAnimationControls";
import {
  Save,
  Search,
  Tag,
  Clock,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Save,
    title: "Multi-platform Support",
    description:
      "Seamlessly integrate your AI conversations across multiple platforms.",
    details: [
      "Support for ChatGPT, Claude, v0, and Perplexity",
      "Unified interface for all your AI interactions",
      "Sync conversations across devices",
      "Import/Export functionality for data portability",
    ],
  },
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Quickly find the information you need with powerful search capabilities.",
    details: [
      "Full-text search across all conversations",
      "Filter by date, platform, or custom tags",
      "Semantic search for concept-based queries",
      "Search within specific conversation threads",
    ],
  },
  {
    icon: Tag,
    title: "Custom Labeling",
    description:
      "Organize your AI conversations with a flexible tagging system.",
    details: [
      "Create custom tags for easy categorization",
      "Hierarchical tag structure for detailed organization",
      "Automatic tag suggestions based on content",
      "Bulk tagging for efficient management",
    ],
  },
  {
    icon: Clock,
    title: "Temporal Organization",
    description:
      "Keep track of your AI conversations with precision and ease with temporal organization.",
    details: [
      "Detailed timestamp for each message",
      "Timeline view for chronological browsing",
      "Group conversations by day, week, or month",
      "Reminders and follow-ups for important chats",
    ],
  },
  {
    icon: Edit,
    title: "Customization",
    description:
      "Personalize your AI conversations with powerful editing and customization tools.",
    details: [
      "Rename conversations for easy reference",
      "Edit and annotate chat messages",
      "Customize UI themes and layouts",
      "Create templates for common conversation starters",
    ],
  },
  {
    icon: Trash2,
    title: "Data Management",
    description:
      "Take control of your AI conversations with advanced management features.",
    details: [
      "Securely delete unwanted conversations",
      "Archive old chats for decluttered view",
      "Bulk actions for efficient data handling",
      "Data retention policies and automatic cleanup",
    ],
  },
];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mr-4">
              <feature.icon className="w-6 h-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">{feature.description}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-gray-600 space-y-2 mb-4"
              >
                {feature.details.map((detail: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-1 h-1 rounded-full bg-violet-400 mt-2 mr-2" />
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full"
          >
            <div className="max-w-full w-full flex justify-between items-center">
              {isExpanded ? "Less info" : "More info"}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Features = () => {
  const [controls, ref] = useAnimationControls();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="py-20 bg-gradient-to-b from-white to-violet-100"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-4 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        <motion.p
          className="text-xl text-center mb-12 text-gray-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover how ChatFolio enhances your AI conversation experience
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
