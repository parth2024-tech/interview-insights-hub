export type Outcome = "Offer" | "Reject" | "Unknown";

export interface Experience {
  slug: string;
  company: string;
  role: string;
  level: string;
  stages: string[];
  questions: string[];
  outcome: Outcome;
  date: string; // "Jan 2026"
  year: number;
  tip: string;
  sourceUrl?: string;
}

export const experiences: Experience[] = [
  {
    slug: "google-l4-swe-jan-2026",
    company: "Google",
    role: "Software Engineer",
    level: "L4",
    stages: ["Phone Screen", "Onsite", "Team Match"],
    questions: [
      "Given a stream of integers, design a data structure to return the median in O(log n).",
      "Implement an LRU cache with O(1) get and put.",
      "Design a URL shortener with 100M URLs/day. Discuss sharding.",
      "Tell me about a time you disagreed with a teammate and how you resolved it.",
      "How would you debug a sudden 2x increase in p99 latency on a service you don't own?",
    ],
    outcome: "Offer",
    date: "Jan 2026",
    year: 2026,
    tip: "Talk through trade-offs out loud — interviewers score signal, not just the final answer.",
    sourceUrl: "https://reddit.com/r/cscareerquestions",
  },
  {
    slug: "stripe-l3-backend-dec-2025",
    company: "Stripe",
    role: "Backend Engineer",
    level: "L3",
    stages: ["Recruiter Screen", "Technical Phone", "Virtual Onsite"],
    questions: [
      "Implement a rate limiter (token bucket). Handle bursty traffic.",
      "Refactor this messy payment-retry function — live coding in your IDE.",
      "Walk me through how an idempotency key flows through a payments API.",
      "Design a webhook delivery system with retries and ordering guarantees.",
    ],
    outcome: "Offer",
    date: "Dec 2025",
    year: 2025,
    tip: "Stripe loves practical code. Use real language features; avoid pseudocode.",
  },
  {
    slug: "meta-e4-frontend-nov-2025",
    company: "Meta",
    role: "Frontend Engineer",
    level: "E4",
    stages: ["Recruiter Screen", "Coding Screen", "Onsite"],
    questions: [
      "Build an infinite-scrolling feed with virtualization in plain React.",
      "Implement Promise.allSettled from scratch.",
      "Design Instagram Stories — data model and prefetch strategy.",
      "Behavioral: a project you're proud of and what you'd do differently.",
    ],
    outcome: "Reject",
    date: "Nov 2025",
    year: 2025,
    tip: "The product-design round is half the loop — practice it as much as DSA.",
  },
  {
    slug: "amazon-sde2-aws-oct-2025",
    company: "Amazon",
    role: "SDE II",
    level: "L5",
    stages: ["Online Assessment", "Phone Screen", "Loop"],
    questions: [
      "Merge k sorted lists efficiently.",
      "Design a distributed task queue (think SQS lite).",
      "LP question: Customer Obsession — tell me about a time you went above and beyond for a user.",
      "LP question: Dive Deep — a bug only you could find.",
    ],
    outcome: "Offer",
    date: "Oct 2025",
    year: 2025,
    tip: "Prepare 12+ STAR stories mapped to Leadership Principles. They will ask.",
  },
  {
    slug: "openai-research-eng-sep-2025",
    company: "OpenAI",
    role: "Research Engineer",
    level: "Senior",
    stages: ["Recruiter Screen", "Coding", "ML Depth", "Onsite"],
    questions: [
      "Implement multi-head self-attention in NumPy.",
      "Why does layer norm work? Derive the gradient.",
      "Take-home: train a small transformer on a tiny dataset, write up your findings.",
      "How would you design an eval harness for a code-generation model?",
    ],
    outcome: "Unknown",
    date: "Sep 2025",
    year: 2025,
    tip: "They care about taste in research. Bring opinions about recent papers.",
  },
  {
    slug: "shopify-senior-rails-aug-2025",
    company: "Shopify",
    role: "Senior Developer",
    level: "Senior",
    stages: ["Life Story", "Technical", "Pair Programming", "Domain"],
    questions: [
      "Pair on extending an existing Rails app with a new model and controller.",
      "Explain the lifecycle of a Shopify checkout request as you understand it.",
      "How do you decide whether to extract a service from a monolith?",
    ],
    outcome: "Offer",
    date: "Aug 2025",
    year: 2025,
    tip: "The Life Story interview is real — they want to understand your trajectory, not your resume.",
  },
  {
    slug: "datadog-swe-intern-jul-2025",
    company: "Datadog",
    role: "Software Engineer Intern",
    level: "Intern",
    stages: ["OA", "Technical Phone"],
    questions: [
      "Find the longest substring with at most k distinct characters.",
      "Given metrics time series, compute a rolling p95.",
      "Why Datadog?",
    ],
    outcome: "Offer",
    date: "Jul 2025",
    year: 2025,
    tip: "Mention specific Datadog products you've used. Generic answers tank the round.",
  },
  {
    slug: "netflix-senior-platform-jun-2025",
    company: "Netflix",
    role: "Senior Platform Engineer",
    level: "Senior",
    stages: ["Recruiter", "Hiring Manager", "Onsite"],
    questions: [
      "Design a service that ingests 1M events/sec and lets analysts query last 24h.",
      "Walk through a postmortem you led.",
      "How do you push back on a VP who wants a feature you think is wrong?",
    ],
    outcome: "Reject",
    date: "Jun 2025",
    year: 2025,
    tip: "Netflix expects staff-level judgment even at senior. Frame answers around ownership.",
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export const companies = Array.from(new Set(experiences.map((e) => e.company))).sort();
export const levels = Array.from(new Set(experiences.map((e) => e.level))).sort();
export const allStages = Array.from(new Set(experiences.flatMap((e) => e.stages))).sort();
export const years = Array.from(new Set(experiences.map((e) => e.year))).sort((a, b) => b - a);
