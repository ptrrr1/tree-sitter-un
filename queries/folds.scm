; Fold function definitions
(function_def
  "(" @_start
  "end" @_end
) @fold

; Fold function declarations
(func_decl
  "fn" @_start
  "end" @_end
) @fold

; Fold for loops
(for_statement
  "for" @_start
  "end" @_end
) @fold

; Fold while loops
(while_statement
  "while" @_start
  "end" @_end
) @fold

; Fold if statements (both with and without else)
(if_statement
  "if" @_start
  [
    "end"
    (else_clause)
  ] @_end
) @fold

; Fold blocks
(block
  "begin" @_start
  "end" @_end
) @fold
