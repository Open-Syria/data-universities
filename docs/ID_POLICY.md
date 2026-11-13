# ID Policy

University IDs must:

- start with `sy-`,
- use lowercase ASCII,
- use hyphen-separated words,
- remain stable once released.

Pattern:

```text
sy-{institution-slug}
```

Example:

```text
sy-damascus-university
```

Disciplines use the same stable ID format, for example `sy-pharmacy`.
The discipline ID is independent of campus, qualification and ISCED-F code.
An offering keeps its own ID, which distinguishes the university, subject,
and campus where needed. A new admissions cycle updates the route data
without changing the offering ID.
