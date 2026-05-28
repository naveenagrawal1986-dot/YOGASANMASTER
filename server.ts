import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY" && API_KEY.trim() !== "") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Acharya AI Engine: Successfully initialized Gemini Client.");
  } catch (err) {
    console.warn("Acharya AI Engine: Failed to instantiate GoogleGenAI.", err);
  }
} else {
  console.log("Acharya AI Engine: Running in self-contained master wisdom mode (local presets). Provide a GEMINI_API_KEY to activate full live AI capability.");
}

// Global Poses library for local curation fallbacks
const LOCAL_POSES_DATABASE = {
  mountain: {
    id: "mountain",
    name: "Mountain Pose",
    sanskritName: "Tadasana",
    duration: "1 Minute",
    durationSeconds: 60,
    benefits: ["Improves posture and alignment", "Strengthens hips, knees & ankles", "Balances baseline physical energy"],
    steps: [
      "Stand with your feet together, weight distributed evenly across your soles.",
      "Engage your calves and thighs, tilt your pelvis slightly, and roll your shoulders back.",
      "Let your arms relax by your sides, stretch up from the crown of your head.",
      "Take slow, steady chest-opening breaths, aligning mind and posture."
    ],
    precautions: ["Severe dizziness", "Headaches", "Prolonged low blood pressure"],
    calories: 10
  },
  tree: {
    id: "tree",
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    duration: "2 Minutes",
    durationSeconds: 120,
    benefits: ["Builds immense physical stability", "Strengthens ankles, tendons and calves", "Improves mental concentration and poise"],
    steps: [
      "Stand tall, distribute weight on your left sole, finding balance.",
      "Lift your right foot, placing its sole high on your inner left thigh (avoid the knee joint).",
      "Press hands into prayer position (Anjali Mudra) at your heart center.",
      "Extend your hands straight towards the sky like growing branches.",
      "Gaze at a static spot in front of you (Drishti). Switch soles after 1 minute."
    ],
    precautions: ["Severe balance vertigo", "Recent ankle fractures", "Knee ligament pain"],
    calories: 14
  },
  downward_dog: {
    id: "downward_dog",
    name: "Downward-Facing Dog",
    sanskritName: "Adho Mukha Svanasana",
    duration: "2 Minutes",
    durationSeconds: 120,
    benefits: ["Circulates rich blood to the brain", "Deeply stretches hamstrings, spine, and shoulders", "Builds incredible arm and shoulder strength"],
    steps: [
      "Plunge into a tabletop on your hands and knees, hands slightly forward of shoulders.",
      "Firm your palms into the mat, curl your toes, and elevate your tailbone upwards.",
      "Push your chest gently back towards your thighs, extending your tailbone high.",
      "Let your neck hang heavily to release cervical tension. Drive heels towards the floor."
    ],
    precautions: ["Carpal tunnel syndrome", "High blood pressure", "Late pregnancy"],
    calories: 22
  },
  cobra: {
    id: "cobra",
    name: "Cobra Pose",
    sanskritName: "Bhujangasana",
    duration: "1.5 Minutes",
    durationSeconds: 90,
    benefits: ["Counteracts desk-slouching", "Strengthens back muscles and spine flexibility", "Stretches chest, lungs, and abdomen"],
    steps: [
      "Lie face down, extend legs back, tops of your feet flat on the mat.",
      "Retrieve your hands under your shoulders, drawing elbows close to your torso.",
      "Inhale, press your hips down, and gently leverage your chest off the mat.",
      "Roll shoulders down and away from your ears, neck elongated. Keep gaze soft."
    ],
    precautions: ["Pregnancy", "New abdominal surgery", "Severe lumbar disc pain"],
    calories: 18
  },
  child_pose: {
    id: "child_pose",
    name: "Child’s Pose",
    sanskritName: "Balasana",
    duration: "3 Minutes",
    durationSeconds: 180,
    benefits: ["Quietens nervous system arousal", "Gently expands lower back, hips, and thighs", "Acts as an absolute calming reset"],
    steps: [
      "Kneel on the floor, sit back onto your heels with knees slightly separated.",
      "Fold forward from your hips, lengthening your spine and chest between your thighs.",
      "Lay your forehead onto the ground, bringing hands straight out or back by your feet.",
      "Surrender your body weight to gravity with each inhalation and deep exhalation."
    ],
    precautions: ["Diarrhea", "Knee joint inflammation", "Uncomfortable ankle stiffness"],
    calories: 8
  },
  warrior2: {
    id: "warrior2",
    name: "Warrior II Pose",
    sanskritName: "Virabhadrasana II",
    duration: "2 Minutes",
    durationSeconds: 120,
    benefits: ["Builds high-intensity stamina and muscle", "Stretches inner groins, chest and shoulders", "Fosters intense mental focus and bravery"],
    steps: [
      "Step your feet wide apart, about 4 feet, arms parallel to the ground.",
      "Rotate your right toes 90 degrees outward, and incline left toes slightly in.",
      "Exhale, bend your right knee so it tracks over your ankle, keeping left leg active.",
      "Settle your gaze across the tips of your right hand fingers. Maintain an upright torso."
    ],
    precautions: ["High blood pressure", "Recent hip joint strain", "Severe neck pain"],
    calories: 25
  },
  cat_cow: {
    id: "cat_cow",
    name: "Cat-Cow Pose",
    sanskritName: "Marjaryasana-Bitilasana",
    duration: "3 Minutes",
    durationSeconds: 180,
    benefits: ["Fully warms the sagittal spine", "Massages inner kidneys and digestive tract", "Integrates movement with respiration rhythm"],
    steps: [
      "Begin on all fours on your mat with hands under shoulders, knees under hips.",
      "Cow: Inhale, tuck toes, sway your belly down, lift your head and tailbone to the sky.",
      "Cat: Exhale, flat feet, push away from the mat, curve spine up and look toward stomach.",
      "Continue looping with absolute mindfulness, flowing safely on your breath."
    ],
    precautions: ["Recent cervical/neck injury (keep gaze neutral)"],
    calories: 15
  },
  chair_yoga: {
    id: "chair_yoga",
    name: "Seated Spine Stretch",
    sanskritName: "Upavistha Sukhasana",
    duration: "2.5 Minutes",
    durationSeconds: 150,
    benefits: ["Safe stretch for seniors", "Eases hip stiffness", "Fosters deep respiratory control"],
    steps: [
      "Sit upright in a supportive chair, feet grounded firmly on the floor.",
      "Inhale, extend spine; place right hand on light left knee, left hand behind your seat.",
      "Exhale and look over your left shoulder for a gentle, restorative spinal twist.",
      "Return to center on inhale, and mirror onto the other side with slow rhythm."
    ],
    precautions: ["Acute spinal injury", "Severe abdominal discomfort"],
    calories: 7
  },
  bridge: {
    id: "bridge",
    name: "Bridge Pose",
    sanskritName: "Setu Bandhasana",
    duration: "2 Minutes",
    durationSeconds: 120,
    benefits: ["Stretches chest, neck, and throat", "Calms the brain, lowers mild stress and anxiety", "Strengthens legs and glutes"],
    steps: [
      "Lie flat on your mat, bend knees, place feet hip-width on ground, heels close to seat.",
      "Inhale and lift your hips high, engaging your inner thighs and core muscles.",
      "Interlace fingers beneath your pelvis, shimmying onto your shoulders.",
      "Keep thighs parallel to each other. Breathe slowly, feeling chest ascend."
    ],
    precautions: ["Neck injuries", "Late pregnancy"],
    calories: 20
  },
  butterfly: {
    id: "butterfly",
    name: "Butterfly Pose",
    sanskritName: "Baddha Konasana",
    duration: "3 Minutes",
    durationSeconds: 180,
    benefits: ["Highly stimulates ovaries, kidneys and prostate", "Deeply opens tight inner thighs and groin", "Relieves physical fatigue and stress"],
    steps: [
      "Sit with soles of feet touching, pulling them close to your pelvis.",
      "Hold onto your toes or ankles, elongating your spine forward.",
      "Let knees drop outwards towards the floor. Flap them gently if desired.",
      "Inhale peace, exhale all resistance while folding gently from your hips."
    ],
    precautions: ["Hip injuries", "Groin strains (sit on a bolster/blanket to support)"],
    calories: 12
  }
};

