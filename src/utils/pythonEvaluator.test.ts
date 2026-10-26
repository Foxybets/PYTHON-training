import test from 'node:test';
import assert from 'node:assert/strict';
import { tracePythonCode, evaluateExpression } from './pythonEvaluator.ts';
import { calculateExamGrade } from './examScorer.ts';

test('evaluateExpression handles comparison and logical operators', () => {
  const scope = { a: 15, b: 20, is_raining: false, age: 16 };

  assert.equal(evaluateExpression('5 == 5', scope).value, true);
  assert.equal(evaluateExpression('5 != 3', scope).value, true);
  assert.equal(evaluateExpression('10 > 20', scope).value, false);
  assert.equal(evaluateExpression('a > 10 and b < 20', scope).value, false);
  assert.equal(evaluateExpression('a == 15 or b == 10', scope).value, true);
  assert.equal(evaluateExpression('not is_raining', scope).value, true);
  assert.equal(evaluateExpression('age >= 14 and age <= 17', scope).value, true);
  assert.equal(evaluateExpression('13 <= age <= 17', scope).value, true);
});

test('Task 1.1 produces Beta', () => {
  const code = `a = 15
b = 20

if a > 10 and b < 20:
    print("Alpha")
elif a == 15 or b == 10:
    print("Beta")
else:
    print("Gamma")`;

  const result = tracePythonCode(code);
  assert.deepEqual(result.finalOutput, ['Beta']);
});

test('Task 1.2 produces all three prints for independent ifs', () => {
  const code = `n = 12

if n % 2 == 0:
    print("Кратко 2")
if n % 3 == 0:
    print("Кратко 3")
if n % 4 == 0:
    print("Кратко 4")`;

  const result = tracePythonCode(code);
  assert.deepEqual(result.finalOutput, ['Кратко 2', 'Кратко 3', 'Кратко 4']);
});

test('Task 1.3 produces Положительное', () => {
  const code = `x = 5

if x > 10:
    print("Больше 10")
elif x > 7:
    print("Больше 7")
elif x > 0:
    print("Положительное")
else:
    print("Ноль или отрицательное")`;

  const result = tracePythonCode(code);
  assert.deepEqual(result.finalOutput, ['Положительное']);
});

test('Task 1.4 produces Вариант 2 for nested if-else', () => {
  const code = `x = 8
y = 3

if x < 10:
    if y > 5:
        print("Вариант 1")
    else:
        print("Вариант 2")
else:
    print("Вариант 3")`;

  const result = tracePythonCode(code);
  assert.deepEqual(result.finalOutput, ['Вариант 2']);
});

test('Task 1.5 produces 220', () => {
  const code = `val = 100

if val > 50:
    val = val + 10
if val > 105:
    val = val * 2
else:
    val = val - 50

print(val)`;

  const result = tracePythonCode(code);
  assert.deepEqual(result.finalOutput, ['220']);
});

test('Task 3.1 calculates discount correctly', () => {
  const code = `if total > 1000:
    total = total * 0.9

print("К оплате:", total)`;

  const res1 = tracePythonCode(code, { total: 1200 });
  assert.deepEqual(res1.finalOutput, ['К оплате: 1080']);

  const res2 = tracePythonCode(code, { total: 800 });
  assert.deepEqual(res2.finalOutput, ['К оплате: 800']);
});

test('Task 3.2 classifies age categories correctly', () => {
  const code = `if age < 7:
    print("Малыш")
elif age <= 17:
    print("Школьник")
elif age <= 22:
    print("Студент")
else:
    print("Взрослый")`;

  assert.deepEqual(tracePythonCode(code, { age: 5 }).finalOutput, ['Малыш']);
  assert.deepEqual(tracePythonCode(code, { age: 15 }).finalOutput, ['Школьник']);
  assert.deepEqual(tracePythonCode(code, { age: 20 }).finalOutput, ['Студент']);
  assert.deepEqual(tracePythonCode(code, { age: 30 }).finalOutput, ['Взрослый']);
});

test('Task 3.3 determines coordinate quadrants correctly', () => {
  const code = `if x > 0 and y > 0:
    print(1)
elif x < 0 and y > 0:
    print(2)
elif x < 0 and y < 0:
    print(3)
else:
    print(4)`;

  assert.deepEqual(tracePythonCode(code, { x: 5, y: 5 }).finalOutput, ['1']);
  assert.deepEqual(tracePythonCode(code, { x: -3, y: 8 }).finalOutput, ['2']);
  assert.deepEqual(tracePythonCode(code, { x: -4, y: -2 }).finalOutput, ['3']);
  assert.deepEqual(tracePythonCode(code, { x: 6, y: -7 }).finalOutput, ['4']);
});

test('calculateExamGrade calculates Russian school marks (5, 4, 3, 2)', () => {
  assert.equal(calculateExamGrade(10, 10).grade, 5);
  assert.equal(calculateExamGrade(9, 10).grade, 5);
  assert.equal(calculateExamGrade(8, 10).grade, 4);
  assert.equal(calculateExamGrade(7, 10).grade, 4);
  assert.equal(calculateExamGrade(6, 10).grade, 3);
  assert.equal(calculateExamGrade(5, 10).grade, 3);
  assert.equal(calculateExamGrade(4, 10).grade, 2);
});

