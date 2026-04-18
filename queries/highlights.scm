; Keywords
"fn" @keyword
"let" @keyword
"for" @keyword
"in" @keyword
"while" @keyword
"do" @keyword
"end" @keyword
"if" @keyword
"then" @keyword
"else" @keyword
"begin" @keyword
"return" @keyword
"break" @keyword
"continue" @keyword
"print" @function.builtin

; Operators
"and" @operator
"or" @operator
"not" @operator
"==" @operator
"!=" @operator
"<" @operator
"<=" @operator
">" @operator
">=" @operator
".." @operator
"=" @operator
":=" @operator
"+" @operator
"-" @operator
"*" @operator
"/" @operator

; Punctuation
"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
";" @punctuation.delimiter
"," @punctuation.delimiter

; Literals
(number) @number
(string) @string
(boolean) @constant
(nil) @constant

; Identifiers
(identifier) @variable

; Function definitions
(function_def
  (identifier) @function)

; Function calls
(call
  (primary (identifier) @function.call))

; Parameters
(parameters
  (identifier) @parameter)

; Comments
(comment) @comment
