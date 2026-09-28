// Each module has explicit concepts and a distinct practical outcome.
const module=(title,topics,practice)=>({title,topics:topics.split('|'),practice,summary:`Understand ${topics.split('|').join(', ')}. ${practice}`});
export const CURRICULA={
  python:[
    module('Python Essentials','Interpreter & REPL|Variables & Types|Operators & Expressions|Strings & Formatting','Build a unit converter that validates input and formats its output.'),
    module('Control Flow','Boolean Logic|Conditionals|For & While Loops|Range & Iteration','Create a guessing-game loop with bounded attempts and useful feedback.'),
    module('Functions & Scope','Parameters & Return Values|Default & Keyword Arguments|Scope & Closures|Recursion','Refactor a receipt calculator into small functions and explain each input and output.'),
    module('Collections & Data','Lists & Tuples|Dictionaries & Sets|Comprehensions|Sorting & Key Functions','Summarize study sessions by subject, remove duplicates, and sort the results.'),
    module('Files & Reliability','Pathlib & File IO|CSV & JSON|Exceptions|Context Managers','Import a CSV habit log, handle malformed rows, and export a JSON summary.'),
    module('Objects & Iteration','Classes & Objects|Dataclasses|Iterators & Generators|Decorators','Model a reading list with dataclasses and stream its entries through a generator.'),
    module('Project Tooling','Modules & Packages|Virtual Environments|Type Hints|Unit Testing','Package a small utility in a virtual environment and test its boundary cases.'),
    module('Applied Python Project','HTTP Requests|Async IO Basics|Logging & Debugging|CLI Applications','Build a command-line habit tracker with persistence, tests, logging, and a README.')
  ],
  java:[
    module('The Java Platform','JDK & JVM|Compilation & Bytecode|Packages & Imports|IDE & Debugger','Compile a small command-line program and inspect a breakpoint in the debugger.'),
    module('Language Foundations','Primitive Types|Operators & Casting|Control Flow|Methods & Overloading','Build a grade-summary utility with methods, branching, and validated numeric input.'),
    module('Strings, Arrays & Values','Strings & StringBuilder|Arrays & Varargs|Pass by Value|Equality & Hash Codes','Compare strings and objects correctly, then implement a text-frequency report.'),
    module('Classes & Object Design','Classes & Objects|Constructors & Initialization|Access Modifiers|Static & Final','Model books and readers with constructors, access control, and explicit invariants.'),
    module('Abstraction & Polymorphism','Inheritance|Interfaces & Abstract Classes|Composition|Records & Enums','Design a lending policy interface with two implementations and a composed library service.'),
    module('Generics & Collections','Generic Types & Bounds|List, Set & Map|Iterators & Comparable|Collection Trade-offs','Choose collections for a lending catalog and implement type-safe search and sorting.'),
    module('Exceptions & File IO','Checked & Unchecked Exceptions|Try-with-resources|NIO Files & Paths|Serialization Boundaries','Save and load a catalog while handling missing files and invalid records.'),
    module('Functional Java','Lambda Expressions|Functional Interfaces|Stream Pipelines|Optional','Use streams to group overdue loans without hiding errors behind empty Optional values.'),
    module('Concurrency & the JVM','Threads & Executors|Synchronization|CompletableFuture|Memory & Garbage Collection','Compare sequential and concurrent mock lookups and explain a shared-state race.'),
    module('Build, Test & Ship','Maven & Gradle|JUnit & Test Design|JDBC & Prepared Statements|Application Architecture','Deliver a tested library application with a database boundary and reproducible build.')
  ],
  dsa:[
    module('Reasoning About Algorithms','Big O Time|Space Complexity|Loop Invariants|Amortized Analysis','Compare two duplicate-detection algorithms with hand-traced inputs and memory costs.'),
    module('Arrays & Strings','Dynamic Arrays|Two Pointers|Sliding Window|Prefix Sums','Find the longest valid subarray and explain when to use a window or prefix sums.'),
    module('Hash-based Structures','Hash Maps|Hash Sets|Collisions & Load Factor|Frequency Counting','Build an anagram grouper and discuss collision handling and expected lookup cost.'),
    module('Linear Structures','Singly Linked Lists|Doubly Linked Lists|Stacks|Queues & Deques','Implement undo history and a task queue, including empty-structure edge cases.'),
    module('Recursion & Search Spaces','Recursive State|Call Stack|Backtracking|Pruning','Generate valid bracket sequences and show how pruning removes invalid branches.'),
    module('Sorting & Searching','Binary Search|Merge Sort|Quick Sort|Stable Sorting','Compare sorting choices and implement binary search with an explicit boundary invariant.'),
    module('Trees & Hierarchies','Binary Trees|Binary Search Trees|Tree Traversals|Tries','Build a word-prefix search and compare a trie with a sorted collection.'),
    module('Heaps & Greedy Choices','Binary Heaps|Priority Queues|Greedy Algorithms|Interval Scheduling','Schedule non-overlapping meetings and use a priority queue to track pending work.'),
    module('Graphs & Connectivity','Graph Representations|BFS & DFS|Topological Sort|Dijkstra & Union-Find','Model course prerequisites, detect cycles, and explain when shortest-path weights matter.'),
    module('Dynamic Programming & Practice','Memoization|Tabulation|Knapsack & Sequence DP|Problem-solving Patterns','Solve a small optimization problem twice and compare states, transitions, and complexity.')
  ],
  oop:[
    module('Objects & Responsibilities','Classes & Objects|State & Behavior|Object Identity|Responsibility Assignment','Model a game inventory and assign each operation to one clear owner.'),
    module('Encapsulation & Invariants','Access Control|Data Hiding|Class Invariants|Immutable Objects','Protect inventory capacity and item quantities through a small public interface.'),
    module('Contracts & Abstraction','Interfaces|Abstract Classes|Preconditions & Postconditions|Dependency Boundaries','Define an equipment contract and document valid inputs and promised outcomes.'),
    module('Inheritance & Polymorphism','Inheritance|Method Overriding|Dynamic Dispatch|Liskov Substitution','Implement interchangeable item effects and inspect a subtype that violates its contract.'),
    module('Composition & Collaboration','Composition|Aggregation|Delegation|Dependency Injection','Replace a character inheritance hierarchy with composed movement and attack behaviors.'),
    module('Design Principles','Single Responsibility|Open-Closed Principle|Interface Segregation|Dependency Inversion','Refactor an overloaded inventory manager into focused, testable collaborators.'),
    module('Practical Design Patterns','Strategy Pattern|Factory Pattern|Observer Pattern|Adapter Pattern','Use a strategy for item effects and an observer for inventory notifications.'),
    module('Refactoring & Design Review','Coupling & Cohesion|Tell, Do Not Ask|Testing Collaborations|Refactoring Safely','Deliver a role-playing inventory with tests and a diagram explaining design trade-offs.')
  ],
  js:[
    module('JavaScript Essentials','JavaScript Runtime|Let, Const & Scope|Primitive Types|Operators & Coercion','Build a unit converter and compare explicit conversion with implicit coercion.'),
    module('Logic & Functions','Conditionals & Loops|Function Declarations|Arrow Functions|Parameters & Return Values','Split a shopping-cart calculator into pure functions with clear inputs.'),
    module('Arrays & Objects','Array Methods|Objects & Property Access|Destructuring|Spread & Rest','Filter, group, and transform a reading list without mutating the source data.'),
    module('The Language Underneath','Closures|This & Binding|Prototypes|Classes','Create a counter with a closure and compare it with a class-based implementation.'),
    module('Browser Interaction','DOM Selection|DOM Updates|Events & Delegation|Forms & Validation','Build an accessible task form with validation, event delegation, and safe text rendering.'),
    module('Asynchronous JavaScript','Event Loop|Promises|Async & Await|Error Propagation','Trace the order of synchronous code, microtasks, and timers, then handle a rejected promise.'),
    module('Working with APIs','Fetch & HTTP|JSON & Response Validation|AbortController|Loading & Error States','Build a search interface that cancels stale requests and displays retryable errors.'),
    module('Modules & Tooling','ES Modules|npm & Package Scripts|Bundling Concepts|Linting & Formatting','Organize a browser project into modules and document a reproducible development workflow.'),
    module('Reliable Frontend Code','Unit Tests|Browser Testing|Local Storage|Web Security Basics','Persist task data, recover corrupt saves, and test that user text is rendered safely.'),
    module('Ship a Browser Application','State Management|Component Boundaries|Performance & Accessibility|Deployment Basics','Deliver a task dashboard with an API view, keyboard access, tests, and a demo walkthrough.')
  ],
  ai:[
    module('AI & Learning Foundations','AI vs ML vs Deep Learning|Supervised Learning|Unsupervised Learning|Problem Formulation','Turn three product ideas into well-defined inputs, outputs, and learning objectives.'),
    module('Mathematics for Models','Vectors & Matrices|Probability|Statistics & Distributions|Derivatives & Gradients','Compute a small prediction by hand and explain what a gradient update changes.'),
    module('Data Preparation','Data Cleaning|Feature Engineering|Train-Validation-Test Splits|Data Leakage','Prepare a small tabular dataset with a split that prevents future information leaking into training.'),
    module('Classical Machine Learning','Linear Regression|Logistic Regression|Decision Trees|Clustering','Compare a simple baseline and a tree model on the same held-out examples.'),
    module('Evaluation & Generalization','Overfitting & Regularization|Cross-validation|Precision & Recall|Bias & Fairness','Choose metrics for an imbalanced classification task and inspect subgroup errors.'),
    module('Neural Networks','Perceptrons & Layers|Activation Functions|Backpropagation|Optimization & Learning Rates','Trace a tiny network and compare training curves under two learning rates.'),
    module('Language Models','Tokenization|Attention & Transformers|Pretraining & Adaptation|Prompting & Context','Compare prompts on a fixed set of examples and record unsupported or inconsistent answers.'),
    module('Responsible AI Applications','Model Serving|Monitoring & Drift|Privacy & Safety|Human Review','Prototype a small prediction service with a model card, error cases, and a human fallback.')
  ],
  rag:[
    module('RAG Foundations','RAG Architecture|LLM Context Windows|Knowledge Sources|Grounding & Limitations','Sketch a document question-answering system and separate retrieval errors from generation errors.'),
    module('Document Ingestion','PDF & HTML Parsing|Text Cleaning|Metadata & Document IDs|Incremental Ingestion','Turn a small document collection into clean records with stable IDs and source metadata.'),
    module('Chunking Strategies','Fixed-size Chunking|Recursive Chunking|Semantic Boundaries|Overlap & Chunk Metadata','Compare two chunk sizes on the same document and record where useful context is lost.'),
    module('Embeddings & Vector Space','Embeddings|Cosine Similarity|Embedding Model Selection|Batching & Caching','Embed five text passages and explain why the nearest passage may still be unhelpful.'),
    module('Indexing & Search','Vector Indexes|Approximate Nearest Neighbors|Metadata Filters|BM25 & Sparse Search','Index a small corpus and compare vector search with keyword retrieval on exact names.'),
    module('Retrieval Quality','Top-k Selection|Hybrid Retrieval|Query Rewriting|Reranking','Build a fixed query set and compare retrieved passages before and after reranking.'),
    module('Grounded Generation','Context Assembly|Prompt Templates|Citations|Abstention & Missing Evidence','Generate answers with source excerpts and decline questions unsupported by the corpus.'),
    module('Evaluate & Operate','Retrieval Metrics|Faithfulness Evaluation|Latency & Cost|Prompt Injection & Access Control','Deliver a PDF chatbot prototype with retrieval checks, failure examples, and document-access boundaries.')
  ]
};
