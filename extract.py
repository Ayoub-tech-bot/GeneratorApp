import json

with open('app.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('const PLAN = ')
if start != -1:
    i = start + 13
    depth = 0
    in_string = False
    obj_start = i
    while i < len(text):
        c = text[i]
        if in_string:
            if c == '\\':
                i += 2
                continue
            if c == '"':
                in_string = False
        else:
            if c == '"':
                in_string = True
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    i += 1
                    break
        i += 1
    
    with open('plan_dump.json', 'w', encoding='utf-8') as out:
        out.write(text[obj_start:i])
    print('Extraction successful!')
else:
    print('const PLAN not found')
