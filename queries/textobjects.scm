; Function text objects
(function_def) @function.outer
(function_def body: (_) @function.inner)

; Loop text objects
(for_statement) @loop.outer
(for_statement body: (_) @loop.inner)
(while_statement) @loop.outer
(while_statement body: (_) @loop.inner)

; Conditional text objects
(if_statement) @conditional.outer
(if_statement consequence: (_) @conditional.inner)
(if_statement alternative: (_) @conditional.inner)

; Block text objects
(block) @block.outer
(block (_) @block.inner)
