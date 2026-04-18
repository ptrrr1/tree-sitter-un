module.exports = grammar({
  name: 'your_language_name',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  word: $ => $.identifier,

  precedences: _ => [
    ['or', 'and'],
    ['equality', 'comparison'],
    ['term', 'factor'],
    ['unary'],
  ],

  rules: {
    program: $ => repeat($._declaration),

    _declaration: $ => choice(
      $.func_decl,
      $.var_decl,
      $._statement,
    ),

    func_decl: $ => seq('fun', $.function_def),

    function_def: $ => seq(
      $.identifier,
      '(',
      optional($.parameters),
      ')',
      repeat($._declaration),
      'end',
    ),

    parameters: $ => seq(
      $.identifier,
      repeat(seq(',', $.identifier)),
    ),

    var_decl: $ => seq(
      'let',
      $.identifier,
      ':=',
      $.expression,
      ';',
    ),

    _statement: $ => choice(
      $.expr_statement,
      $.print_statement,
      $.block,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
    ),

    continue_statement: $ => seq('continue', ';'),
    
    break_statement: $ => seq('break', ';'),
    
    return_statement: $ => seq('return', optional($.lambda), ';'),
    
    // Updated for statement with proper range syntax
    for_statement: $ => seq(
      'for',
      $.identifier,
      'in',
      $.range,
      'do',
      repeat($._declaration),
      'end',
    ),

    // Range definition for loops
    range: $ => seq(
      '[',
      $.or,  // start expression
      '..',
      choice(
        '<', '>'
      ),
      $.or,
      optional(
        ';',
        $.or
      ),
      ']',
    ),

    while_statement: $ => seq(
      'while',
      $.or,
      'do',
      repeat($._declaration),
      'end',
    ),

    if_statement: $ => seq(
      'if',
      $.equality,
      'then',
      repeat($._declaration),
      choice(
        seq('end'),
        seq('else', repeat($._declaration), 'end'),
      ),
    ),

    block: $ => seq(
      'begin',
      repeat($._declaration),
      'end',
      ';',
    ),

    print_statement: $ => seq(
      'print',
      '(',
      $.or,
      ')',
      ';',
    ),

    expr_statement: $ => seq($.expression, ';'),

    expression: $ => $.assignment,

    assignment: $ => prec.right(1, seq(
      $.identifier,
      '=',
      $.assignment,
    )),

    lambda: $ => prec(2, seq(
      'fn',
      '(',
      optional($.parameters),
      ')',
      $.lambda,
    )),

    or: $ => prec.left(3, seq(
      $.and,
      repeat(seq('or', $.and)),
    )),

    and: $ => prec.left(4, seq(
      $.equality,
      repeat(seq('and', $.equality)),
    )),

    equality: $ => prec.left(5, seq(
      $.comparison,
      repeat(seq(choice('==', '!='), $.comparison)),
    )),

    comparison: $ => prec.left(6, seq(
      $.term,
      repeat(seq(choice('<', '<=', '>', '>='), $.term)),
    )),

    term: $ => prec.left(7, seq(
      $.factor,
      repeat(seq(choice('+', '-'), $.factor)),
    )),

    factor: $ => prec.left(8, seq(
      $.unary,
      repeat(seq(choice('*', '/'), $.unary)),
    )),

    unary: $ => prec(9, choice(
      seq(choice('not', '-'), $.unary),
      $.primary,
    )),

    call: $ => seq(
      $.primary,
      repeat(seq('(', optional($.arguments), ')')),
    ),

    arguments: $ => seq(
      $.or,
      repeat(seq(',', $.or)),
    ),

    primary: $ => choice(
      $.literal,
      $.string,
      $.boolean,
      $.nil,
      seq('(', $.expression, ')'),
      $.identifier,
      $.conditional,
    ),

    conditional: $ => prec(10, seq(
      'if',
      $.or,
      'then',
      $.or,
      'else',
      $.or,
      'end',
    )),

    // Lexical tokens
    literal: $ => /[0-9]+(?:\.[0-9]+)?/,
    string: $ => /"[^"]*"/,
    boolean: $ => choice('true', 'false'),
    nil: $ => 'nil',
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    comment: $ => token(seq('//', /[^\n]*/)),
  }
});
