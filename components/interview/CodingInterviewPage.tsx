"use client";
import { useState } from "react";
import {
  Play, RotateCcw, CheckCircle, XCircle, Clock, ChevronRight,
  Brain, Lightbulb, BarChart2, AlertCircle, Terminal, Code2,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn, formatTime } from "@/lib/utils";

const problems = [
  {
    id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays & Hashing",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] = 2 + 4 = 6" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists"],
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
    timeComplexity: "O(n)", spaceComplexity: "O(n)",
  },
  {
    id: 2, title: "Reverse Linked List", difficulty: "Easy", topic: "Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "Reverse all nodes" }],
    constraints: ["0 ≤ nodes ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    testCases: [{ input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" }],
    timeComplexity: "O(n)", spaceComplexity: "O(1)",
  },
  {
    id: 3, title: "LRU Cache", difficulty: "Medium", topic: "Design",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    examples: [{ input: 'LRUCache(2), put(1,1), put(2,2), get(1) → 1, put(3,3), get(2) → -1', output: "-1", explanation: "Key 2 was evicted" }],
    constraints: ["1 ≤ capacity ≤ 3000", "0 ≤ key ≤ 10⁴"],
    testCases: [{ input: "capacity=2, ops=[put(1,1),put(2,2),get(1),put(3,3),get(2)]", expected: "[null,null,1,null,-1]" }],
    timeComplexity: "O(1)", spaceComplexity: "O(capacity)",
  },
];

const starterCode: Record<string, Record<string, string>> = {
  javascript: {
    "1": `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n  // Your solution here\n  \n};`,
    "2": `var reverseList = function(head) {\n  // Your solution here\n  \n};`,
    "3": `/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n  \n};\n\nLRUCache.prototype.get = function(key) {\n  \n};\n\nLRUCache.prototype.put = function(key, value) {\n  \n};`,
  },
  python: {
    "1": `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your solution here\n        pass`,
    "2": `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Your solution here\n        pass`,
    "3": `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    \n    def get(self, key: int) -> int:\n        pass\n    \n    def put(self, key: int, value: int) -> None:\n        pass`,
  },
  java: {
    "1": `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your solution here\n        return new int[]{};\n    }\n}`,
    "2": `class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your solution here\n        return null;\n    }\n}`,
    "3": `class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        return -1;\n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}`,
  },
};

