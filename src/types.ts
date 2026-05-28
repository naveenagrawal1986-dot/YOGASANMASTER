export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  flexibility: "Beginner" | "Moderate" | "Advanced";
  experience: "Beginner" | "Intermediate" | "Advanced";
  goal: "Weight Loss" | "Stress Relief" | "Meditation" | "Flexibility" | "Muscle Strength" | "Back Pain Relief";
}

export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  duration: string; // e.g. "3 minutes" or "10 breaths"
  durationSeconds: number; // For timer
  benefits: string[];
  steps: string[];
  precautions: string[];
  calories: number;
}

export interface YogaPlan {
  title: string;
  tagline: string;
  difficulty: "Gentle" | "Moderate" | "Challenging" | "Advanced";
  totalDuration: string;
  totalCalories: number;
  safetyAdvice: string;
  mindsetQuote: string;
  poses: YogaPose[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "teacher";
  text: string;
  timestamp: string;
}

export const PRESET_POSES: Record<string, YogaPose> = {
  tadasana: {
    id: "tadasana",
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    duration: "1 Minute",
    durationSeconds: 60,
    benefits: ["Improves posture", "Strengthens thighs, knees, and ankles", "Firms abdomen and buttocks"],
    steps: [
      "Stand with feet together, big toes touching. Distribute weight evenly.",
      "Lift your toes, fan them out, and place them back down to ground yourself.",
      "Engage your quadriceps, tuck your tailbone slightly, and draw your abdomen in.",
      "Roll your shoulders back and down, letting your arms hang relaxed by your sides, palms facing forward.",
      "Elongate your neck, look straight ahead, and breathe deeply into your chest."
    ],
    precautions: ["Headaches", "Insomnia", "Low blood pressure (be cautious if standing long)"],
    calories: 8
  },
  vrikshasana: {
    id: "vrikshasana",
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    duration: "2 Minutes (1 min each side)",
    durationSeconds: 120,
    benefits: ["Enhances balance and stability", "Strengthens ankles and calves", "Stretches groin, inner thighs, chest, and shoulders"],
    steps: [
      "Begin in Mountain Pose. Shift weight onto your left foot.",
      "Bend your right knee, reaching down to place the sole of your right foot against your inner left thigh or calf (avoid the knee joint).",
      "Bring your hands to your chest in prayer position (Anjali Mudra).",
      "Once balanced, raise your arms overhead, stretching towards the sky like branches.",
      "Focus your gaze on a steady point (Drishti) on the wall in front of you. Hold, then swap sides."
    ],
    precautions: ["Knee injuries", "Recent ankle fractures", "High blood pressure (avoid holding arms overhead too long)"],
    calories: 12
  },
  adhomukha: {
    id: "adhomukha",
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    duration: "2 Minutes",
    durationSeconds: 120,
    benefits: ["Energizes the body", "Stretches shoulders, hamstrings, and calves", "Strengthens arms and legs"],
    steps: [
      "Come onto your hands and knees in a tabletop position, wrists under shoulders, knees under hips.",
      "Spread your fingers wide, press down through your palms, and tuck your toes.",
      "Lift your knees away from the floor, extending your tailbone up towards the ceiling.",
      "Gently straighten your legs without locking your knees, moving your heels toward the mat.",
      "Press the mat away with your hands, extend your shoulders, and let your head hang freely between your arms."
    ],
    precautions: ["Carpal tunnel syndrome", "Late-stage pregnancy", "High blood pressure"],
    calories: 18
  },
  bhujangasana: {
    id: "bhujangasana",
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    duration: "1.5 Minutes",
    durationSeconds: 90,
    benefits: ["Strengthens the spine", "Stretches chest, lungs, and shoulders", "Stimulates abdominal organs"],
    steps: [
      "Lie face down on the floor with your legs extended straight behind you, tops of feet flat on the mat.",
      "Place your hands under your shoulders, hugging your elbows close to your ribcage.",
      "Press your pelvis, thighs, and feet firmly into the floor.",
      "Inhale and slowly lift your chest off the ground, keeping your elbows bent and shoulders rolling away from ears.",
      "Keep your gaze forward or slightly upward without straining your neck. Hold and breathe."
    ],
    precautions: ["Back injury", "Pregnancy", "Recent abdominal surgeries"],
    calories: 14
  },
  balasana: {
    id: "balasana",
    name: "Child’s Pose",
    sanskritName: "Balasana",
    duration: "3 Minutes",
    durationSeconds: 180,
    benefits: ["Gently stretches hips, thighs, and ankles", "Calms the brain and relieves stress", "Relieves back and neck pain"],
    steps: [
      "Kneel on the floor, touch your big toes together, and sit on your heels.",
      "Separate your knees about hip-width apart.",
      "Exhale and lower your torso down between your thighs, extending your arms forward on the floor, palms down.",
      "Rest your forehead gently on the mat, releasing all tension in your face, shoulders, and back.",
      "Breathe deeply into your lower back, letting your body sink down with each exhale."
    ],
    precautions: ["Diarrhea", "Knee injury", "Pregnancy (keep knees wide for comfort)"],
    calories: 6
  },
  sukhasana: {
    id: "sukhasana",
    name: "Easy Meditation Pose",
    sanskritName: "Sukhasana",
    duration: "4 Minutes",
    durationSeconds: 240,
    benefits: ["Calms the mind", "Lengthens the spine", "Opens hips and knees"],
    steps: [
      "Sit on a yoga block, cushion, or flat on your mat with legs extended.",
      "Cross your shins, slipping each foot under the opposite knee.",
      "Create a firm, comfortable base. Rest your hands on your knees with palms facing up in Gyan Mudra (thumb and index finger touching).",
      "Elongate your spine, roll your shoulders back, and let your chin tuck very slightly.",
      "Close your eyes, relax your jaw, and focus entirely on the rise and fall of your breath."
    ],
    precautions: ["Severe knee inflammation", "Recent lower back injury (sit with back against wall if needed)"],
    calories: 5
  },
  virabhadrasana: {
    id: "virabhadrasana",
    name: "Warrior II Pose",
    sanskritName: "Virabhadrasana II",
    duration: "2 Minutes (1 min each side)",
    durationSeconds: 120,
    benefits: ["Strengthens legs and ankles", "Stretches groin, chest, and shoulders", "Improves stamina and focus"],
    steps: [
      "Stand tall, step your feet 3.5 to 4 feet apart.",
      "Turn your right foot out 90 degrees and your left foot slightly inward.",
      "Inhale, bringing your arms out parallel to the floor, shoulder height, palms down.",
      "Exhale and bend your right knee over your right ankle, drawing your thigh parallel to the floor.",
      "Keep your torso upright and turn your head to gaze out over your right fingers. Hold, then repeat on the opposite side."
    ],
    precautions: ["Diarrhea", "High blood pressure", "Neck injuries (don't turn head, keep staring straight)"],
    calories: 16
  },
  marjaryasana: {
    id: "marjaryasana",
    name: "Cat-Cow Pose",
    sanskritName: "Marjaryasana-Bitilasana",
    duration: "3 Minutes",
    durationSeconds: 180,
    benefits: ["Warms up the spine", "Relieves neck and shoulder tension", "Coordinates breath with movement"],
    steps: [
      "Start on hands and knees with a neutral spine, wrists under shoulders, knees under hips.",
      "Cow: Inhale, drop your belly towards the mat, lift your chest and sit bones, and look up.",
      "Cat: Exhale, round your spine toward the ceiling, tuck your tailbone and chin, pulling your navel to spine.",
      "Flow continuously between Cat and Cow, matching the transition exactly to your breathing cycle."
    ],
    precautions: ["Recent neck spine injuries (keep neck aligned with spine, don't over-flex)"],
    calories: 12
  }
};
