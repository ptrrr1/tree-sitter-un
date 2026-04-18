; Functions - increase indent after "fn" until "end"
(func_decl) @indent
(function_def) @indent

; Loop constructs
(for_statement) @indent
(for_statement) @extend
(while_statement) @indent
(while_statement) @extend

; Conditional constructs
(if_statement) @indent
(if_statement) @extend

; Block statements
(block) @indent
(block) @extend

; End markers - decrease indent
[
  "end"
  "]"
] @outdent

; Range - handle multi-line ranges
(range
  "[" @indent
  "]" @outdent
)
