// Original demo outlines. Each row is a chapter, four concepts, and a practical outcome.
const outlines = {
  electronics: `Circuit Foundations;Voltage|Current|Resistance|Ohm's Law;Calculate the resistor needed for a low-voltage LED circuit
Reading Circuits;Schematic Symbols|Series Circuits|Parallel Circuits|Breadboard Rails;Draw and label a battery-powered LED circuit before assembling it
Passive Components;Resistors|Capacitors|Inductors|RC Timing;Compare the charge curves of two simulated RC circuits
Semiconductors;Diodes|LED Polarity|Transistors|MOSFET Switching;Simulate a transistor switching an LED with a current-limiting resistor
Measurement;Multimeter Modes|Continuity|Voltage Measurement|Measurement Uncertainty;Record expected and measured voltages at three circuit points
Signals;Analog Signals|Digital Levels|Pull-up Resistors|Switch Debouncing;Compare a noisy switch trace with its debounced output
Power & Protection;Regulators|Current Budgets|Decoupling|Logic-level Compatibility;Check the voltage and current requirements of a low-voltage prototype
Circuit Notebook;Wiring Diagrams|Component Lists|Fault Isolation|Circuit Documentation;Document a tested low-voltage circuit and one fault you corrected`,
  esp32: `Meet Your Board;ESP32 Variants|Board Pinouts|3.3V Logic|USB Power;Identify your exact board and annotate its usable pins from its documentation
First Firmware;Toolchain Setup|Serial Monitor|Build & Flash|Boot Modes;Flash a board-compatible blink example and save its serial log
GPIO Workshop;Digital Input|Digital Output|Internal Pull-ups|Debouncing;Read a button and control an LED without blocking delays
Analog & Timing;ADC Sampling|PWM Output|Timers|Calibration;Record a potentiometer reading and map it to LED brightness
Peripheral Buses;I2C Devices|SPI Devices|UART Messages|Bus Debugging;Read one compatible sensor and annotate its bus transactions
Connected Device;Wi-Fi Provisioning|HTTP Client|MQTT Client|Reconnect Logic;Publish a mock sensor reading and demonstrate reconnect handling
Audio Extension;I2S Audio|Microphone Input|Speaker Output|Audio Buffers;Trace a board-compatible audio example from microphone to output
ESP32 Project;Task Scheduling|Power Budget|Error Logging|Device Integration;Build a documented sensor monitor with a simulated disconnected-sensor case`,
  sensors: `Sensor Basics;Transducers|Measurement Range|Resolution|Accuracy;Compare two sensor datasheets for a room-monitoring use case
Safe Connections;Supply Voltage|Signal Voltage|Ground Reference|Pin Mapping;Draw the connections for a sensor compatible with a 3.3V controller
Environment;Temperature Sensors|Humidity Sensors|Light Sensors|Sampling Intervals;Collect or simulate room readings and label their units
Motion & Distance;Accelerometers|Gyroscopes|Distance Sensors|Coordinate Frames;Plot a short motion or distance sequence and explain the axes
Signal Quality;Noise Sources|Moving Averages|Outlier Handling|Missing Readings;Compare raw readings with a moving-average filter
Calibration;Reference Measurements|Offset Error|Scale Error|Calibration Records;Fit a simple calibration from reference readings and preserve the raw data
Sensor Fusion;Time Alignment|Thresholds|Hysteresis|Event Detection;Combine two simulated signals into a room-occupancy indicator
Sensor Station;Data Logging|Device Health|Dashboard Charts|Repeatability;Create a sensor report with plots and a repeatability check`,
  iot: `Connected Systems;Devices & Gateways|Telemetry|Commands|System Boundaries;Sketch a room-monitoring system from sensor to dashboard
Network Foundations;IP Addresses|DNS|Wi-Fi Networks|Connection Failures;Trace the route of one telemetry message and mark possible failures
Messaging;MQTT Topics|Publish & Subscribe|QoS Choices|Retained Messages;Design a topic tree for three simulated devices
Web Integration;HTTP Methods|JSON Payloads|API Contracts|Timestamps;Write example request and response payloads for a device API
Device Reliability;Offline Queues|Retries & Backoff|Idempotency|Health Checks;Simulate an outage and explain how queued readings recover
Access & Privacy;Device Identity|TLS Concepts|Secret Storage|Data Minimization;Review a mock device configuration for exposed credentials
Automation Extension;Rules & Triggers|Alert Thresholds|Command Acknowledgment|Manual Override;Design a reversible lighting rule with a manual override
IoT Dashboard;Time-series Data|Fleet Status|Observability|End-to-end Testing;Present a mock device dashboard with healthy and disconnected states`,
  xiaozhi: `Voice Assistant Map;Xiaozhi Architecture|Supported Boards|Firmware Releases|Audio Pipeline;Map the components of a Xiaozhi voice assistant using the project documentation
Hardware Preparation;Board Compatibility|Microphone Interface|Speaker Amplifier|Power Requirements;Create a board-specific parts and wiring checklist from the official examples
Firmware Setup;Prebuilt Firmware|Build Configuration|Flashing Workflow|Serial Diagnostics;Document a board-compatible firmware setup and expected boot messages
Network & Service;Wi-Fi Setup|Device Activation|Service Configuration|Connection Diagnostics;Trace a simulated connection and activation sequence
Conversation Loop;Wake Interaction|Audio Capture|Speech Recognition|Speech Playback;Storyboard a complete voice turn including an interrupted response
Device Tools;MCP Concepts|Tool Schemas|Device Commands|Tool Results;Draft a read-only temperature tool and its example result
Experience Extension;Display States|Button Interaction|Latency Feedback|Privacy Indicators;Design visible listening and speaking states for the assistant
Assistant Showcase;Hardware Checklist|Failure Scenarios|Demo Script|Project Documentation;Present a mock voice assistant walkthrough with one recoverable failure`,
  psychology: `Studying Behavior;Research Questions|Scientific Evidence|Correlation & Causation|Research Ethics;Compare an everyday psychology claim with the evidence needed to test it
Mind & Brain;Neurons|Nervous System|Sensation|Perception;Illustrate how sensation and interpretation differ in an everyday example
Learning;Classical Conditioning|Operant Conditioning|Observational Learning|Reinforcement;Describe three learning examples without making a clinical judgment
Memory & Attention;Working Memory|Long-term Memory|Retrieval Practice|Selective Attention;Compare two study methods using a short personal learning log
Motivation & Emotion;Intrinsic Motivation|Extrinsic Motivation|Emotion Recognition|Emotion Regulation;Reflect on the context and incentives behind one everyday decision
Social Psychology;Social Influence|Attribution|Group Behavior|Perspective Taking;Analyze a fictional group disagreement from two perspectives
Development Extension;Lifespan Development|Individual Differences|Personality Models|Cultural Context;Compare two explanations of a fictional behavior and note their limits
Psychology Portfolio;Evaluating Claims|Study Design|Bias Awareness|Reflective Writing;Write a source-based explanation of a learning habit with limitations`,
  thinking: `Clear Questions;Problem Framing|Definitions|Assumptions|Scope;Rewrite an ambiguous question into a testable one
Arguments;Claims|Premises|Conclusions|Hidden Assumptions;Map the premises and conclusion of a short argument
Evidence;Primary Sources|Source Credibility|Sample Quality|Missing Evidence;Compare two sources supporting the same claim
Reasoning;Deduction|Induction|Abduction|Counterexamples;Construct a counterexample to a broad everyday claim
Uncertainty;Base Rates|Probability Language|Confidence|Updating Beliefs;Revise a prediction after receiving new evidence
Biases;Confirmation Bias|Anchoring|Availability|Selection Bias;Identify a possible bias in a fictional decision
Decisions Extension;Trade-offs|Decision Criteria|Opportunity Cost|Reversibility;Compare three options using explicit decision criteria
Reasoning Portfolio;Steelman Arguments|Fact Checking|Decision Journal|Intellectual Humility;Write a balanced recommendation and what could change your mind`,
  communication: `Communication Basics;Audience|Intent|Context|Feedback;Rewrite a message for two different audiences
Listening;Active Listening|Paraphrasing|Clarifying Questions|Turn Taking;Practice summarizing a fictional speaker before responding
Clear Messages;Plain Language|Message Structure|Concrete Examples|Conciseness;Turn a long explanation into a clear three-part message
Conversations;Open Questions|Nonverbal Cues|Tone|Conversation Repair;Write a respectful way to clarify a misunderstanding
Feedback Skills;Observations|Impact Statements|Actionable Requests|Receiving Feedback;Draft feedback about a specific behavior and a next step
Disagreement;Shared Goals|Boundaries|Negotiation|De-escalation;Role-play a disagreement using a shared goal and clear request
Speaking Extension;Story Structure|Delivery|Visual Aids|Question Handling;Outline a two-minute talk with one supporting example
Communication Portfolio;Meeting Notes|Follow-up Messages|Presentation Practice|Self-review;Record or rehearse a short explanation and note one improvement`,
  english: `English Foundations;Sentence Patterns|Parts of Speech|Core Vocabulary|Pronunciation Awareness;Write and read aloud a short personal introduction
Everyday Grammar;Present Tenses|Past Tenses|Questions|Negation;Describe a usual day and a past event using complete sentences
Vocabulary Building;Collocations|Word Families|Context Clues|Spaced Review;Build a vocabulary set with original example sentences
Listening Skills;Main Ideas|Specific Details|Connected Speech|Note Taking;Summarize a short recording and verify details against its transcript
Reading Skills;Skimming|Scanning|Inference|Reference Words;Annotate the main point and supporting details in a short text
Speaking Skills;Fluency|Intelligibility|Paraphrasing|Conversation Strategies;Give a one-minute explanation and review its clarity
Writing Extension;Paragraph Unity|Linking Ideas|Editing|Register;Write and revise a paragraph for a specific audience
English Portfolio;Integrated Practice|Error Log|Self-recording|Study Planning;Assemble a reading summary and a short spoken response`,
  ielts: `IELTS Orientation;Academic Format|Four Skills|Band Descriptors|Baseline Reflection;Review the official format and list strengths and practice goals
Language Foundations;Academic Vocabulary|Grammar Range|Paraphrasing|Pronunciation Clarity;Rewrite a short paragraph using accurate paraphrases
Listening;Prediction|Distractors|Spelling Accuracy|Listening Notes;Complete an official sample section and classify your errors
Reading;Skimming & Scanning|Matching Headings|True False Not Given|Time Management;Practice two reading question types and explain answer evidence
Writing Task 1;Overview Statements|Chart Comparisons|Processes|Maps;Write an overview and supporting comparisons for a sample chart
Writing Task 2;Task Response|Essay Structure|Supporting Examples|Coherence;Plan and write an argument with a clear position and examples
Speaking Extension;Part 1 Answers|Part 2 Long Turn|Part 3 Discussion|Self-recording;Record a practice long turn and review it against public descriptors
Practice Review;Timed Sections|Error Analysis|Revision Priorities|Practice Schedule;Review a practice set and plan the next week without claiming an official band`,
  badminton: `Court & Equipment;Court Lines|Racket Grip|Ready Position|Warm-up;Identify court areas and rehearse a relaxed ready position
Movement Foundations;Split Step|Chasse Steps|Lunge Balance|Recovery Steps;Practice slow shadow footwork with controlled recovery
Serve & Return;Low Serve|High Serve|Receiving Stance|Return Placement;Record the landing zones of a short comfortable serving practice
Overhead Skills;Contact Point|Clear|Drop Shot|Follow-through;Rehearse an overhead action slowly and compare clear and drop intentions
Front & Midcourt;Net Shot|Lift|Drive|Defensive Block;Plan a cooperative rally alternating a net shot and a lift
Rally Decisions;Base Position|Shot Selection|Opponent Space|Recovery Timing;Annotate three rally decisions from a match clip
Doubles Extension;Attacking Formation|Defending Formation|Partner Communication|Rotation;Draw doubles positions for attack and defense
Practice Journal;Drill Planning|Controlled Repetition|Session Reflection|Progress Tracking;Create a manageable practice session and record placement and consistency`,
  fitness: `Movement Foundations;Activity Preferences|Comfortable Effort|Warm-up|Movement Awareness;Reflect on enjoyable activities and sketch a comfortable starting session
Movement Patterns;Squat Pattern|Hip Hinge|Push Pattern|Pull Pattern;Observe basic movement patterns in a beginner instructional demonstration
Aerobic Activity;Walking|Cycling|Talk Test|Pacing;Record the duration and perceived effort of a comfortable familiar activity
Strength Basics;Bodyweight Exercise|Technique Focus|Rest Between Sets|Gradual Progression;Create a simple practice log emphasizing technique and comfortable effort
Mobility;Range of Motion|Controlled Movement|Balance|Coordination;Note differences between balance and mobility tasks
Recovery;Rest Days|Sleep Routine|Fatigue Awareness|Consistency;Review a weekly activity diary and include recovery time
Sport Extension;Agility Concepts|Footwork Rhythm|Skill Practice|Session Variety;Combine an easy coordination drill with a sport skill practice
Activity Journal;Weekly Planning|Effort Logging|Habit Tracking|Plan Adjustment;Prepare a flexible weekly activity plan and reflect on how it felt`,
  habits: `Understand Habits;Context Cues|Repeated Actions|Immediate Rewards|Habit Loops;Describe the context and outcome of an existing everyday habit
Choose a Direction;Personal Values|Specific Goals|Small Actions|Realistic Scope;Translate a broad learning goal into a small daily action
Design the Environment;Visible Cues|Friction|Preparation|Distraction Control;Make one learning material easier to access and record the change
Start Small;Implementation Intentions|Habit Stacking|Minimum Practice|Starting Rituals;Write a when-and-where plan for a short practice session
Track Thoughtfully;Process Measures|Reflection Notes|Consistency Patterns|Flexible Tracking;Keep a brief practice log focused on actions rather than perfection
Handle Interruptions;Restart Plans|Changing Context|Self-compassion|Obstacle Planning;Write a restart plan for a missed practice day
Motivation Extension;Autonomy|Meaningful Rewards|Social Support|Enjoyment;Compare two ways to make a learning routine more enjoyable
Personal Routine;Weekly Review|Adjusting Goals|Sustainable Pace|Long-term Reflection;Build a flexible weekly routine and review what supported it`
};
const definitions = [
 ['electronics','Electronics','Understand the circuit','settings','#9b653a','https://www.allaboutcircuits.com/textbook/'],
 ['esp32','ESP32','Bring a device to life','code','#427d72','https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/'],
 ['sensors','Sensors & Circuits','Observe the physical world','chart','#47758b','https://learn.adafruit.com/'],
 ['iot','Internet of Things','Connect the physical and digital','tree','#4b735a','https://docs.espressif.com/projects/esp-idf/en/stable/esp32/'],
 ['xiaozhi','Xiaozhi Assistant','Give your device a voice','spark','#a75f47','https://github.com/78/xiaozhi-esp32'],
 ['psychology','Psychology','Explore mind and behavior','book','#906886','https://openstax.org/details/books/psychology-2e'],
 ['thinking','Critical Thinking','Ask better questions','compass','#567694','https://plato.stanford.edu/entries/critical-thinking/'],
 ['communication','Communication','Build shared understanding','book','#b17851','https://open.lib.umn.edu/communication/'],
 ['english','English','Discover another language','book','#65815e','https://learnenglish.britishcouncil.org/'],
 ['ielts','IELTS Academic','Practice with a purpose','flag','#a95750','https://ielts.org/take-a-test/preparation-resources'],
 ['badminton','Badminton','Move with intention','compass','#46827d','https://shuttletime.bwfbadminton.com/'],
 ['fitness','Physical Fitness','Build a rhythm of movement','leaf','#718951','https://www.cdc.gov/physical-activity-basics/'],
 ['habits','Habits & Motivation','Make room for small victories','flame','#a47c39','https://www.apa.org/topics/behavioral-health/healthy-habits']
];
export const BREADTH_TRACKS=definitions.map(([id,name,subtitle,icon,color,resource])=>({id,name,subtitle,icon,color,resource,goal:`Explore ${name}`,rank:'Explorer',description:subtitle,project:`Create your ${name} portfolio`,practice:`Record a practical observation about ${name}.`,explanation:`Explore ${name} through small activities, credible resources, and a reflective practice journal.`,modules:outlines[id].split('\n').map(row=>{const [title,topics,practice]=row.split(';');return {title,topics:topics.split('|'),practice:practice+'.',summary:`Explore ${topics.split('|').join(', ')}. ${practice}.`};})}));

export const CROSS_LINKS=[['python','ai'],['java','oop'],['js','iot'],['dsa','ai'],['ai','rag'],['electronics','esp32'],['esp32','sensors'],['sensors','iot'],['esp32','xiaozhi'],['xiaozhi','ai'],['psychology','habits'],['thinking','psychology'],['communication','english'],['english','ielts'],['badminton','fitness'],['habits','fitness']];
