---
title: Access Modifiers
version: 0.1.0
description: Access modifiers in sCrypt
---

There are three types of access modifiers available to help restrict the scope of properties and functions of a contract:

- Default: no keyword required
- Private
- Public: only applies to functions

Only public functions can be called externally by Bitcoin transactions.

|   |**default**|**private**|**public**|
|---|---|---|---|
|Same contract|Yes|Yes|Yes|
|Other conract|Yes|No|Yes|
|Externally|No|No|Yes|

