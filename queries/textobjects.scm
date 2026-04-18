; Function text objects
(function_def
  body: (_) @function.inside) @function.around

; ; Loop text objects
; (for_statement) @loop.around
; (for_statement body: (_) @loop.inside)
; (while_statement) @loop.around
; (while_statement body: (_) @loop.inside)

; ; Conditional text objects
; (if_statement) @conditional.around
; (if_statement t_branch: (_) @conditional.inside)
; (if_statement f_branch: (_) @conditional.inside)

; ; Block text objects
; (block) @block.around
; (block (_) @block.inside)
