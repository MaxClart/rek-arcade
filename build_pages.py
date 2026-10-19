A="EKNpkRpGss6Y3NdopdDRs91EiTemEVGNUFXR3Bzif2AN"
def page(path,title,body,on,scripts=()):
    r="../" if path.startswith("games/") else ""
    links=[("index.html","Home"),("games/index.html","Games"),("shop.html","Shop"),("#tip","Tip")]
    nav="".join(f'<a href="{r+h if not h.startswith("#") else h}" class="{"on" if h==on else ""}">{t}</a>' for h,t in links)
    s="".join(f'<script src="{r}js/{x}"></script>' for x in (*scripts,"tip.js"))
    html=f'''<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} · Rek's Arcade &amp; Shop</title><meta name="description" content="Free browser games and handy digital products by Rek.">
<link rel="stylesheet" href="{r}css/style.css"></head><body>
<header><nav><a class="brand" href="{r}index.html">Rek's <span>Arcade</span> &amp; Shop</a>{nav}</nav></header>
<main>{body}</main>
<section class="tip" id="tip"><div class="box"><img src="{r}assets/solana-qr.png" alt="QR code for Rek's Solana address" width="150" height="150">
<div class="info"><h2 style="margin:0">Support / Tip with Solana</h2><p class="mut" style="margin:.3em 0">All games are free. If you enjoy them, a tip of any size helps fund new ones.</p>
<p class="warn" style="margin:.3em 0">⚠ Solana network only (SOL or USDC on Solana). Sending from any other network may lose your funds.</p>
<code id="sol-addr">{A}</code>
<button class="btn" data-copy="sol-addr">Copy address</button> <a class="btn alt" href="solana:{A}">Open in wallet</a></div></div></section>
<footer>© 2026 Rek · No trackers, no ads, no cookies. High scores are saved only in your browser.</footer>{s}</body></html>'''
    open(path,"w").write(html)

games=[("snake","Neon Worm","🐍","Steer a glowing worm, eat the gold orbs, don't bite yourself."),
("reflex","Pop Rush","🎯","30 seconds. Pop the gold bubbles, avoid the red ones."),
("merge","Twenty-Forty Merge","🔢","Slide and merge number tiles to reach 2048."),
("stardodge","Star Dodge","🚀","Grab gold stars and dodge the red rocks.")]
cards="".join(f'<a class="card" href="{{r}}games/{k}.html"><div class="ico">{i}</div><h3 style="margin:.3em 0 0">{n}</h3><p>{d}</p></a>' for k,n,i,d in games)
page("index.html","Home",f'''<section class="hero"><h1>Rek's <span style="color:var(--acc)">Arcade</span> &amp; Shop</h1>
<p>Quick, free games you can play on your phone or computer, plus simple digital tools for UK side hustlers and busy brains.</p>
<p style="margin-top:18px"><a class="btn" href="games/index.html">Play a game</a> <a class="btn alt" href="shop.html">Visit the shop</a></p></section>
<h2>Games</h2><div class="grid">{cards.replace("{r}","")}</div>''',"index.html")
page("games/index.html","Games",f'<h1>Games</h1><p class="mut">All free, no sign-up, works with touch, mouse or keyboard.</p><div class="grid">{cards.replace("{r}","../").replace("../games/","")}</div>',"games/index.html")
prods=[("cover_tracker.png","UK Side Hustle Tax Year Tracker","£12","Track side-hustle income and costs from 6 April to 5 April and see what to set aside for HMRC."),
("cover_invoice.png","UK Freelance Invoice Template","£5","Send professional invoices in minutes and see at a glance who still owes you. Yours to edit forever."),
("cover_adhd.png","ADHD-Friendly Printable Planner &amp; Cleaning System","£8","One page, three priorities, 15-minute cleaning zones and a guilt-free habit tracker. A4 PDF, printer-friendly black &amp; white included.")]
pc="".join(f'<div class="card"><img src="assets/{im}" alt="{n} cover" loading="lazy"><h3 style="margin:.2em 0">{n}</h3><p>{d}</p><div class="price">{p}</div><span class="soon">Checkout coming soon</span></div>' for im,n,p,d in prods)
page("shop.html","Shop",f'<h1>Shop</h1><p class="mut">Instant-download digital products. Checkout is coming soon. Check back shortly!</p><div class="grid">{pc}</div>',"shop.html")
G=lambda k,inner,js:page(f"games/{k}.html",dict((a,b) for a,b,*_ in games)[k],inner,"games/index.html",(js,))
G("snake",'''<div class="game"><h1>🐍 Neon Worm</h1><div class="hud"><span>Score <b id="score">0</b></span><span>Best <b id="best">0</b></span></div>
<canvas id="c" width="400" height="400"></canvas><button class="btn" id="start">Start</button>
<div class="pad" style="grid-template-columns:repeat(3,64px)"><span></span><button data-d="0,-1">▲</button><span></span><button data-d="-1,0">◀</button><button data-d="0,1">▼</button><button data-d="1,0">▶</button></div>
<p class="mut">Arrow keys / WASD, swipe on the board, or use the pad. Walls wrap around.</p></div>''',"snake.js")
G("reflex",'''<div class="game"><h1>🎯 Pop Rush</h1><div class="hud"><span>Score <b id="score">0</b></span><span>Time <b id="time">30</b>s</span><span>Best <b id="best">0</b></span></div>
<div class="target" id="area"><div class="overlay" id="ov"><p id="msg">Pop gold bubbles (+1). Red ones cost you 3!</p><button class="btn" id="go">Start</button></div></div>
<p class="mut">Bubbles get smaller and faster as you score.</p></div>''',"reflex.js")
G("merge",'''<div class="game"><h1>🔢 Twenty-Forty Merge</h1><div class="hud"><span>Score <b id="score">0</b></span><span>Best <b id="best">0</b></span></div>
<div class="board" id="board"></div><p id="msg" style="min-height:1.5em;font-weight:700"></p><button class="btn" id="new">New game</button>
<p class="mut">Arrow keys or swipe. Matching tiles merge.</p></div>''',"merge.js")
G("stardodge",'''<div class="game"><h1>🚀 Star Dodge</h1><canvas id="c" width="480" height="640" style="max-height:75vh;width:auto"></canvas>
<p class="mut">Move with mouse, touch or arrow keys. Tap or press Space to retry.</p></div>''',"stardodge.js")
