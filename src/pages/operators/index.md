---
title: Operators
version: 0.1.0
description: Operators in sCrypt
---

|**Precedence**|**Operators**|**Associativity**|
|---|---|---|
|1|`- ! ~`|right|
|2|`* / %`|left|
|3|`+ -`|left|
|4|`<< >>`|left|
|5|`< <= > >=`|left|
|6|`== !=`|left|
|7|`&`|left|
|8|`^`|left|
|9|`\|`|left|
|10|`&&`|left|
|11|`\|\|`|left|
|12|`? :`|right|

Operators `&&`, `||`, and `? :` use [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation).
