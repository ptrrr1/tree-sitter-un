/**
 * @file Un grammar for tree-sitter
 * @author ptrrr1 <ptrrrdev@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'un',

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

    func_decl: $ => seq('fn', $.function_def),

    function_def: $ => seq(
      $.identifier,
      '(',
      optional($.parameters),
      ')',
      field('body', repeat($._declaration)),
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
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.block,
      $.print_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.expr_statement
    ),

    continue_statement: $ => seq('continue', ';'),
    
    break_statement: $ => seq('break', ';'),
    
    return_statement: $ => seq('return', field('value', optional($.lambda)), ';'),
    
    // Updated for statement with proper range syntax
    for_statement: $ => seq(
      'for',
      $.identifier,
      'in',
      $.range,
      'do',
      field('body', repeat($._declaration)),
      'end',
    ),

    // Range definition for loops
    range: $ => seq(
      '[',
      $.or,  // start expression
      seq('..', choice('<', '>')),
      $.or,
      optional(seq(';', $.or)),
      ']',
    ),

    while_statement: $ => seq(
      'while',
      $.or,
      'do',
      field('body', repeat($._declaration)),
      'end',
    ),

    if_statement: $ => seq(
      'if',
      $.or,
      'then',
      field('t_branch', repeat($._declaration)),
      choice(
        'end',
        seq('else', field('f_branch', repeat($._declaration)), 'end')
      ),
    ),

    block: $ => seq(
      'begin',
      field('body', repeat($._declaration)),
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

    assignment: $ => prec.right(1, choice(
      seq(
        $.identifier,
        '=',
        $.assignment,
      ),
      $.lambda
    )),

    lambda: $ => prec(2, choice(
      seq(
        'fn',
        '(',
        optional($.parameters),
        ')',
        $.lambda,
      ),
      $.or
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
      $.call,
    )),

    call: $ => seq(
      $.primary,
      repeat1(seq('(', optional($.arguments), ')')),
    ),

    arguments: $ => seq(
      $.or,
      repeat(seq(',', $.or)),
    ),

    primary: $ => choice(
      $.number,
      $.string,
      $.boolean,
      $.nil,
      seq('(', $.expression, ')'),
      $.identifier,
      $.conditional,
    ),

    conditional: $ => prec(1, seq(
      'if',
      $.or,
      'then',
      $.lambda,
      'else',
      $.lambda,
      'end',
    )),

    // Lexical tokens
    number: $ => /[0-9]+(?:\.[0-9]+)?/,
    string: $ => /"[^"]*"/,
    boolean: $ => choice('true', 'false'),
    nil: $ => 'nil',
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    comment: $ => token(seq('//', /[^\n]*/)),
  }
});
