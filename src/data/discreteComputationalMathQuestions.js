const UNIT_BY_RANGE = [
  { max: 35, name: 'UNIT I - Logic and Propositional Calculus' },
  { max: 70, name: 'UNIT II - Ordered Sets and Lattices' },
  { max: 105, name: 'UNIT III - Techniques of Counting' },
  { max: 139, name: 'UNIT IV - Linear Algebra I' },
  { max: 169, name: 'UNIT V - Linear Algebra II' },
  { max: 201, name: 'UNIT VI - Probability' },
];

const rawDiscreteComputationalMathQuestions = String.raw`
Q1. A proposition is a statement that:
A) Can be a question
B) Is either true or false but not both
C) Always evaluates to true
D) Contains a variable
Answer: B
Explanation: A proposition is a declarative statement with a definite truth value - either true or false.
Q2. Which of the following is NOT a proposition?
A) 2 + 2 = 4
B) Close the door.
C) The sky is blue.
D) Delhi is in India.
Answer: B
Explanation: Commands and questions are not propositions since they have no truth value.
Q3. The negation of 'It is raining' is:
A) It is sunny
B) It is not raining
C) It was raining
D) It will rain
Answer: B
Explanation: Negation reverses the truth value of the original proposition.
Q4. The conjunction p AND q is true when:
A) At least one of p, q is true
B) Both p and q are true
C) p is true and q is false
D) Both p and q are false
Answer: B
Explanation: Conjunction is true only when both operands are true.
Q5. The disjunction p OR q is false when:
A) Both p and q are true
B) p is true and q is false
C) Both p and q are false
D) p is false and q is true
Answer: C
Explanation: Disjunction is false only when both operands are false.
Q6. A tautology is a proposition that is:
A) Always false
B) Sometimes true
C) Always true
D) Neither true nor false
Answer: C
Explanation: A tautology is true for every possible assignment of its variables.
Q7. A contradiction is a proposition that is:
A) Always true
B) Always false
C) Conditionally true
D) True for some values
Answer: B
Explanation: A contradiction is false for every possible truth value assignment.
Q8. p to q (if p then q) is false only when:
A) p is false and q is true
B) p is true and q is true
C) p is true and q is false
D) p is false and q is false
Answer: C
Explanation: A conditional is false only when the hypothesis is true and the conclusion is false.
Q9. The biconditional p iff q is true when:
A) p and q have opposite truth values
B) p and q have the same truth value
C) p is true regardless of q
D) q is false regardless of p
Answer: B
Explanation: p iff q is true precisely when both sides share the same truth value.
Q10. Which law states p v (q ^ r) = (p v q) ^ (p v r)?
A) Associative Law
B) De Morgan's Law
C) Distributive Law
D) Absorption Law
Answer: C
Explanation: The Distributive Law allows OR to distribute over AND and vice versa.
Q11. De Morgan's Law states ~(p ^ q) is equivalent to:
A) ~p ^ ~q
B) ~p v ~q
C) p v q
D) p ^ q
Answer: B
Explanation: The negation of a conjunction equals the disjunction of the negations.
Q12. De Morgan's Law states ~(p v q) is equivalent to:
A) ~p v ~q
B) ~p ^ ~q
C) p ^ q
D) p v q
Answer: B
Explanation: The negation of a disjunction equals the conjunction of the negations.
Q13. The converse of p to q is:
A) ~p to ~q
B) q to p
C) ~q to ~p
D) q to ~p
Answer: B
Explanation: The converse swaps the hypothesis and conclusion.
Q14. The contrapositive of p to q is:
A) q to p
B) ~p to ~q
C) ~q to ~p
D) p to ~q
Answer: C
Explanation: The contrapositive ~q to ~p is logically equivalent to p to q.
Q15. The inverse of p to q is:
A) q to p
B) ~q to ~p
C) ~p to ~q
D) ~p to q
Answer: C
Explanation: The inverse negates both hypothesis and conclusion.
Q16. p ^ (p to q) gives q - this is known as:
A) Addition
B) Modus Ponens
C) Modus Tollens
D) Hypothetical Syllogism
Answer: B
Explanation: Modus Ponens says if p is true and p implies q, then q is true.
Q17. ~q ^ (p to q) gives ~p - this is known as:
A) Modus Ponens
B) Addition
C) Modus Tollens
D) Disjunctive Syllogism
Answer: C
Explanation: Modus Tollens says if q is false and p implies q, then p is false.
Q18. A propositional function P(x) becomes a proposition when:
A) x is replaced by a specific value
B) x remains a variable
C) It is negated
D) It is always true
Answer: A
Explanation: Substituting a specific value for x turns a propositional function into a proposition.
Q19. The universal quantifier for-all x P(x) means:
A) There exists some x such that P(x) is true
B) P(x) is true for all values of x
C) P(x) is false for all x
D) P(x) is true for one x
Answer: B
Explanation: for-all x P(x) asserts that P(x) holds for every element in the domain.
Q20. The existential quantifier there-exists x P(x) means:
A) P(x) is true for all x
B) There is at least one x for which P(x) is true
C) P(x) is false for all x
D) P(x) is sometimes undefined
Answer: B
Explanation: there-exists x P(x) asserts that at least one element satisfies P(x).
Q21. The negation of 'for all x P(x)' is:
A) for-all x ~P(x)
B) there-exists x ~P(x)
C) ~for-all x P(x) = for-all x P(x)
D) there-exists x P(x)
Answer: B
Explanation: Negating a universal quantifier yields an existential quantifier with a negated predicate.
Q22. The negation of 'there-exists x P(x)' is:
A) there-exists x ~P(x)
B) for-all x P(x)
C) for-all x ~P(x)
D) ~there-exists x ~P(x)
Answer: C
Explanation: Negating an existential quantifier yields a universal quantifier with a negated predicate.
Q23. Which of the following is a logically equivalent form of p to q?
A) p ^ ~q
B) ~p v q
C) ~q v p
D) p v q
Answer: B
Explanation: p to q is equivalent to ~p v q.
Q24. The absorption law states:
A) p v (p ^ q) = p
B) p v (p ^ q) = q
C) p ^ (p v q) = q
D) p v p = F
Answer: A
Explanation: Absorption eliminates redundant terms.
Q25. The identity law for OR states:
A) p v T = T
B) p v F = p
C) p v F = F
D) p v T = F
Answer: B
Explanation: OR identity is p v F = p.
Q26. The complement law states:
A) p ^ ~p = T
B) p v ~p = T
C) p ^ ~p = p
D) p v ~p = F
Answer: B
Explanation: p v ~p is always true.
Q27. Which connective is represented by the symbol ^?
A) OR
B) NOT
C) AND
D) IMPLIES
Answer: C
Explanation: ^ represents logical conjunction.
Q28. Which connective is represented by the symbol v?
A) AND
B) OR
C) NOT
D) IF AND ONLY IF
Answer: B
Explanation: v represents logical disjunction.
Q29. In a truth table for n variables, the number of rows is:
A) n
B) n^2
C) 2^n
D) 2n
Answer: C
Explanation: n binary variables have 2^n possible truth assignments.
Q30. Two propositions are logically equivalent if:
A) They have the same number of variables
B) They have identical truth tables
C) One implies the other
D) They are both tautologies
Answer: B
Explanation: Logical equivalence means identical truth values for all assignments.
Q31. The idempotent law states:
A) p ^ p = F
B) p ^ p = p
C) p v p = F
D) p v ~p = T
Answer: B
Explanation: Idempotent laws include p ^ p = p and p v p = p.
Q32. Which of the following is a valid argument form?
A) p to q, q, therefore p
B) p to q, p, therefore q
C) p to q, ~p, therefore ~q
D) p to q, q, therefore ~p
Answer: B
Explanation: This is Modus Ponens.
Q33. An argument is valid if:
A) All premises are true
B) The conclusion is always true
C) Whenever all premises are true, the conclusion is also true
D) The conclusion follows from one premise
Answer: C
Explanation: Validity means the conclusion necessarily follows from true premises.
Q34. p v (q v r) = (p v q) v r is the:
A) Commutative Law
B) Distributive Law
C) Associative Law
D) Absorption Law
Answer: C
Explanation: Associative Law allows regrouping.
Q35. The commutative law for AND states:
A) p ^ q = q ^ p
B) p ^ q = p v q
C) p ^ (q v r) = (p ^ q) v r
D) p ^ T = p
Answer: A
Explanation: Commutative Law says the order of operands does not affect the result.
Q36. A relation R on set A is reflexive if:
A) aRb implies bRa
B) aRa for all a in A
C) aRb and bRc implies aRc
D) No element is related to itself
Answer: B
Explanation: Reflexivity requires every element to be related to itself.
Q37. A relation is symmetric if:
A) aRa for all a
B) aRb implies bRa
C) aRb and bRc implies aRc
D) aRb implies a = b
Answer: B
Explanation: Symmetry means if a is related to b, then b is related to a.
Q38. A relation is transitive if:
A) aRa for all a
B) aRb implies bRa
C) aRb and bRc implies aRc
D) aRb implies a != b
Answer: C
Explanation: Transitivity means aRb and bRc imply aRc.
Q39. An equivalence relation is one that is:
A) Reflexive only
B) Reflexive, symmetric, and transitive
C) Symmetric and transitive only
D) Reflexive and symmetric only
Answer: B
Explanation: Equivalence relations are reflexive, symmetric, and transitive.
Q40. A partial order relation is:
A) Reflexive, symmetric, transitive
B) Reflexive, antisymmetric, transitive
C) Symmetric and transitive only
D) Antisymmetric only
Answer: B
Explanation: Partial orders are reflexive, antisymmetric, and transitive.
Q41. A relation is antisymmetric if:
A) aRb implies bRa
B) aRb and bRa implies a = b
C) aRb implies a != b
D) No element relates to another
Answer: B
Explanation: Antisymmetry means aRb and bRa imply a = b.
Q42. A Hasse diagram is used to represent:
A) Functions
B) Partially ordered sets
C) Equivalence classes
D) Truth tables
Answer: B
Explanation: Hasse diagrams represent covering relations of a POSET.
Q43. In a Hasse diagram, an element a covers element b if:
A) a = b
B) a > b and no element c satisfies b < c < a
C) a > b
D) a and b are incomparable
Answer: B
Explanation: Covering means directly above with no intermediate element.
Q44. A totally ordered set (chain) is a POSET where:
A) No two elements are comparable
B) Every pair of elements is comparable
C) Only some pairs are comparable
D) There is a minimum element
Answer: B
Explanation: A chain has every pair comparable.
Q45. A well-ordered set is a totally ordered set where:
A) Every subset has a maximum element
B) Every nonempty subset has a minimum element
C) The set is finite
D) Every element has a successor
Answer: B
Explanation: In a well-ordered set every nonempty subset has a least element.
Q46. A lattice is a POSET in which every pair of elements has:
A) A maximum and minimum
B) A least upper bound (join) and greatest lower bound (meet)
C) Only a join
D) Only a meet
Answer: B
Explanation: A lattice requires join and meet for every pair.
Q47. The join (least upper bound) of two elements a and b is denoted:
A) a ^ b
B) a v b
C) a intersect b
D) a union b
Answer: B
Explanation: a v b denotes join.
Q48. The meet (greatest lower bound) of two elements a and b is denoted:
A) a v b
B) a ^ b
C) a + b
D) a * b
Answer: B
Explanation: a ^ b denotes meet.
Q49. A bounded lattice has:
A) Infinitely many elements
B) A greatest element (1) and a least element (0)
C) Only a greatest element
D) Only a least element
Answer: B
Explanation: A bounded lattice has both top and bottom elements.
Q50. A distributive lattice satisfies:
A) a ^ (b v c) = (a ^ b) v (a ^ c)
B) a v (b ^ c) = (a v b) ^ c
C) a ^ b = a v b for all a, b
D) Every element has a complement
Answer: A
Explanation: In a distributive lattice, meet distributes over join and join over meet.
Q51. Boolean algebra is a:
A) Simple lattice
B) Complemented distributive lattice
C) Partially ordered set only
D) Totally ordered set
Answer: B
Explanation: Boolean algebra is a bounded, complemented, distributive lattice.
Q52. In Boolean algebra, the complement of element a satisfies:
A) a ^ a' = 1 and a v a' = 0
B) a ^ a' = 0 and a v a' = 1
C) a ^ a' = a
D) a v a' = a
Answer: B
Explanation: A complement satisfies meet equals 0 and join equals 1.
Q53. The duality principle in Boolean algebra states:
A) Every theorem has a dual obtained by swapping AND/OR and 0/1
B) Every element equals its complement
C) 0 = 1
D) All elements are self-dual
Answer: A
Explanation: Duality swaps meet/join and 0/1 in valid statements.
Q54. In Boolean algebra, a + a = ? (where + represents OR/join)
A) 0
B) a squared
C) a
D) 1
Answer: C
Explanation: Idempotent law: a v a = a.
Q55. Which of the following represents the identity element for AND in Boolean algebra?
A) 0
B) 1
C) a
D) a'
Answer: B
Explanation: The identity for AND is 1.
Q56. Which of the following represents the identity element for OR in Boolean algebra?
A) 1
B) 0
C) a
D) a'
Answer: B
Explanation: The identity for OR is 0.
Q57. In a POSET, two elements a and b are called incomparable if:
A) a = b
B) a <= b or b <= a
C) Neither a <= b nor b <= a
D) a <= b and b <= a
Answer: C
Explanation: Incomparable elements have no order relationship.
Q58. The power set of {a, b} ordered by inclusion forms a:
A) Group
B) Lattice
C) Ring
D) Field
Answer: B
Explanation: Power sets ordered by inclusion form distributive lattices.
Q59. A chain (totally ordered set) is a lattice because:
A) Every element has a complement
B) Every pair has both a join and a meet
C) It is distributive
D) It has a zero element
Answer: B
Explanation: In a chain, max is join and min is meet.
Q60. The set of divisors of 12 ordered by divisibility forms a:
A) Group
B) Partially ordered set
C) Equivalence relation
D) Chain
Answer: B
Explanation: Divisibility gives a partial order.
Q61. An upper bound of a subset S of a POSET is an element u such that:
A) u <= s for all s in S
B) s <= u for all s in S
C) u is in S
D) u = max(S)
Answer: B
Explanation: An upper bound u satisfies s <= u for every s in S.
Q62. The least upper bound (supremum) of S is:
A) Any upper bound of S
B) The smallest among all upper bounds of S
C) The largest element of S
D) The minimum of S
Answer: B
Explanation: Supremum is the smallest upper bound.
Q63. A lattice is said to be complete if:
A) It has finitely many elements
B) Every nonempty subset has both a join and a meet
C) It is distributive
D) It is bounded
Answer: B
Explanation: A complete lattice has joins and meets for every subset.
Q64. The relation 'divides' on positive integers is:
A) An equivalence relation
B) A partial order
C) A total order
D) Not a relation
Answer: B
Explanation: Divisibility is reflexive, antisymmetric, and transitive.
Q65. In Boolean algebra, De Morgan's theorem states (a AND b)' equals:
A) a' AND b'
B) a' OR b'
C) a OR b
D) a AND b
Answer: B
Explanation: Complement of AND equals OR of complements.
Q66. The absorption law in a lattice states:
A) a v (a ^ b) = a
B) a v (a ^ b) = b
C) a ^ (a v b) = b
D) a v a = 0
Answer: A
Explanation: Absorption includes a v (a ^ b) = a.
Q67. A Boolean algebra must satisfy all of the following EXCEPT:
A) Distributive law
B) Complement law
C) Identity law
D) Associativity for multiplication of real numbers
Answer: D
Explanation: Real number multiplication associativity is not a Boolean algebra axiom.
Q68. Which of the following sets with the given relation forms a POSET?
A) Integers with <
B) Natural numbers with divides
C) Reals with not-equal
D) Integers with absolute value
Answer: B
Explanation: Natural numbers under divisibility form a POSET.
Q69. The maximal element of a POSET is an element m such that:
A) m <= x for all x
B) No element x satisfies m < x
C) m is the unique greatest element
D) m is comparable to all elements
Answer: B
Explanation: A maximal element has nothing strictly above it.
Q70. In a lattice, the commutative law for join states:
A) a v b = b ^ a
B) a v b = b v a
C) a v b = a ^ b
D) a v b = a
Answer: B
Explanation: Join is commutative in any lattice.
`;

