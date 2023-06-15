# Define the tokenizer/lexer inline because we want it inside the generated grammar
# That means we can run it on browsers
@{%
    const moo = require('moo');

    let lexer = moo.compile({
        WS: /[ \t]+/,
        comment: /\/\/.*?$/,
        identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
        lParen: '(',
        rParen: ')',
        NL: { match: /\r?\n/, lineBreaks: true },
    });
%}

@lexer lexer

program -> _ml statements _ml
            {%
                data => data[1]
            %}

statements
    ->  statement (__lb_ statement):*
        {%
            data => {
                const repeated = data[1]
                const restStatement = repeated.map(chunk => chunk[1])
                return [data[0], ...restStatement]
            }
        %}
        
statement
    ->  define     {% id %}
    |   %comment   {% id %}

# Make a node start with the NODE keyword
define
    ->  "NODE" _ "(" __lb_ node_prop __lb_ ")"
        {%
            data => data[4]
        %}

# Make every NODE have these 3 properties. ID, VALUE, and PARENT
node_prop
    ->  
        "id"       _  %identifier  __lb_
        "value"    _  %identifier  __lb_
        "parent"   _  %identifier  
        {%
            data => ({
                "id"       : data[2],
                "value"    : data[6],
                "parent"   : data[10] 
            })
        %}


__lb_ -> (_ %NL):+ _

_ml -> (%WS | %NL):*
__ml -> (%WS | %NL):+

_ -> %WS:*
__ -> %WS:+