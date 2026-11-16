# Arxivdagi app.js ga mashq animatsiyalarini ulaydi (bir marta ishlatilsa ham, ko'p marta ham xavfsiz).
import io, sys
p = 'app/src/main/assets/www/app.js'
s = io.open(p, encoding='utf-8').read()
if 'ExAnim.svg' in s:
    print('app.js allaqachon yangilangan'); sys.exit(0)
R = [
("""    return '<div class="ex"><div class="row between"><b>' + T(e.name) + '</b>' + (sec ? '<span class="muted small">' + sec + ' ' + T('soniya') + '</span>' : '') + '</div>' +
      '<div class="muted small">' + T(e.desc) + '</div>' +""",
"""    return '<div class="ex"><div class="exhead">' + ExAnim.svg(k, 'thumb') + '<div class="exinfo"><div class="row between"><b>' + T(e.name) + '</b>' + (sec ? '<span class="muted small">' + sec + ' ' + T('soniya') + '</span>' : '') + '</div>' +
      '<div class="muted small">' + T(e.desc) + '</div></div></div>' +"""),
("""<div class="muted">' + T('Keyingisi') + ':</div><div class="nm">' + T(e.name) + '</div>'
""",
"""<div class="muted">' + T('Keyingisi') + ':</div><div class="nm">' + T(e.name) + '</div>' + ExAnim.svg(s.next, 'big small-big' + (paused ? ' paused' : ''))
"""),
("""<div class="nm">' + T(e.name) + '</div><div class="tm">' + left + '</div>""",
"""<div class="nm">' + T(e.name) + '</div>' + ExAnim.svg(s.ex, 'big' + (paused ? ' paused' : '')) + '<div class="tm">' + left + '</div>"""),
]
for a, b in R:
    if s.count(a) != 1:
        print('XATO: kutilgan kod topilmadi:\n' + a); sys.exit(1)
    s = s.replace(a, b)
io.open(p, 'w', encoding='utf-8').write(s)
print('app.js yangilandi')
