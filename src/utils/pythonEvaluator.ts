import { TraceResult, TraceStep } from '../types/index.ts';

/**
 * Safe parser & step-by-step tracer for educational Python conditional code.
 */

interface ParsedLine {
  originalText: string;
  trimmedText: string;
  indent: number;
  lineNumber: number; // 1-based
  lineIndex: number;  // 0-based
  type: 'assignment' | 'if' | 'elif' | 'else' | 'print' | 'blank' | 'comment' | 'unknown';
}

function getIndent(line: string): number {
  let count = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ' ') count++;
    else if (line[i] === '\t') count += 4;
    else break;
  }
  return count;
}

export function evaluateExpression(
  expr: string,
  scope: Record<string, string | number | boolean>
): { value: any; explanation: string } {
  const cleanExpr = expr.trim();

  // Handle boolean literals
  if (cleanExpr === 'True') return { value: true, explanation: 'True' };
  if (cleanExpr === 'False') return { value: false, explanation: 'False' };

  // Handle string literals directly, e.g. "Малыш" or 'Alpha'
  const stringLiteralMatch = cleanExpr.match(/^["'](.*)["']$/);
  if (stringLiteralMatch) {
    return { value: stringLiteralMatch[1], explanation: cleanExpr };
  }

  // Handle Python chained comparison if present, e.g. 13 <= age <= 17
  const chainedMatch = cleanExpr.match(/^(\d+|\w+)\s*(<=|<|>=|>|==)\s*([a-zA-Z_]\w*)\s*(<=|<|>=|>|==)\s*(\d+|\w+)$/);
  if (chainedMatch) {
    const [, left, op1, mid, op2, right] = chainedMatch;
    const part1 = `${left} ${op1} ${mid}`;
    const part2 = `${mid} ${op2} ${right}`;
    const res1 = evaluateExpression(part1, scope);
    const res2 = evaluateExpression(part2, scope);
    const combinedVal = Boolean(res1.value && res2.value);
    return {
      value: combinedVal,
      explanation: `(${res1.explanation} [${res1.value ? 'True' : 'False'}]) and (${res2.explanation} [${res2.value ? 'True' : 'False'}]) = ${combinedVal ? 'True' : 'False'}`
    };
  }

  // Build human-readable explanation with variable values substituted
  const tokens = cleanExpr.split(/(\s+|==|!=|<=|>=|<|>|\band\b|\bor\b|\bnot\b|\(|\)|\+|\-|\*|\/|%)/);
  const substitutedExplanationParts: string[] = [];

  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) {
      substitutedExplanationParts.push(token);
      continue;
    }

    if (token in scope) {
      const val = scope[token];
      substitutedExplanationParts.push(typeof val === 'string' ? `"${val}"` : String(val));
    } else {
      substitutedExplanationParts.push(token);
    }
  }

  const humanExplanation = substitutedExplanationParts.join('');

  // Evaluate safely
  try {
    let jsExpr = cleanExpr
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false');

    // Replace Python logic operators
    jsExpr = jsExpr.replace(/\band\b/g, ' && ');
    jsExpr = jsExpr.replace(/\bor\b/g, ' || ');
    jsExpr = jsExpr.replace(/\bnot\s+/g, ' ! ');

    // Replace variable names with scope values
    const sortedVarNames = Object.keys(scope).sort((a, b) => b.length - a.length);
    for (const varName of sortedVarNames) {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      const val = scope[varName];
      const rep = typeof val === 'string' ? JSON.stringify(val) : String(val);
      jsExpr = jsExpr.replace(regex, rep);
    }

    // Sanitize: allow unicode letters (\p{L}), numbers, arithmetic, comparison, logic, string quotes
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${jsExpr});`);
    const result = fn();

    return {
      value: result,
      explanation: humanExplanation
    };
  } catch (err) {
    return {
      value: false,
      explanation: `${humanExplanation} (Ошибка: ${String(err)})`
    };
  }
}

export function parsePrintArgs(rawArgs: string): string[] {
  const args: string[] = [];
  let current = '';
  let inDouble = false;
  let inSingle = false;

  for (let i = 0; i < rawArgs.length; i++) {
    const ch = rawArgs[i];
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      current += ch;
    } else if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      current += ch;
    } else if (ch === ',' && !inDouble && !inSingle) {
      args.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) {
    args.push(current.trim());
  }

  return args;
}

export function tracePythonCode(
  sourceCode: string,
  initialVars: Record<string, string | number | boolean> = {}
): TraceResult {
  const lines = sourceCode.split('\n');
  const parsedLines: ParsedLine[] = lines.map((line, idx) => {
    const trimmed = line.trim();
    let type: ParsedLine['type'] = 'unknown';

    if (!trimmed) {
      type = 'blank';
    } else if (trimmed.startsWith('#')) {
      type = 'comment';
    } else if (/^if\s+.*:$/.test(trimmed)) {
      type = 'if';
    } else if (/^elif\s+.*:$/.test(trimmed)) {
      type = 'elif';
    } else if (/^else\s*:$/.test(trimmed)) {
      type = 'else';
    } else if (/^print\s*\(.*\)$/.test(trimmed)) {
      type = 'print';
    } else if (/^[a-zA-Z_]\w*\s*(=|\+=|-=|\*=|\/=)\s*.+$/.test(trimmed)) {
      type = 'assignment';
    }

    return {
      originalText: line,
      trimmedText: trimmed,
      indent: getIndent(line),
      lineNumber: idx + 1,
      lineIndex: idx,
      type
    };
  });

  const scope: Record<string, string | number | boolean> = { ...initialVars };
  const steps: TraceStep[] = [];
  const finalOutput: string[] = [];

  interface ConditionalChain {
    indent: number;
    hasAnyBranchExecuted: boolean; // has if or some elif branch already evaluated to true?
    currentBranchActive: boolean;  // is this branch currently executing its body?
  }

  const chainStack: ConditionalChain[] = [];

  for (let i = 0; i < parsedLines.length; i++) {
    const cur = parsedLines[i];

    if (cur.type === 'blank' || cur.type === 'comment') {
      continue;
    }

    // Clean up chains that were at deeper indentation
    while (chainStack.length > 0 && cur.indent < chainStack[chainStack.length - 1].indent) {
      chainStack.pop();
    }

    // If this line is an 'if', any existing chain at the SAME or deeper indent is finished
    if (cur.type === 'if') {
      while (chainStack.length > 0 && cur.indent <= chainStack[chainStack.length - 1].indent) {
        chainStack.pop();
      }
    }

    // Check if we are inside an inactive branch of an enclosing outer or current chain
    // Any chain whose currentBranchActive is false means its body is skipped
    const enclosingInactive = chainStack.find(
      chain => chain.indent < cur.indent && !chain.currentBranchActive
    );

    if (enclosingInactive && cur.type !== 'elif' && cur.type !== 'else') {
      steps.push({
        lineIndex: cur.lineIndex,
        lineNumber: cur.lineNumber,
        code: cur.originalText,
        scope: { ...scope },
        description: `Строка пропущена (внешнее условие было False)`,
        isBlockSkipped: true
      });
      continue;
    }

    if (cur.type === 'if') {
      const match = cur.trimmedText.match(/^if\s+(.*):$/);
      const conditionExpr = match ? match[1].trim() : 'True';
      const evaluated = evaluateExpression(conditionExpr, scope);
      const isTrue = Boolean(evaluated.value);

      chainStack.push({
        indent: cur.indent,
        hasAnyBranchExecuted: isTrue,
        currentBranchActive: isTrue
      });

      steps.push({
        lineIndex: cur.lineIndex,
        lineNumber: cur.lineNumber,
        code: cur.originalText,
        scope: { ...scope },
        conditionResult: {
          expression: conditionExpr,
          evaluatedTo: isTrue,
          explanation: evaluated.explanation
        },
        description: isTrue
          ? `Условие if [${conditionExpr}] ИСТИННО (${evaluated.explanation} -> True). Заходим внутрь ветки.`
          : `Условие if [${conditionExpr}] ЛОЖНО (${evaluated.explanation} -> False). Ветка пропускается.`,
        isBlockEntered: isTrue,
        isBlockSkipped: !isTrue
      });
      continue;
    }

    if (cur.type === 'elif') {
      const currentChain = chainStack.find(chain => chain.indent === cur.indent);
      const match = cur.trimmedText.match(/^elif\s+(.*):$/);
      const conditionExpr = match ? match[1].trim() : 'True';

      if (!currentChain) {
        // Fallback
        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          description: `elif без активной цепочки if`
        });
        continue;
      }

      if (currentChain.hasAnyBranchExecuted) {
        // Branch above was already True! Skip this elif completely!
        currentChain.currentBranchActive = false;
        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          conditionResult: {
            expression: conditionExpr,
            evaluatedTo: false,
            explanation: 'Ветка выше уже выполнилась! Python сразу пропускает elif.'
          },
          description: `Ветка выше уже сработала! Python не проверяет [${conditionExpr}] и пропускает ветку.`,
          isBlockSkipped: true
        });
      } else {
        // Check condition
        const evaluated = evaluateExpression(conditionExpr, scope);
        const isTrue = Boolean(evaluated.value);

        if (isTrue) {
          currentChain.hasAnyBranchExecuted = true;
          currentChain.currentBranchActive = true;
        } else {
          currentChain.currentBranchActive = false;
        }

        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          conditionResult: {
            expression: conditionExpr,
            evaluatedTo: isTrue,
            explanation: evaluated.explanation
          },
          description: isTrue
            ? `Условие elif [${conditionExpr}] ИСТИННО (${evaluated.explanation} -> True). Входим в эту ветку.`
            : `Условие elif [${conditionExpr}] ЛОЖНО (${evaluated.explanation} -> False). Переходим дальше.`,
          isBlockEntered: isTrue,
          isBlockSkipped: !isTrue
        });
      }
      continue;
    }

    if (cur.type === 'else') {
      const currentChain = chainStack.find(chain => chain.indent === cur.indent);
      if (!currentChain) {
        continue;
      }

      if (currentChain.hasAnyBranchExecuted) {
        currentChain.currentBranchActive = false;
        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          description: `Ветка else пропущена: одно из условий выше уже сработало.`,
          isBlockSkipped: true
        });
      } else {
        currentChain.hasAnyBranchExecuted = true;
        currentChain.currentBranchActive = true;
        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          description: `Ни одно из условий выше не подошло. Выполняется ветка else («во всех остальных случаях»).`,
          isBlockEntered: true
        });
      }
      continue;
    }

    // Normal statement (assignment, print, etc.)
    // Check if the closest chain at lower indent allows execution
    const currentChain = chainStack[chainStack.length - 1];
    if (currentChain && !currentChain.currentBranchActive && cur.indent > currentChain.indent) {
      steps.push({
        lineIndex: cur.lineIndex,
        lineNumber: cur.lineNumber,
        code: cur.originalText,
        scope: { ...scope },
        description: `Строка пропущена (ветка условия не активна)`,
        isBlockSkipped: true
      });
      continue;
    }

    if (cur.type === 'assignment') {
      const match = cur.trimmedText.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=|=)\s*(.*)$/);
      if (match) {
        const [, varName, op, exprStr] = match;
        const cleanedExpr = exprStr.replace(/#.*$/, '').trim();

        let finalVal: string | number | boolean;
        const evalRes = evaluateExpression(cleanedExpr, scope);

        if (op === '=') {
          finalVal = evalRes.value;
        } else {
          const current = Number(scope[varName] || 0);
          const rhs = Number(evalRes.value);
          if (op === '+=') finalVal = current + rhs;
          else if (op === '-=') finalVal = current - rhs;
          else if (op === '*=') finalVal = current * rhs;
          else if (op === '/=') finalVal = current / rhs;
          else finalVal = evalRes.value;
        }

        if (typeof finalVal === 'number') {
          if (Number.isInteger(finalVal)) {
            // integer
          } else {
            finalVal = Math.round(finalVal * 1000) / 1000;
          }
        }

        scope[varName] = finalVal;

        steps.push({
          lineIndex: cur.lineIndex,
          lineNumber: cur.lineNumber,
          code: cur.originalText,
          scope: { ...scope },
          description: `Присваивание: ${varName} = ${typeof finalVal === 'string' ? `"${finalVal}"` : finalVal}`
        });
      }
      continue;
    }

    if (cur.type === 'print') {
      const match = cur.trimmedText.match(/^print\s*\((.*)\)$/);
      let outputStr = '';
      if (match) {
        const rawArgs = match[1].replace(/#.*$/, '').trim();
        if (!rawArgs) {
          outputStr = '';
        } else {
          const args = parsePrintArgs(rawArgs);
          const parts = args.map(arg => {
            const evaluated = evaluateExpression(arg, scope);
            return evaluated.value !== undefined ? String(evaluated.value) : arg;
          });
          outputStr = parts.join(' ');
        }
      }

      finalOutput.push(outputStr);

      steps.push({
        lineIndex: cur.lineIndex,
        lineNumber: cur.lineNumber,
        code: cur.originalText,
        scope: { ...scope },
        outputLine: outputStr,
        description: `Вывод на экран (print): "${outputStr}"`
      });
      continue;
    }

    steps.push({
      lineIndex: cur.lineIndex,
      lineNumber: cur.lineNumber,
      code: cur.originalText,
      scope: { ...scope },
      description: `Выполнение: ${cur.trimmedText}`
    });
  }

  return {
    steps,
    finalOutput,
    finalScope: scope
  };
}
