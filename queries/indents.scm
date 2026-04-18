; Functions - increase indent after "fn" until "end"
[
  (func_decl)
  (function_def)
] @indent.begin

; Loop constructs
(for_statement) @indent.begin
(while_statement) @indent.begin

; Conditional constructs
(if_statement) @indent.begin

; Block statements
(block) @indent.begin

; End markers - decrease indent
[
  "end"
  "]"
] @indent.dedent

; Handle else clauses specially - they should be at the same level as if
(if_statement
  "else" @indent.branch
)

; For statement body indentation
(for_statement
  body: (_) @indent.begin
)

; While statement body indentation
(while_statement
  body: (_) @indent.begin
)

; If statement body indentation
(if_statement
  consequence: (_) @indent.begin
  alternative: (_) @indent.begin
)

; Block body indentation
(block
  body: (_) @indent.begin
)

; Function body indentation
(function_def
  body: (_) @indent.begin
)

; Multi-line expressions - align continuation lines
(assignment
  right: (_) @indent.align
)

(equality
  (_) @indent.align
)

(comparison
  (_) @indent.align
)

(term
  (_) @indent.align
)

(factor
  (_) @indent.align
)

; Parenthesized expressions - indent continuations
(parenthesized_expression
  "(" @indent.begin
  ")" @indent.end
)

; Function arguments - align after '('
(arguments
  "(" @indent.begin
  ")" @indent.end
  "," @indent.align
)

; Parameters - align after '('
(parameters
  "(" @indent.begin
  ")" @indent.end
  "," @indent.align
)

; Range - handle multi-line ranges
(range
  "[" @indent.begin
  "]" @indent.end
  ";" @indent.align
)

; Binary operations - align operands on new lines
(binary_expression
  left: (_) @indent.align
  operator: _ @indent.align
  right: (_) @indent.align
)

; Unary operations on new lines
(unary_expression
  operand: (_) @indent.align
)
