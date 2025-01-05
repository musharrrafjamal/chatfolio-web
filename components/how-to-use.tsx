"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationControls } from "@/hooks/useAnimationControls";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ChevronRight, ChevronLeft, Monitor, Settings, ToggleRight, FolderOpen, Pin, MessageSquare } from 'lucide-react';
import Link from "next/link";

const steps = [
  {
    title: "Install Extension",
    description: "Add ChatFolio to your browser",
    icon: Download,
    color: "bg-blue-500",
  },
  {
    title: "Manage Extension",
    description: "Click on the extension icon in the browser toolbar & Go to Manage Extension",
    icon: Monitor,
    color: "bg-green-500",
  },
  {
    title: "Enable Developer Mode",
    description: "In the top right corner, Switch & Enable Developer Mode",
    icon: Settings,
    color: "bg-yellow-500",
  },
  {
    title: "Load Unpacked Extension",
    description: "Click on Load unpacked extension in the top left corner",
    icon: ToggleRight,
    color: "bg-purple-500",
  },
  {
    title: "Select Extension Folder",
    description: "Select the extracted extension folder (chatfolio-extension)",
    icon: FolderOpen,
    color: "bg-pink-500",
  },
  {
    title: "Pin ChatFolio",
    description: "Click on extension icon again in the toolbar & Pin chatfolio",
    icon: Pin,
    color: "bg-red-500",
  },
  {
    title: "Start Chatting",
    description: "You will see the extension icon in the toolbar. Click to start chatting!",
    icon: MessageSquare,
    color: "bg-indigo-500",
  },
];

const HowToUse = () => {
  const [controls, ref] = useAnimationControls();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="py-20 bg-gradient-to-b from-violet-100 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          How to Use ChatFolio
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between bg-violet-500 p-4">
                <Button variant="outline" size="icon" onClick={prevStep}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold text-white">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <Button variant="outline" size="icon" onClick={nextStep}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 ${steps[currentStep].color} rounded-full flex items-center justify-center mr-4`}>
                      {(() => {
                        const IconComponent = steps[currentStep].icon;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {steps[currentStep].title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{steps[currentStep].description}</p>
                  {currentStep === 0 && (
                    <Link href="/chatfolio.zip" download>
                      <Button className="mt-4">
                        <div className="flex items-center gap-2">
                          <Download className="mr-2 h-4 w-4" /> Download Extension
                        </div>
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
          <div className="flex justify-center mt-8">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                  index === currentStep ? "bg-purple-500" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowToUse;