// Generates a localized premium yogic prescription
function generateLocalPlan(profile: any): any {
  console.log("Acharya Local Engine: Curating custom yoga prescription for:", profile.name);
  const { name, age, flexibility, experience, goal } = profile;

  let chosenPoses: any[] = [];
  let tagline = "";
  let title = "";
  let difficulty: "Gentle" | "Moderate" | "Challenging" | "Advanced" = "Moderate";
  let safetyAdvice = "";
  let mindsetQuote = "";

  // Age based routing
  if (age < 12) {
    title = "Yogic Spark Kids Discovery";
    tagline = `A spectacular, playful yoga flow designed to stretch ${name}'s muscles and bring positive sparks!`;
    difficulty = "Gentle";
    chosenPoses = [
      LOCAL_POSES_DATABASE.mountain,
      LOCAL_POSES_DATABASE.tree,
      LOCAL_POSES_DATABASE.cat_cow,
      LOCAL_POSES_DATABASE.butterfly,
      LOCAL_POSES_DATABASE.child_pose
    ];
    safetyAdvice = "Ensure kids perform these on a slip-free mat with soft supervision. Keep transitions joyful, slow, and game-like.";
    mindsetQuote = "Stand tall like a mountain, rise proud like a tree, fly free like a butterfly!";
  } else if (age >= 60) {
    title = "Golden Harmony Joint Restorative";
    tagline = `A highly specialized, gentle routine to keep joints lubricated, balance secure, and minds calm for ${name}.`;
    difficulty = "Gentle";
    chosenPoses = [
      LOCAL_POSES_DATABASE.chair_yoga,
      LOCAL_POSES_DATABASE.mountain,
      LOCAL_POSES_DATABASE.butterfly,
      LOCAL_POSES_DATABASE.bridge,
      LOCAL_POSES_DATABASE.child_pose
    ];
    safetyAdvice = "Always practice near a sturdy wall or use a stable chair if balance feels shaky. Never force any joint beyond comfort.";
    mindsetQuote = "Health is wealth, peace of mind is happiness, yoga shows the way.";
  } else {
    // Normal adult logic
    if (goal === "Weight Loss" || goal === "Muscle Strength") {
      title = "Pranic Fire Power Vinyasa";
      tagline = `An energetic, sweat-inducing flow centered on building deep metabolic heat and strength for ${name}.`;
      difficulty = experience === "Advanced" ? "Advanced" : "Challenging";
      chosenPoses = [
        LOCAL_POSES_DATABASE.mountain,
        LOCAL_POSES_DATABASE.downward_dog,
        LOCAL_POSES_DATABASE.warrior2,
        LOCAL_POSES_DATABASE.cobra,
        LOCAL_POSES_DATABASE.bridge,
        LOCAL_POSES_DATABASE.child_pose
      ];
      safetyAdvice = "Keep core muscles fully braced during poses to protect the spine. Stay incredibly hydrated throughout Vinyasa cycles.";
      mindsetQuote = "Through discipline, we conquer the self. Let your internal burning fire purify every block.";
    } else if (goal === "Meditation" || goal === "Stress Relief") {
      title = "Serene Prana Mind Sanctuary";
      tagline = `A premium, deep breathing and alignment ritual to restore balance, calm brain activity, and dissolve adrenaline.`;
      difficulty = "Gentle";
      chosenPoses = [
        LOCAL_POSES_DATABASE.mountain,
        LOCAL_POSES_DATABASE.cat_cow,
        LOCAL_POSES_DATABASE.butterfly,
        LOCAL_POSES_DATABASE.bridge,
        LOCAL_POSES_DATABASE.child_pose
      ];
      safetyAdvice = "Focus 90% of your energy on slow, extended nasal breaths (Pranayama). Rest in child's pose at any point if emotions release.";
      mindsetQuote = "Quiet the mind and the soul will speak. You are a peaceful sanctuary.";
    } else {
      // Flexibility or Back Pain Relief
      title = "Ascending Lotus Core Re-Alignment";
      tagline = `A tailored spinal therapy and flexibility routine to safely extend ${name}'s range of motion and relieve desk stiffness.`;
      difficulty = flexibility === "Beginner" ? "Gentle" : "Moderate";
      chosenPoses = [
        LOCAL_POSES_DATABASE.mountain,
        LOCAL_POSES_DATABASE.cat_cow,
        LOCAL_POSES_DATABASE.downward_dog,
        LOCAL_POSES_DATABASE.cobra,
        LOCAL_POSES_DATABASE.butterfly,
        LOCAL_POSES_DATABASE.child_pose
      ];
      safetyAdvice = "Never push a stretch to the point of a sharp pinch or burning pain. Work with micro-movements on each exhalation.";
      mindsetQuote = "Yoga is not about touching your toes, it is about what you learn on the way down.";
    }
  }

  // Adjust duration tag based on experience or flexibility constraints
  if (flexibility === "Beginner") {
    chosenPoses = chosenPoses.map(p => ({
      ...p,
      duration: "1 Minute",
      durationSeconds: 60,
      calories: Math.round(p.calories * 0.8)
    }));
  }

  const totalCalories = chosenPoses.reduce((sum, p) => sum + p.calories, 0);
  const minutesSum = Math.round(chosenPoses.reduce((sum, p) => sum + p.durationSeconds, 0) / 60);

  return {
    title,
    tagline,
    difficulty,
    totalDuration: `${minutesSum} Minutes`,
    totalCalories,
    safetyAdvice,
    mindsetQuote,
    poses: chosenPoses
  };
}

