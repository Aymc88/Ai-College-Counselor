"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FakeCodePage() {
    const [typedText, setTypedText] = useState('');

    const fullCode = `
// The Story of Logic
// A program written in the language of Life

import { Passion, Dedication } from 'human-experience';
import { Dreams } from 'future-aspirations';

class SuccessStory extends LifeJourney {
  
  constructor(name) {
    super();
    this.protagonist = name;
    this.state = {
      motivated: true,
      ready: true,
      limitless: true
    };
  }

  async function achieveGoals(effort, time) {
    // If you put in the work, results will follow
    if (effort > 0 && time > 0) {
      const result = await Dreams.manifest();
      return result;
    } else {
      throw new Error("Nothing comes from nothing.");
    }
  }

  render() {
    return (
      <Future>
        <Happiness />
        <Achievement />
        <Peace />
      </Future>
    );
  }
}

// Execution starts here
const myJourney = new SuccessStory("You");
myJourney.achieveGoals(100, "forever");
`;

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setTypedText((prev) => {
                if (index < fullCode.length) {
                    const char = fullCode.charAt(index);
                    index++;
                    return fullCode.substring(0, index);
                }
                clearInterval(timer);
                return prev;
            });
        }, 20); // Typing speed

        return () => clearInterval(timer);
    }, []);

    // Simple syntax highlighting helper
    const highlightCode = (code: string) => {
        return code.split('\n').map((line, i) => (
            <div key={i} className="flex">
                <span className="w-8 text-gray-600 text-right mr-4 select-none">{i + 1}</span>
                <span className="whitespace-pre font-mono text-sm md:text-base">
                    {line.split(/(\/\/.*|"[^"]*"|'[^']*'|\b\w+\b|[{}();,.[\]]|\s+)/g).filter(Boolean).map((token, j) => {
                        if (token.startsWith('//')) return <span key={j} className="text-green-600">{token}</span>;
                        if (['import', 'from', 'class', 'extends', 'constructor', 'super', 'this', 'async', 'function', 'if', 'else', 'return', 'const', 'let', 'new', 'throw', 'await'].includes(token)) return <span key={j} className="text-purple-400">{token}</span>;
                        if (['Passion', 'Dedication', 'Dreams', 'SuccessStory', 'LifeJourney', 'Future', 'Happiness', 'Achievement', 'Peace', 'Error'].includes(token)) return <span key={j} className="text-yellow-300">{token}</span>;
                        if (token.startsWith('"') || token.startsWith("'")) return <span key={j} className="text-green-300">{token}</span>;
                        if (['true', 'false'].includes(token)) return <span key={j} className="text-blue-400">{token}</span>;
                        return <span key={j} className="text-gray-100">{token}</span>;
                    })}
                </span>
            </div>
        ));
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-gray-300 p-4 font-mono overflow-auto">
            <div className="max-w-4xl mx-auto border border-gray-700 rounded-lg shadow-2xl bg-[#1e1e1e] overflow-hidden">
                {/* Window Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-400">life_script.js</div>
                    <div></div>
                </div>

                {/* Code Area */}
                <div className="p-6 overflow-x-auto">
                    {highlightCode(typedText)}
                    <span className="inline-block w-2 h-5 bg-blue-400 animate-pulse ml-1 align-middle"></span>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                    Return to Reality
                </Link>
            </div>
        </div>
    );
}
