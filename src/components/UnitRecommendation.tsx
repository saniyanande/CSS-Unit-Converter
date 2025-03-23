
import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { UnitType, UNITS_INFO } from '@/lib/unitConversions';

interface UnitRecommendationProps {
  context: string;
  value: number;
  suggestedUnit: UnitType;
  currentUnit: UnitType;
}

const UnitRecommendation: React.FC<UnitRecommendationProps> = ({
  context,
  value,
  suggestedUnit,
  currentUnit,
}) => {
  // Define context-specific recommendations
  const contextRecommendations: Record<string, { title: string; recommendations: Record<UnitType, { rating: number; reason: string }> }> = {
    typography: {
      title: "Typography Recommendations",
      recommendations: {
        px: { 
          rating: 2, 
          reason: "Pixels don't scale with user preferences, poor accessibility" 
        },
        rem: { 
          rating: 5, 
          reason: "Scales with root font size, best for accessibility" 
        },
        em: { 
          rating: 4, 
          reason: "Good for relative sizing, but can compound when nested" 
        },
        "%": { 
          rating: 3, 
          reason: "Works for responsive text, but less predictable than rem/em" 
        },
        vh: { 
          rating: 2, 
          reason: "Not ideal for text, as it relates to viewport height, not font size" 
        },
        vw: { 
          rating: 3, 
          reason: "Can be used for fluid typography, but accessibility concerns" 
        },
        vmin: { 
          rating: 3, 
          reason: "Can be good for maintaining readable text on various screens" 
        },
        vmax: { 
          rating: 2, 
          reason: "Less predictable for typography" 
        },
        cm: { rating: 1, reason: "Print-specific, not for screen typography" },
        mm: { rating: 1, reason: "Print-specific, not for screen typography" },
        in: { rating: 1, reason: "Print-specific, not for screen typography" },
        pt: { rating: 2, reason: "Traditional print unit, not ideal for web" },
        pc: { rating: 1, reason: "Print-specific, not for screen typography" },
      }
    },
    borders: {
      title: "Border Recommendations",
      recommendations: {
        px: { 
          rating: 5, 
          reason: "Perfect for borders - precise and consistent across devices" 
        },
        rem: { 
          rating: 3, 
          reason: "Can scale with user preference, but may be too precise for most borders" 
        },
        em: { 
          rating: 2, 
          reason: "Depends on parent font size, usually not needed for borders" 
        },
        "%": { 
          rating: 1, 
          reason: "Percentage of parent - unpredictable for borders" 
        },
        vh: { rating: 1, reason: "Not suitable for borders" },
        vw: { rating: 1, reason: "Not suitable for borders" },
        vmin: { rating: 1, reason: "Not suitable for borders" },
        vmax: { rating: 1, reason: "Not suitable for borders" },
        cm: { rating: 1, reason: "Print-specific, not for screen" },
        mm: { rating: 1, reason: "Print-specific, not for screen" },
        in: { rating: 1, reason: "Print-specific, not for screen" },
        pt: { rating: 2, reason: "Print unit, use px instead" },
        pc: { rating: 1, reason: "Print-specific, not for screen" },
      }
    },
    spacing: {
      title: "Spacing Recommendations",
      recommendations: {
        px: { 
          rating: 3, 
          reason: "Good for small, precise gaps but doesn't scale with preferences" 
        },
        rem: { 
          rating: 5, 
          reason: "Best for consistent spacing that respects user font-size preferences" 
        },
        em: { 
          rating: 4, 
          reason: "Good for spacing related to text size in component" 
        },
        "%": { 
          rating: 4, 
          reason: "Excellent for fluid layouts and responsive spacing" 
        },
        vh: { 
          rating: 3, 
          reason: "Useful for vertical spacing related to viewport height" 
        },
        vw: { 
          rating: 3, 
          reason: "Useful for horizontal spacing related to viewport width" 
        },
        vmin: { 
          rating: 3, 
          reason: "Good for maintaining proportional spacing on extreme screens" 
        },
        vmax: { 
          rating: 2, 
          reason: "Less predictable for spacing" 
        },
        cm: { rating: 1, reason: "Print-specific, not for screen" },
        mm: { rating: 1, reason: "Print-specific, not for screen" },
        in: { rating: 1, reason: "Print-specific, not for screen" },
        pt: { rating: 1, reason: "Print unit, use rem instead" },
        pc: { rating: 1, reason: "Print-specific, not for screen" },
      }
    },
    layout: {
      title: "Layout Recommendations",
      recommendations: {
        px: { 
          rating: 2, 
          reason: "Fixed sizes don't adapt to screen size or user preferences" 
        },
        rem: { 
          rating: 4, 
          reason: "Good for layouts that should respect user's font preferences" 
        },
        em: { 
          rating: 3, 
          reason: "Can be unpredictable in deeply nested layouts" 
        },
        "%": { 
          rating: 5, 
          reason: "Perfect for responsive layouts that adapt to parent containers" 
        },
        vh: { 
          rating: 4, 
          reason: "Excellent for full-height sections and vertical layouts" 
        },
        vw: { 
          rating: 4, 
          reason: "Excellent for full-width sections and horizontal layouts" 
        },
        vmin: { 
          rating: 4, 
          reason: "Good for maintaining proportions on various screen orientations" 
        },
        vmax: { 
          rating: 3, 
          reason: "Can cause overflow on small screens" 
        },
        cm: { rating: 1, reason: "Print-specific, not for screen layouts" },
        mm: { rating: 1, reason: "Print-specific, not for screen layouts" },
        in: { rating: 1, reason: "Print-specific, not for screen layouts" },
        pt: { rating: 1, reason: "Print unit, not for screen layouts" },
        pc: { rating: 1, reason: "Print-specific, not for screen layouts" },
      }
    }
  };

  // Get recommendation data based on context and unit
  const getRecommendationData = () => {
    const contextData = contextRecommendations[context] || contextRecommendations.typography;
    return {
      suggestedRating: contextData.recommendations[suggestedUnit]?.rating || 3,
      suggestedReason: contextData.recommendations[suggestedUnit]?.reason || "Generally recommended for this context",
      currentRating: contextData.recommendations[currentUnit]?.rating || 2,
      currentReason: contextData.recommendations[currentUnit]?.reason || "Not typically recommended for this context",
      title: contextData.title
    };
  };

  const recommendationData = getRecommendationData();

  // Get appropriate icon based on rating
  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <Check className="h-4 w-4 text-green-500" />;
    if (rating >= 3) return <Info className="h-4 w-4 text-blue-500" />;
    return <AlertTriangle className="h-4 w-4 text-amber-500" />;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {recommendationData.title}
      </h3>

      <div className="space-y-4">
        {currentUnit !== suggestedUnit && (
          <motion.div variants={itemVariants} className="recommendation-item">
            <div className="flex items-start">
              <div className="mr-2 mt-0.5">
                {getRatingIcon(recommendationData.suggestedRating)}
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  Suggestion: Use <span className="text-primary font-semibold">{suggestedUnit}</span> instead of {currentUnit}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {recommendationData.suggestedReason}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="recommendation-item">
          <div className="flex items-start">
            <div className="mr-2 mt-0.5">
              {getRatingIcon(recommendationData.currentRating)}
            </div>
            <div>
              <h4 className="text-sm font-medium">
                {currentUnit} for {context}:
                <span className={`ml-1 ${
                  recommendationData.currentRating >= 4 ? 'text-green-600 dark:text-green-400' :
                  recommendationData.currentRating >= 3 ? 'text-blue-600 dark:text-blue-400' :
                  'text-amber-600 dark:text-amber-400'
                }`}>
                  {recommendationData.currentRating >= 4 ? 'Highly Recommended' :
                   recommendationData.currentRating >= 3 ? 'Acceptable' :
                   'Not Ideal'}
                </span>
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {recommendationData.currentReason}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>Browser Support:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div 
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                    dot <= UNITS_INFO[currentUnit].browserSupport 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span>Responsive Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div 
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                    dot <= UNITS_INFO[currentUnit].responsiveRating 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UnitRecommendation;