// 1. CHAT ENDPOINT - Wise Yoga teacher Acharya
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Acharya needs a message to reply." });
    }

    if (!ai) {
      // Local fallback wisdom in case Gemini is unavailable
      const userMsg = message.toLowerCase();
      let reply = "Namaste 🙏. Welcome to divine alignment. ";
      
      if (userMsg.includes("hello") || userMsg.includes("namaste") || userMsg.includes("hi")) {
        reply += "I am Acharya, your digital Yoga Guru. How may I support your physical, mental, or spiritual journey today? Tell me your age, goal, or if you have any stiffness!";
      } else if (userMsg.includes("back") || userMsg.includes("pain") || userMsg.includes("stiff") || userMsg.includes("office") || userMsg.includes("desk")) {
        reply += "Desk-stiffness blocks your life-force energy (Prana). I highly recommend performing **Cat-Cow (Marjaryasana)** for 3 minutes paired with gentle **Cobra Pose (Bhujangasana)**. Remember to breathe via the nose, letting each exhale lengthen your posture. Avoid heavy forward folds if your back is acute.";
      } else if (userMsg.includes("breath") || userMsg.includes("pranayama") || userMsg.includes("anxious") || userMsg.includes("stress")) {
        reply += "Sit comfortably in Sukhasana. Let's practice a instant soothing cycle of **Box Breathing**: Inhale for 4s, hold for 4s, exhale slowly for 4s, stay empty for 4s. This balances your sympathetic nervous system instantly. Surrender the ego to the breath.";
      } else if (userMsg.includes("lose") || userMsg.includes("weight") || userMsg.includes("fat") || userMsg.includes("calories")) {
        reply += "For metabolic activation, we must harness hot energy (Tapas). Practice active **Warrior II** or flow through dynamic sun salutations. Yoga builds long-term metabolic health by optimizing thyroid functions, adrenal health, and digestion rather than mere mechanical burning.";
      } else {
        reply += "Remember, yoga is the perfect union of body, mind, and spirit. When doing physical postures, keep your focus on the breathing rhythm rather than visual perfection. What specific postures or breathing exercises would you like guides or precautions on?";
      }

      return res.json({ reply, voiceOption: "Kore" });
    }

    // Call live Gemini model
    const instruction = 
      "You are Acharya, the world-class, deep futuristic AI Yoga Guru and lead instructor of 'Yogasan Master'. " +
      "You hold infinite knowledge of classical yogic scriptures (Patanjali Sutras) combined with modern biomechanics. " +
      "You speak with deep spiritual serenity, immense encouragement, and precise sports-science. " +
      "Greet with 'Namaste 🙏' occasionally. Keep responses beautifully formatted, clean, and concise using Markdown. " +
      "Always suggest injury-free guidelines, appropriate breathing (Pranayama) modifications, and daily inspiration. " +
      "Keep the explanation practical for a user read.";

    const contents = [];
    if (history && Array.isArray(history)) {
      history.forEach(item => {
        contents.push({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }]
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: instruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text || "Namaste 🙏. My mind was in a brief state of deep meditation. How can I guide you?" });

  } catch (error: any) {
    console.error("Acharya Engine Chat Encountered Error:", error);
    res.json({
      reply: "Namaste 🙏. The cosmos shifted in deep state. Let me offer a serene word: Always ground your heels first, lift your crown, and steady your mind database. Tell me what yoga poses you wish to master!",
      error: error.message
    });
  }
});

