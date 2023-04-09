import sys
from konlpy.tag import Mecab

mecab = Mecab()

def format_token(token):
    split = token.split('/')
    if split[1] == 'SPACE':
        return ' '
    else:
        return split[0]

def format(tokens):
    return ''.join([format_token(token) for token in tokens])

def tokenize(hangul, hanja):
    eojeols = mecab.pos(hanja, flatten=False)
    hanja_tokens = []
    hangul_tokens = []
    i = 0
    for eojeol in eojeols:
        for (hanja, pos) in eojeol:
            hanja_tokens.append(hanja)
            hangul_tokens.append(hangul[i:i+len(hanja)])
            i += len(hanja)
        hanja_tokens.append('\\s')
        hangul_tokens.append('\\s')
        i += 1
    if len(hanja_tokens) > 0:
        hanja_tokens.pop()
        hangul_tokens.pop()
    return (hangul_tokens, hanja_tokens)

if __name__ == '__main__':
    file = open(sys.argv[1])
    output = open(sys.argv[2], 'w')
    lines = []
    lines_count = 0
    while True:
        line = file.readline()
        if not line:
            break
        if '\t' not in line:
            continue
        (hangul, hanja) = line.split('\t')
        (hangul, hanja) = tokenize(hangul, hanja)
        lines.append(' '.join(hangul) + '\t' + ' '.join(hanja))
        if len(lines) >= 10000:
            output.write('\n'.join(lines) + '\n')
            lines_count += len(lines)
            lines = []
            print(lines_count)

    output.write('\n'.join(lines) +'\n')