export default function CodingInterviewPage() {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(starterCode.javascript["1"]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ pass: boolean; input: string; expected: string; got: string }[]>([]);
  const [elapsed, setElapsed] = useState(1247);
  const [activeTab, setActiveTab] = useState<"problem" | "output" | "ai">("problem");
  const [aiReview, setAiReview] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(starterCode[lang]?.[String(selectedProblem.id)] || "// Write your solution here");
  };

  const handleProblemChange = (p: typeof problems[0]) => {
    setSelectedProblem(p);
    setCode(starterCode[language]?.[String(p.id)] || "// Write your solution here");
    setTestResults([]);
    setOutput("");
  };

  const handleRun = async () => {
    setRunning(true);
    setActiveTab("output");
    await new Promise((r) => setTimeout(r, 1200));
    setOutput(`> Running test cases...\n\nTest 1: ✓ Passed (2ms)\nTest 2: ✓ Passed (1ms)\nTest 3: ✓ Passed (1ms)\n\n✅ All sample tests passed!\nRuntime: 68ms (beats 82%)\nMemory: 42.1 MB (beats 71%)`);
    setTestResults(selectedProblem.testCases.map((tc) => ({
      pass: true, input: tc.input, expected: tc.expected, got: tc.expected,
    })));
    setRunning(false);
  };

  const handleAIReview = async () => {
    setActiveTab("ai");
    setReviewing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setAiReview(`**AI Code Review**\n\n✅ **Correctness**: Your solution handles all test cases correctly.\n\n📊 **Time Complexity**: O(n) — excellent! Using a hash map avoids the O(n²) brute force.\n\n🧠 **Space Complexity**: O(n) — acceptable trade-off for the time improvement.\n\n💡 **Suggestions**:\n1. Consider edge cases: empty array, single element\n2. Variable names could be more descriptive (e.g., \`seen\` instead of \`map\`)\n3. Could add early termination for sorted arrays\n\n🔥 **Score: 88/100** — Strong solution with good approach!`);
    setReviewing(false);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-5rem)] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-fade-in">
        {/* Problem List Sidebar */}
        <div className="w-56 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 overflow-y-auto bg-slate-50 dark:bg-slate-900/80">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Problems</p>
          </div>
          {problems.map((p) => (
            <button key={p.id} onClick={() => handleProblemChange(p)}
              className={cn("w-full text-left p-4 border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-white dark:hover:bg-slate-800",
                selectedProblem.id === p.id ? "bg-white dark:bg-slate-800 border-l-2 border-l-primary-500" : "")}>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{p.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-xs font-semibold", p.difficulty === "Easy" ? "text-green-500" : p.difficulty === "Medium" ? "text-yellow-500" : "text-red-500")}>{p.difficulty}</span>
                <span className="text-xs text-slate-400 truncate">{p.topic}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Left: Problem Description */}
        <div className="w-96 flex-shrink-0 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
          <div className="flex gap-1 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            {(["problem", "output", "ai"] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all",
                  activeTab === t ? "bg-primary-500 text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700")}>
                {t === "ai" ? "AI Review" : t}
              </button>
            ))}
          </div>

          {activeTab === "problem" && (
            <div className="p-5 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{selectedProblem.title}</h2>
                  <span className={cn("badge text-xs", selectedProblem.difficulty === "Easy" ? "badge-success" : selectedProblem.difficulty === "Medium" ? "badge-warning" : "badge-danger")}>{selectedProblem.difficulty}</span>
                </div>
                <span className="badge-primary text-xs">{selectedProblem.topic}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{selectedProblem.description}</p>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Examples</p>
                {selectedProblem.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 mb-2 font-mono text-xs">
                    <p className="text-slate-500"><span className="font-semibold">Input:</span> {ex.input}</p>
                    <p className="text-slate-500"><span className="font-semibold">Output:</span> {ex.output}</p>
                    {ex.explanation && <p className="text-slate-400 mt-1"><span className="font-semibold">Explanation:</span> {ex.explanation}</p>}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Constraints</p>
                <ul className="space-y-1">
                  {selectedProblem.constraints.map((c) => <li key={c} className="text-xs text-slate-500 font-mono flex items-center gap-1"><span className="text-primary-400">•</span>{c}</li>)}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center">
                  <p className="text-xs text-slate-500">Expected Time</p>
                  <p className="font-bold text-blue-600 text-sm">{selectedProblem.timeComplexity}</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-center">
                  <p className="text-xs text-slate-500">Expected Space</p>
                  <p className="font-bold text-purple-600 text-sm">{selectedProblem.spaceComplexity}</p>
                </div>
              </div>
              {showHint && (
                <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-1">💡 Hint</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Try using a hash map to store numbers you've seen so far. For each number, check if (target - number) exists in your map.</p>
                </div>
              )}
              <button onClick={() => setShowHint(!showHint)} className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                <Lightbulb className="w-4 h-4" /> {showHint ? "Hide" : "Show"} Hint
              </button>
            </div>
          )}

          {activeTab === "output" && (
            <div className="p-5 space-y-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-200">Test Results</h3>
              {testResults.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Terminal className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Run your code to see results</p>
                </div>
              ) : (
                <>
                  {testResults.map((r, i) => (
                    <div key={i} className={cn("p-3 rounded-xl border text-xs", r.pass ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20")}>
                      <div className="flex items-center gap-2 mb-2">
                        {r.pass ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        <span className={r.pass ? "text-green-700 dark:text-green-400 font-semibold" : "text-red-700 dark:text-red-400 font-semibold"}>Test {i + 1} — {r.pass ? "Passed" : "Failed"}</span>
                      </div>
                      <p className="font-mono text-slate-500"><span className="font-semibold">Input:</span> {r.input}</p>
                      <p className="font-mono text-slate-500"><span className="font-semibold">Expected:</span> {r.expected}</p>
                      {!r.pass && <p className="font-mono text-red-500"><span className="font-semibold">Got:</span> {r.got}</p>}
                    </div>
                  ))}
                  <pre className="p-4 rounded-xl bg-slate-900 text-green-400 text-xs font-mono whitespace-pre-wrap">{output}</pre>
                </>
              )}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="p-5">
              {reviewing ? (
                <div className="text-center py-12">
                  <Brain className="w-10 h-10 mx-auto mb-3 text-primary-400 animate-pulse" />
                  <p className="text-sm text-slate-500">AI is reviewing your code...</p>
                </div>
              ) : aiReview ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{aiReview}</pre>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Code2 className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm text-slate-500">Write and run your code first,<br />then get AI review</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              {["javascript", "python", "java", "c", "cpp"].map((lang) => (
                <button key={lang} onClick={() => handleLanguageChange(lang)}
                  className={cn("px-3 py-1 rounded-lg text-xs font-medium transition-all uppercase tracking-wide",
                    language === lang ? "bg-primary-500 text-white" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700")}>
                  {lang === "cpp" ? "C++" : lang}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(elapsed)}</span>
              </div>
              <button onClick={() => setCode(starterCode[language]?.[String(selectedProblem.id)] || "")}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Code Textarea (Monaco-style) */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="absolute inset-0 w-full h-full resize-none bg-slate-950 text-green-400 font-mono text-sm p-4 focus:outline-none leading-relaxed"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <button onClick={handleAIReview}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm font-medium hover:bg-purple-200 transition-colors">
                <Brain className="w-4 h-4" /> AI Review
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                <BarChart2 className="w-4 h-4" /> Complexity
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleRun} disabled={running}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white text-sm font-semibold transition-all">
                {running ? <><AlertCircle className="w-4 h-4 animate-spin" /> Running...</> : <><Play className="w-4 h-4 fill-white" /> Run Code</>}
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all">
                Submit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
