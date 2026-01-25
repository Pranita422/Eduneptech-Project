const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const AptitudeQuestion = require("./models/AptitudeQuestion");

dotenv.config({ path: path.join(__dirname, ".env") });

const questions = [
    // --- Quantitative (20 Questions) ---
    { category: "Quantitative", question: "What is 25% of 200?", options: ["25", "50", "75", "100"], correctAnswer: "50", explanation: "25% of 200 = (25/100) * 200 = 50", difficulty: "Easy" },
    { category: "Quantitative", question: "If x + 5 = 10, what is x?", options: ["2", "5", "10", "15"], correctAnswer: "5", explanation: "x = 10 - 5 = 5", difficulty: "Easy" },
    { category: "Quantitative", question: "The average of 5, 10, 15 is?", options: ["5", "10", "15", "20"], correctAnswer: "10", explanation: "(5+10+15)/3 = 10", difficulty: "Easy" },
    { category: "Quantitative", question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12", explanation: "12 * 12 = 144", difficulty: "Easy" },
    { category: "Quantitative", question: "If a car travels 60 km in 1 hour, what is its speed?", options: ["30 km/h", "60 km/h", "90 km/h", "120 km/h"], correctAnswer: "60 km/h", explanation: "Speed = Distance / Time", difficulty: "Easy" },
    { category: "Quantitative", question: "Solve: 2 + 2 * 2", options: ["6", "8", "4", "2"], correctAnswer: "6", explanation: "BODMAS: 2 + (2*2) = 6", difficulty: "Easy" },
    { category: "Quantitative", question: "What is 10 cubed?", options: ["100", "1000", "10000", "30"], correctAnswer: "1000", explanation: "10 * 10 * 10 = 1000", difficulty: "Easy" },
    { category: "Quantitative", question: "Simplified value of (3/4) + (1/4)", options: ["1", "1/2", "3/4", "2"], correctAnswer: "1", explanation: "4/4 = 1", difficulty: "Easy" },
    { category: "Quantitative", question: "If 5x = 20, then x = ?", options: ["2", "4", "5", "10"], correctAnswer: "4", explanation: "20 / 5 = 4", difficulty: "Easy" },
    { category: "Quantitative", question: "Which is a prime number?", options: ["4", "9", "11", "15"], correctAnswer: "11", explanation: "11 has no divisors other than 1 and itself.", difficulty: "Medium" },
    { category: "Quantitative", question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres", "180 metres", "324 metres", "150 metres"], correctAnswer: "150 metres", explanation: "Speed = 60*(5/18) m/sec = 50/3 m/sec. Distance = (50/3) * 9 = 150m.", difficulty: "Medium" },
    { category: "Quantitative", question: "The ratio of width to length of a rectangle is 2:3. If length is 15cm, what is width?", options: ["8cm", "10cm", "12cm", "9cm"], correctAnswer: "10cm", explanation: "2/3 = w/15 => w = 10", difficulty: "Medium" },
    { category: "Quantitative", question: "A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had?", options: ["588 apples", "600 apples", "672 apples", "700 apples"], correctAnswer: "700 apples", explanation: "60% of x = 420 => x = 700", difficulty: "Medium" },
    { category: "Quantitative", question: "What percentage of numbers from 1 to 70 have 1 or 9 in the unit's digit?", options: ["1", "14", "20", "21"], correctAnswer: "20", explanation: "1,9,11,19,21,29,31,39,41,49,51,59,61,69. Total 14. 14/70 * 100 = 20%", difficulty: "Medium" },
    { category: "Quantitative", question: "If log 27 = 1.431, then the value of log 9 is:", options: ["0.934", "0.945", "0.954", "0.958"], correctAnswer: "0.954", explanation: "log 27 = 3 log 3 = 1.431 => log 3 = 0.477. log 9 = 2 log 3 = 0.954", difficulty: "Hard" },
    { category: "Quantitative", question: "Find the H.C.F. of 2/3, 8/9, 64/81 and 10/27.", options: ["2/3", "2/81", "160/3", "160/81"], correctAnswer: "2/81", explanation: "HCF of fractions = HCF of numerators / LCM of denominators = HCF(2,8,64,10) / LCM(3,9,81,27) = 2/81", difficulty: "Hard" },
    { category: "Quantitative", question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:", options: ["1/4", "1/10", "7/15", "8/15"], correctAnswer: "8/15", explanation: "Work in 1 day = 1/15 + 1/20 = 7/60. In 4 days = 28/60 = 7/15. Remaining = 1 - 7/15 = 8/15", difficulty: "Medium" },
    { category: "Quantitative", question: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?", options: ["3/4", "4/7", "1/8", "3/7"], correctAnswer: "4/7", explanation: "Total balls = 14. White = 8. Prob = 8/14 = 4/7", difficulty: "Medium" },
    { category: "Quantitative", question: "If 20% of a = b, then b% of 20 is the same as:", options: ["4% of a", "5% of a", "20% of a", "None of these"], correctAnswer: "4% of a", explanation: "20% of a = b => b = 0.2a. b% of 20 = (0.2a/100) * 20 = 0.04a = 4% of a", difficulty: "Medium" },
    { category: "Quantitative", question: "The sum of ages of 5 children born at intervals of 3 years each is 50 years. What is the age of the youngest child?", options: ["4 years", "8 years", "10 years", "None of these"], correctAnswer: "4 years", explanation: "x + (x+3) + (x+6) + (x+9) + (x+12) = 50 => 5x + 30 = 50 => 5x = 20 => x=4", difficulty: "Medium" },

    // --- Logical Reasoning (20 Questions) ---
    { category: "Logical Reasoning", question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"], correctAnswer: "(1/8)", explanation: "Halving series.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "SCD, TEF, UGH, ____, WKL", options: ["CMN", "UJI", "VIJ", "IJT"], correctAnswer: "VIJ", explanation: "+1, +2, +3 pattern.", difficulty: "Hard" },
    { category: "Logical Reasoning", question: "Which word does NOT belong with the others?", options: ["Index", "Glossary", "Chapter", "Book"], correctAnswer: "Book", explanation: "Book is the whole, others are parts.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Safe : Secure :: Protect : ?", options: ["Lock", "Guard", "Sure", "Conserve"], correctAnswer: "Guard", explanation: "Synonyms relationship.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Melt : Liquid :: Freeze : ?", options: ["Ice", "Solid", "Condense", "Push"], correctAnswer: "Solid", explanation: "Change of state.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Find the odd one out.", options: ["Cumin", "Groundnut", "Pepper", "Chili"], correctAnswer: "Groundnut", explanation: "Groundnut is a legume/oilseed, others are spices.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", options: ["His own", "His Son", "His Father", "His Nephew"], correctAnswer: "His Son", explanation: "My father's son is me. 'That man's father is me'. So that man is my son.", difficulty: "Hard" },
    { category: "Logical Reasoning", question: "Statement: All windows are doors. No door is a wall. Conclusion: No window is a wall.", options: ["Follows", "Does not follow", "Maybe", "None"], correctAnswer: "Follows", explanation: "Standard syllogism.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "2, 6, 12, 20, 30, 42, ?", options: ["56", "54", "50", "62"], correctAnswer: "56", explanation: "n(n+1) pattern or +4, +6, +8, +10, +12, +14.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "Flow : River :: Stagnant : ?", options: ["Rain", "Stream", "Pool", "Canal"], correctAnswer: "Pool", explanation: "River water flows, Pool water is stagnant.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Paw : Cat :: Hoof : ?", options: ["Lamb", "Horse", "Elephant", "Tiger"], correctAnswer: "Horse", explanation: "Foot type.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Ornithologist : Bird :: Archeologist : ?", options: ["Islands", "Mediators", "Archeology", "Artifacts"], correctAnswer: "Artifacts", explanation: "Study subject.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", options: ["7", "10", "12", "13"], correctAnswer: "10", explanation: "Alternating series +3, -2.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "If CUP = 40, then KITE = ?", options: ["10", "20", "30", "45"], correctAnswer: "45", explanation: "Sum of alphabetical positions. K=11, I=9, T=20, E=5. Sum = 45.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?", options: ["Grandmother", "Grandfather", "Daughter", "Granddaughter"], correctAnswer: "Granddaughter", explanation: "A is daughter of C, C is daughter of D. So A is Granddaughter.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "Which number replaces the question mark? 3, 5, 8, 13, 21, ?", options: ["24", "30", "34", "31"], correctAnswer: "34", explanation: "Fibonacci sequence.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "Blueberry, Strawberry, Blackberry, ?", options: ["Apple", "Banana", "Grape", "Cranberry"], correctAnswer: "Cranberry", explanation: "All serve as berries.", difficulty: "Easy" },
    { category: "Logical Reasoning", question: "An informal gathering occurs when a group of people get together in a casual, relaxed manner. Which situation is the best example of an informal gathering?", options: ["A debating club meeting", "An impromptu religious service", "A scheduled tea party", "A neighborhood barbecue"], correctAnswer: "A neighborhood barbecue", explanation: "Casual and relaxed.", difficulty: "Medium" },
    { category: "Logical Reasoning", question: "If it is raining, the grass is wet. The grass is wet. Therefore, it is raining.", options: ["True", "False", "Uncertain", "None"], correctAnswer: "Uncertain", explanation: "Logical fallacy (affirming the consequent). Grass could be wet from sprinklers.", difficulty: "Hard" },
    { category: "Logical Reasoning", question: "Odometer is to mileage as compass is to:", options: ["Speed", "Hiking", "Needle", "Direction"], correctAnswer: "Direction", explanation: "Instrument function.", difficulty: "Easy" },

    // --- Verbal Ability (20 Questions) ---
    { category: "Verbal Ability", question: "Synonym of 'Happy'?", options: ["Sad", "Joyful", "Angry", "Bored"], correctAnswer: "Joyful", explanation: "Feeling or showing pleasure.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Antonym of 'Advance'?", options: ["Progress", "Retreat", "Move", "Circle"], correctAnswer: "Retreat", explanation: "Move back vs move forward.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "Synonym of 'Candid'", options: ["Deceptive", "Frank", "Secretive", "Shy"], correctAnswer: "Frank", explanation: "Truthful and straightforward.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "Antonym of 'Flexible'", options: ["Rigid", "Elastic", "Soft", "Movable"], correctAnswer: "Rigid", explanation: "Unable to bend.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "To 'let the cat out of the bag' means:", options: ["To liberate a pet", "To reveal a secret", "To make a mistake", "To create a mess"], correctAnswer: "To reveal a secret", explanation: "Idiom.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Which spelling is correct?", options: ["Recieve", "Receive", "Receve", "Riceive"], correctAnswer: "Receive", explanation: "'i' before 'e' except after 'c'.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "The study of ancient societies is called:", options: ["Anthropology", "Archaeology", "History", "Ethnology"], correctAnswer: "Archaeology", explanation: "Study of human history via artifacts.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "A person who does not believe in God is an:", options: ["Theist", "Heretic", "Atheist", "Fanatic"], correctAnswer: "Atheist", explanation: "Definition of term.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Choose the correct preposition: She is good ___ mathematics.", options: ["in", "at", "on", "with"], correctAnswer: "at", explanation: "Good at something.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "One who knows everything:", options: ["Omnipresent", "Omnipotent", "Omniscient", "Omnivorous"], correctAnswer: "Omniscient", explanation: "'Sci' relates to knowledge/science.", difficulty: "Hard" },
    { category: "Verbal Ability", question: "Synonym of 'Benevolent'", options: ["Cruel", "Kind", "Poor", "Rich"], correctAnswer: "Kind", explanation: "Well meaning and kindly.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "Antonym of 'Artificial'", options: ["Red", "Solid", "Truthful", "Natural"], correctAnswer: "Natural", explanation: "Opposite of man-made.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Idiom: 'Once in a blue moon'", options: ["Every month", "Always", "Rarely", "Never"], correctAnswer: "Rarely", explanation: "Very infrequent event.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Find a word closest in meaning to 'Diverse'", options: ["Same", "Varied", "Uniform", "Single"], correctAnswer: "Varied", explanation: "Showing a great deal of variety.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Correct sentence:", options: ["He don't like coffee.", "He doesn't like coffee.", "He no like coffee.", "He not like coffee."], correctAnswer: "He doesn't like coffee.", explanation: "Subject-verb agreement.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "A room where artists work:", options: ["Studio", "Hospital", "Gym", "Stadium"], correctAnswer: "Studio", explanation: "Workplace of artist.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Extreme fear of confined spaces:", options: ["Agoraphobia", "Claustrophobia", "Hydrophobia", "Acrophobia"], correctAnswer: "Claustrophobia", explanation: "Fear of closed spaces.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "Synonym of 'Abundant'", options: ["Scarce", "Plentiful", "Rare", "Few"], correctAnswer: "Plentiful", explanation: "Existing in large quantities.", difficulty: "Medium" },
    { category: "Verbal Ability", question: "Past tense of 'Run'", options: ["Runned", "Running", "Ran", "Runs"], correctAnswer: "Ran", explanation: "Irregular verb.", difficulty: "Easy" },
    { category: "Verbal Ability", question: "Plural of 'Child'", options: ["Childs", "Childrens", "Children", "Childes"], correctAnswer: "Children", explanation: "Irregular plural.", difficulty: "Easy" }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Seeding Aptitude Questions...");

        await AptitudeQuestion.deleteMany({});
        await AptitudeQuestion.insertMany(questions);

        console.log(`Seeded ${questions.length} aptitude questions.`);
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
