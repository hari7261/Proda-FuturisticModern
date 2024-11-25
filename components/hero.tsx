"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { Sparkles } from "lucide-react";

const sampleCode = `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Flutter Demo'),
        ),
        body: Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}`;

export default function Hero() {
  return (
    <section className="space-y-10 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <button
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-primary/50 dark:shadow-primary/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <span className="mr-2">🚀</span>
          Explore Our Private Beta
        </button>
        <span className="block mt-4 text-muted-foreground animate-pulse">
          <Sparkles className="inline-block mr-2 h-4 w-4" />
          Join the future of development
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
          Flutter <span className="text-primary">sandbox</span> in
          <br /> your browser
        </h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Proda is a free online sandbox environment for building &
          sharing Dart & Flutter applications.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <CodeBlock code={sampleCode} />
      </motion.div>
    </section>
  );
}