function getUnitName(id) {
  return UNIT_BY_RANGE.find((unit) => id <= unit.max)?.name ?? 'MTH404 - Discrete and Computational Mathematics';
}

function parseQuestions(rawQuestions) {
  const questionPattern =
    /Q(\d+)\.\s*([\s\S]*?)\nA\)\s*([\s\S]*?)\nB\)\s*([\s\S]*?)\nC\)\s*([\s\S]*?)\nD\)\s*([\s\S]*?)\nAnswer:\s*([A-D])\s*\nExplanation:\s*([\s\S]*?)(?=\nQ\d+\.|\s*$)/g;

  return Array.from(rawQuestions.matchAll(questionPattern), (match) => {
    const id = Number(match[1]);
    return {
      id,
      unit: getUnitName(id),
      question: match[2].replace(/\s+/g, ' ').trim(),
      options: ['A', 'B', 'C', 'D'].map((label, index) => ({
        label,
        text: match[index + 3].replace(/\s+/g, ' ').trim(),
      })),
      answer: match[7],
      solution: match[8].replace(/\s+/g, ' ').trim(),
    };
  });
}

export const DISCRETE_COMPUTATIONAL_MATH_EXPECTED_COUNT = 70;

export const discreteComputationalMathQuestions = parseQuestions(rawDiscreteComputationalMathQuestions);