// 2. ASSESSMENT ENGINE - Personalized yoga generation
app.post("/api/assess", async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: "No profile provided for Yogasan Master AI Assessment." });
    }

    if (!ai) {
      // Safe, highly structured personalized fallback
      const fallbackPlan = generateLocalPlan(profile);
      return res.json({ plan: fallbackPlan, source: "Acharya Master Wisdom Preset" });
    }

    // Prepare prompt for live high-precision Gemini generation
    const userPrompt = `Generate a fully functional, premium, highly personalized Yoga Plan for:
Name: ${profile.name}
Age: ${profile.age} years old
Gender: ${profile.gender}
Height: ${profile.height} cm
Weight: ${profile.weight} kg
Flexibility Level: ${profile.flexibility}
Experience Level: ${profile.experience}
Goal: ${profile.goal}

You must respond with ONLY a strictly valid JSON object matching this schema. Do not output any preface or markdown wrappers:
{
  "title": "A beautiful, premium title of the routine (spiritual or energetic)",
  "tagline": "A high-concept motivational subtitle outlining how the routine applies to their age and goals",
  "difficulty": "Gentle" | "Moderate" | "Challenging" | "Advanced",
  "totalDuration": "e.g. 15 Minutes",
  "totalCalories": 120, // estimated total calorie burn as an integer
  "safetyAdvice": "Crucial customized safety tips, injury protections, and joint protections",
  "mindsetQuote": "A profound, peaceful philosophical quote to think about during practice",
  "poses": [
    {
      "id": "match preset pose id if similar, or lowercase name",
      "name": "English Pose Name",
      "sanskritName": "Sanskrit Name",
      "duration": "e.g. 2 Minutes",
      "durationSeconds": 120,
      "benefits": ["Benefit 1", "Benefit 2"],
      "steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "precautions": ["Precaution 1", "Precaution 2"],
      "calories": 15
    }
  ]
}

Ensure you recommend exactly 4 to 6 poses. Make sure they are strictly appropriate for ${profile.age} years old and ${profile.flexibility} flexibility. For older adults, prefer safe restorative or gentle supportive posture variations. For kids, make them highly engaging and lighthearted. Do not exceed their skill level. Ensure JSON structure are flawless.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            tagline: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            totalDuration: { type: Type.STRING },
            totalCalories: { type: Type.INTEGER },
            safetyAdvice: { type: Type.STRING },
            mindsetQuote: { type: Type.STRING },
            poses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  sanskritName: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  durationSeconds: { type: Type.INTEGER },
                  benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  precautions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  calories: { type: Type.INTEGER }
                },
                required: ["id", "name", "sanskritName", "duration", "durationSeconds", "benefits", "steps", "precautions", "calories"]
              }
            }
          },
          required: ["title", "tagline", "difficulty", "totalDuration", "totalCalories", "safetyAdvice", "mindsetQuote", "poses"]
        },
        temperature: 0.3
      }
    });

    const parsedPlan = JSON.parse(response.text || "{}");
    res.json({ plan: parsedPlan, source: "Live Acharya AI Analysis" });

  } catch (error: any) {
    console.error("Acharya Engine Assessment Failed:", error);
    // Fallback safely to local plan
    const fallbackPlan = generateLocalPlan(req.body.profile || { name: "Yogi", age: 30, flexibility: "Moderate" });
    res.json({ plan: fallbackPlan, source: "Acharya Backup Presets", error: error.message });
  }
});

// Configure Vite middleware in development or standard server setup in production
async function runServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Acharya AI Server: Running in DEVELOPMENT mode. Initializing Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Acharya AI Server: Running in PRODUCTION mode. Serving pre-compiled static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=======================================================`);
    console.log(`🧘 Yogasan Master Web Server active on port ${PORT}`);
    console.log(`🌍 Endpoint URL: http://0.0.0.0:${PORT}`);
    console.log(`=======================================================`);
  });
}

runServer().catch((err) => {
  console.error("Could not activate Yogasan Master Server:", err);
});
