#!/usr/bin/env python3
"""Impeccable static-port detector (regex-able subset of pbakaus/impeccable's 41 rules).
Real thresholds from the rule registry. Scans HTML + CSS for AI-slop frontend tells.
Usage: python3 scripts/impeccable-detect.py <file> [<file> ...]
"""
import re, sys, collections

OVERUSED = {"inter","roboto","arial","fraunces","geist","plus jakarta sans",
            "space grotesk","poppins","montserrat"}
BUZZ = ["streamline","empower","supercharge","unlock","seamless","elevate",
        "effortless","unleash","revolutionize","cutting-edge","game-chang"]

def find_lines(text, pat, flags=0):
    out=[]
    for m in re.finditer(pat, text, flags):
        ln = text.count("\n", 0, m.start())+1
        out.append((ln, m.group(0).strip()[:90]))
    return out

def scan(path):
    text=open(path).read()
    findings=[]
    def add(rule,sev,ln,ev): findings.append((rule,sev,ln,ev))

    # --- SLOP: side-tab (colored border on one side of a card-like rule) ---
    for ln,ev in find_lines(text, r'border-(left|right|top|bottom)\s*:\s*[3-9]\s*px\s+solid\s+(var\(--[^)]*y[0-9]|#[fF])'):
        add("side-tab","slop",ln,ev)

    # --- SLOP: gradient-text ---
    for ln,ev in find_lines(text, r'(-webkit-)?background-clip\s*:\s*text'):
        add("gradient-text","slop",ln,ev)
    for ln,ev in find_lines(text, r'text-gradient|gold-shimmer'):
        add("gradient-text-token","slop",ln,ev)

    # --- SLOP: overused-font ---
    for fam in OVERUSED:
        for ln,ev in find_lines(text, r'font-family[^;]*'+re.escape(fam), re.I):
            add("overused-font","slop",ln,ev)

    # --- SLOP: numbered-section-markers (01/02/03 display labels) ---
    for ln,ev in find_lines(text, r'class="num"'):
        add("numbered-section-markers","advisory",ln,ev)

    # --- SLOP: hero-eyebrow-chip (tiny uppercase tracked label) -- count eyebrow usages
    eyebrows = find_lines(text, r'class="[^"]*growth-eyebrow', )
    if eyebrows:
        add("repeated-section-kickers","advisory",eyebrows[0][0],
            f"{len(eyebrows)} growth-eyebrow kickers (repeated tracked labels)")

    # --- SLOP: em-dash overuse (Shane bans entirely => any is a finding) ---
    for ln,ev in find_lines(text, r'—'):
        add("em-dash","slop",ln,ev)

    # --- SLOP: marketing-buzzword ---
    for b in BUZZ:
        for ln,ev in find_lines(text, r'\b'+b, re.I):
            add("marketing-buzzword","advisory",ln,ev)

    # --- QUALITY: layout-transition (animating layout props, not transform/opacity) ---
    for ln,ev in find_lines(text, r'transition\s*:[^;{]*\b(width|height|padding|margin|top|left|right|bottom)\b'):
        # allow if it's transform/opacity only
        if not re.search(r'\b(width|height|padding|margin|top|left|right|bottom)\b', ev.split(':',1)[-1].replace('max-','').replace('min-','')):
            continue
        add("layout-transition","quality",ln,ev)
    for ln,ev in find_lines(text, r'transition\s*:\s*all\b'):
        add("transition-all","quality",ln,ev)

    # --- QUALITY: tiny-text (<12px) and tight-leading ---
    for ln,ev in find_lines(text, r'font-size\s*:\s*(\d+)px'):
        m=re.search(r'(\d+)px',ev)
        if m and int(m.group(1))<12: add("tiny-text","quality",ln,ev)

    # --- CSS-distribution rules: only on .css ---
    if path.endswith(".css"):
        sizes=[int(x) for x in re.findall(r'font-size\s*:\s*(\d+)px', text)]
        uniq=sorted(set(sizes))
        if len(uniq)>=3:
            ratio=max(uniq)/min(uniq)
            if ratio<2.0:
                add("flat-type-hierarchy","slop",0,
                    f"{len(uniq)} sizes {min(uniq)}-{max(uniq)}px ratio {ratio:.2f} (<2.0)")
        # monotonous-spacing
        sp=re.findall(r'(?:padding|margin|gap)\s*:\s*([0-9 px]+);', text)
        vals=[]
        for s in sp: vals+=re.findall(r'(\d+)px', s)
        if vals:
            c=collections.Counter(vals)
            top,topn=c.most_common(1)[0]
            if len(c)>=10 and topn/len(vals)>0.60 and len(set(vals))<=3:
                add("monotonous-spacing","slop",0,f"top {top}px = {topn}/{len(vals)}")

    return findings

def main():
    files=sys.argv[1:]
    grand=collections.Counter()
    for f in files:
        fnd=scan(f)
        if fnd:
            print(f"\n=== {f} ===")
            for rule,sev,ln,ev in fnd:
                print(f"  [{sev:8}] {rule:26} L{ln:<5} {ev}")
                grand[rule]+=1
    print("\n=== TOTALS ===")
    if not grand: print("  0 findings")
    for rule,n in grand.most_common():
        print(f"  {rule:28} {n}")
    print(f"  {'TOTAL':28} {sum(grand.values())}")

if __name__=="__main__":
    main()
