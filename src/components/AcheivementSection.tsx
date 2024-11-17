"use client"; // Ensure this runs on the client side
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the AnimatedNumbers component
const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false }
);

// Define the interface for achievements
interface Achievement {
  prefix?: string;
  metric: string;
  value: string;
  postfix?: string;
}

// List of achievements
const achievementsList: Achievement[] = [
  { metric: "Projects", value: "100", postfix: "+" },
  { prefix: "~", metric: "Users", value: "100,000" },
  { metric: "Awards", value: "7" },
  { metric: "Years", value: "5" },
];

// AchievementsSection component
const AchievementsSection: React.FC = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement) => (
          <div
            key={achievement.metric}  // Use unique key instead of index
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-white text-4xl font-bold flex flex-row">
              {achievement.prefix}
              <AnimatedNumbers
                animateToNumber={parseInt(achievement.value.replace(/,/g, ''), 10) || 0}  // Ensure valid number
                locale="en-US"
                className="text-white text-4xl font-bold"
                configs={(num, idx) => ({
                  mass: 1,
                  friction: 100,
                  tension: 140 * (idx + 1), // Use idx for unique configurations
                })}
              />
              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
