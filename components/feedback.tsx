"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationControls } from "@/hooks/useAnimationControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, ImageIcon, Smile, Frown, Meh } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import uploadImage from "@/lib/upload-image";

const FeedbackStep = ({
  children,
  isActive,
  onComplete,
  onBack,
  showBack,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onComplete: () => void;
  onBack?: () => void;
  showBack?: boolean;
}) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onComplete();
          }
        }}
      >
        {children}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex gap-4 justify-end"
        >
          {showBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={onComplete}>Next</Button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Feedback = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [controls, ref] = useAnimationControls();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showFeedback, setShowFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        toast.loading("Submitting feedback...");
        if (!feedback.trim()) {
          toast.dismiss();
          toast.warning("Please provide your feedback before submitting.");
          return;
        }

        let uploadedImage;
        if (imageToUpload) {
          uploadedImage = await uploadImage(imageToUpload, "feedback");
        }

        const payload = {
          name: name,
          rating: rating,
          message: feedback,
          image: uploadedImage,
        };

        const response = await fetch("/api/feedback", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        setShowFeedback(true);
        if (data.success) {
          toast.dismiss();
          setSubmitStatus("success");
          toast.success(data.message || "Feedback submitted successfully!");
        } else {
          toast.dismiss();
          setSubmitStatus("error");
          toast.error(data.message || "Failed to submit feedback. Please try again.");
        }

        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
      } catch (error) {
        console.log("Error submitting feedback:", error);
        toast.dismiss();
        toast.error("Failed to submit feedback. Please try again.");
      }
    };

    if (step === 4) {
      handleSubmit();
    }
  }, [step, feedback, imageToUpload, name, rating]);

  if (!isMounted) {
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageToUpload(file);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (step === 2 && !feedback.trim()) {
      toast.loading("Please provide your feedback before continuing.");
      return;
    }
    setStep(step + 1);
    toast.dismiss();
  };

  const prevStep = () => {
    setStep(Math.max(0, step - 1));
  };

  const feedbackEmoji = () => {
    if (rating <= 1) return <Frown className="w-16 h-16 text-red-500" />;
    if (rating <= 4) return <Meh className="w-16 h-16 text-yellow-500" />;
    return <Smile className="w-16 h-16 text-green-500" />;
  };

  const getFeedbackResponse = () => {
    if (rating <= 1) {
      return `We're sorry to hear that you didn't have a great experience, ${name}. We appreciate your feedback about "${feedback.slice(
        0,
        100
      )}..." and we'll work on improving.`;
    }
    if (rating <= 4) {
      return `Thank you for your feedback, ${name}. We're glad you found some things to like, and we'll definitely consider your thoughts on "${feedback.slice(
        0,
        100
      )}..." as we continue to improve.`;
    }
    return `We're thrilled that you had such a positive experience, ${name}! Your feedback about "${feedback.slice(
      0,
      100
    )}..." is invaluable to us.`;
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="py-20 bg-gradient-to-b from-purple-50 to-white min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 text-gray-800"
        >
          We&apos;d Love Your Feedback!
        </motion.h2>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <FeedbackStep
            isActive={step === 0}
            onComplete={nextStep}
            showBack={false}
          >
            <h3 className="text-2xl font-semibold mb-4">
              First, what&apos;s your name?
            </h3>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl py-6"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  nextStep();
                }
              }}
            />
          </FeedbackStep>

          <FeedbackStep
            isActive={step === 1}
            onComplete={nextStep}
            onBack={prevStep}
            showBack={true}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Hi {name}, how would you rate your experience?
            </h3>
            <div className="flex justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    className={`w-12 h-12 cursor-pointer ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                </motion.div>
              ))}
            </div>
          </FeedbackStep>

          <FeedbackStep
            isActive={step === 2}
            onComplete={nextStep}
            onBack={prevStep}
            showBack={true}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Great! Can you tell us more?
            </h3>
            <Textarea
              placeholder="Your feedback is valuable to us..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="text-xl min-h-[150px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  nextStep();
                }
              }}
            />
          </FeedbackStep>

          <FeedbackStep
            isActive={step === 3}
            onComplete={nextStep}
            onBack={prevStep}
            showBack={true}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Last step! Want to add a photo?
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <Image
                    width={128}
                    height={128}
                    src={image}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-16 h-16 text-purple-500" />
                )}
              </motion.div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </FeedbackStep>

          <AnimatePresence>
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <AnimatePresence mode="wait">
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {submitStatus === "success" ? (
                        <div>
                          <div className="flex justify-center">
                            {feedbackEmoji()}
                          </div>
                          <h3 className="text-2xl font-semibold mt-4">
                            Thank you, {name}!
                          </h3>
                          <p className="text-xl mt-2">
                            {getFeedbackResponse()}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Frown className="w-16 h-16 text-red-500 mx-auto" />
                          <h3 className="text-2xl font-semibold mt-4">
                            Oops! Something went wrong.
                          </h3>
                          <p className="text-xl mt-2">
                            Please try again later.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default Feedback;
