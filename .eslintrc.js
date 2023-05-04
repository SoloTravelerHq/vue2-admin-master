
module.exports = {
  root: true,
  env: {
    node: true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  parser: "vue-eslint-parser",
  rules: {
    // 将prettier插件规则打开，否则--fix无法自动修复
    "prettier/prettier": 0,
    // "off"或者0- 关闭规则
    // "warn"或者1- 将规则打开为警告（不影响退出代码）
    // "error"或者2- 将规则打开为错误（触发时退出代码为1）
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // '@typescript-eslint/triple-slash-reference': 'off',
    // 'no-undef': 'off'
    // 代码规范对应规则
    // 强制加分号
    "semi": [1, 'always'],
    // 使用类型安全的相等运算符===而!==不是常规对==等运算符被认为是好的做法!=。
    "eqeqeq": [1, 'always'],
    // 强制在代码块中使用一致的大括号风格，左花括号前就一个空格（和"indent"搭配）
    'brace-style': [1, '1tbs'],
    // 强制使用tab一致缩进"tab"、2、4（switch语句块中case与switch保持相同的缩进）
    "indent": [1, 2, { "SwitchCase": 1 }],
    // 禁止对象字面量中出现重复key
    'no-dupe-keys': 1,
    // 禁止使用alert、confirm和prompt
    'no-alert': 1,
    // 禁止在循环语句中出现包含不安全引用的函数声明
    'no-loop-func': 1,
    // 代码语句中禁止使用多个空格
    'no-multi-spaces': 1,
    // 禁止多次声明同一变量，防止变量名重复
    'no-redeclare': 1,
    // 禁止将变量初始化为undedined
    'no-undef-init': 1,
    // 禁止出现未使用过的变量
    'no-unused-vars': 1,
    // 强制使用驼峰命名
    "camelcase": 1,
    // 要求或禁止函数标识符和其调用之间有空格
    'func-call-spacing': 1,
    // 强制在对象字面量属性中值之前(冒号之后)使用空格
    'key-spacing': [1, { beforeColon: false }],
    // 要求在注释前有一个空行
    'lines-around-comment': [1, { beforeBlockComment: true }],
    // 禁止空格和tab缩进混合使用
    'no-mixed-spaces-and-tabs': 1,
    // 禁止出现多行空行
    'no-multiple-empty-lines': 1,
    // 强制使用一致双引号或单引号
    "quotes": [1, 'single'],
    // 要求操作符周围有空格
    'space-infix-ops': 1,
    // 强制在注释//或/*开头使用空格
    'spaced-comment': [1, 'always'],
    // 禁止修改const声明的变量
    'no-const-assign': 1,
    // 要求使用let或const而不是var
    'no-var': 1,
    // 要求使用模板字面量而不是字符拼接
    'prefer-template': 1,
    // 强制在块之前(左花括号{之前)使用空格
    'space-before-blocks': [1, 'always'],
    // 在非空文件的末尾至少执行一个换行符（或不存在）
    'eol-last': [1, 'always'],
    // 禁止行尾有空格，注释除外
    'no-trailing-spaces': [1, { ignoreComments: true }],
    // 当一条语句太长而不适合单行时，通常会在分隔表达式的运算符旁边插入换行符。想到的第一种方式是按照英文标点符号将操作员放在行的末尾。
    'operator-linebreak': [1, 'before'],
    // 是否禁止使用双"!"号
    'no-extra-boolean-cast': 0
  }
}
