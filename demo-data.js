// Näidistooted. Kasutatakse AINULT siis, kui config.js failis pole API_URL-i.
// Kui pood on Google Sheetsiga ühendatud, ei kasutata seda faili üldse.
(function () {
  function svg(w, h, body) {
    return 'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '">' + body + '</svg>');
  }

  var MONTHS = ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni'];
  var CAL = [['#3e5d3b', '#e8ebe0'], ['#8a4b2a', '#f5ebe2'], ['#3d5a8a', '#e6ecf5'], ['#6f6118', '#f2eedb'], ['#7a3550', '#f4e6ec'], ['#2d6a7a', '#e3f0f2']];

  function calendar(i) {
    var c = CAL[i % CAL.length][0], bg = CAL[i % CAL.length][1], cells = '';
    for (var r = 0; r < 5; r++) for (var k = 0; k < 7; k++) {
      var n = r * 7 + k + 1;
      if (n > 31) continue;
      var x = 70 + k * 66, y = 300 + r * 56;
      cells += '<rect x="' + x + '" y="' + y + '" width="58" height="48" rx="6" fill="#fff" stroke="' + c + '" stroke-opacity=".3"/>' +
        '<text x="' + (x + 9) + '" y="' + (y + 21) + '" font-family="Georgia,serif" font-size="16" fill="' + c + '">' + n + '</text>';
    }
    return svg(600, 640,
      '<rect width="600" height="640" fill="' + bg + '"/>' +
      '<rect x="40" y="44" width="520" height="560" rx="18" fill="#fff" stroke="' + c + '" stroke-width="3"/>' +
      '<path d="M58 44h484a18 18 0 0 1 18 18v178H40V62a18 18 0 0 1 18-18z" fill="' + c + '"/>' +
      '<circle cx="' + (430 - i * 30) + '" cy="110" r="34" fill="#fff" fill-opacity=".35"/>' +
      '<path d="M40 200 Q150 ' + (120 + i * 8) + ' 270 175 T560 150 V240 H40Z" fill="#fff" fill-opacity=".22"/>' +
      '<path d="M40 220 Q200 170 330 205 T560 190 V240 H40Z" fill="#fff" fill-opacity=".3"/>' +
      [150, 230, 310, 390, 470].map(function (x) { return '<rect x="' + x + '" y="30" width="10" height="30" rx="5" fill="#555"/>'; }).join('') +
      '<text x="300" y="282" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="' + c + '">' + MONTHS[i % MONTHS.length] + ' 2027</text>' +
      cells);
  }

  var PAL = [['#3e5d3b', '#e3a72f', '#c4552f', '#3d5a8a'], ['#7a3550', '#2d6a7a', '#e3a72f', '#3e5d3b']];
  function board(i) {
    var p = PAL[i % PAL.length], spaces = '', pos = [];
    for (var r = 0; r < 5; r++) for (var k = 0; k < 6; k++) {
      var col = r % 2 ? 5 - k : k;
      pos.push([125 + col * 70, 150 + r * 82]);
    }
    var d = 'M' + pos.map(function (q) { return q[0] + ' ' + q[1]; }).join(' L');
    pos.forEach(function (q, n) {
      spaces += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="24" fill="' + p[n % 4] + '" stroke="#fff" stroke-width="4"/>';
    });
    return svg(600, 640,
      '<rect width="600" height="640" fill="#d9cdb4"/>' +
      '<rect x="50" y="70" width="500" height="500" rx="16" fill="#f7f0de" stroke="#8a7a58" stroke-width="4" transform="rotate(' + (i ? -4 : 0) + ' 300 320)"/>' +
      '<g transform="rotate(' + (i ? -4 : 0) + ' 300 320)"><path d="' + d + '" fill="none" stroke="#8a7a58" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>' + spaces +
      '<text x="125" y="118" font-family="Georgia,serif" font-size="20" fill="#5a4c2e">START</text>' +
      '<text x="475" y="532" text-anchor="end" font-family="Georgia,serif" font-size="20" fill="#5a4c2e">FINIŠ</text></g>' +
      '<g><circle cx="455" cy="600" r="20" fill="' + p[2] + '"/><circle cx="455" cy="575" r="13" fill="' + p[2] + '"/>' +
      '<circle cx="510" cy="600" r="20" fill="' + p[3] + '"/><circle cx="510" cy="575" r="13" fill="' + p[3] + '"/></g>');
  }

  function box(color) {
    return svg(600, 640,
      '<rect width="600" height="640" fill="#e8e2d3"/>' +
      '<rect x="110" y="140" width="380" height="380" rx="14" fill="#5d5340" opacity=".25" transform="translate(16 18)"/>' +
      '<rect x="110" y="140" width="380" height="380" rx="14" fill="' + color + '"/>' +
      '<rect x="135" y="165" width="330" height="330" rx="8" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>' +
      '<circle cx="300" cy="290" r="70" fill="#fff" fill-opacity=".2"/>' +
      '<circle cx="270" cy="275" r="18" fill="#f0c048"/><circle cx="330" cy="300" r="18" fill="#fff"/><circle cx="295" cy="330" r="18" fill="#c4552f"/>' +
      '<text x="300" y="420" text-anchor="middle" font-family="Georgia,serif" font-size="40" font-weight="700" fill="#fff">LAUAMÄNG</text>' +
      '<text x="300" y="456" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#fff" fill-opacity=".85">2–5 mängijat · 8+</text>');
  }

  window.DEMO_SETTINGS = {
    poe_nimi: 'Valdek Laur',
    tutvustus: 'Kalendrid ja lauamängud otse tegijalt',
    saatmistasu: 3.5,
    saaja_nimi: 'Valdek Laur',
    iban: 'EE00 0000 0000 0000 0000',
    makse_tahtaeg_paevi: 5,
    makse_lisainfo: 'Saadame paki teele pärast makse laekumist.'
  };

  window.DEMO_PRODUCTS = [
    {
      id: 'demo1', title: 'Kalender 2027', price: 15, visible: true, order: 1,
      description: 'NÄIDISTEKST. Seinakalender 2027. aastaks. Iga kuu juures on suur pilt ja kuupäevade juures piisavalt ruumi, et märkmeid kirja panna.\n\nSiia kirjutate halduslehel oma tootekirjelduse.',
      images: [0, 1, 2, 3, 4, 5].map(calendar)
    },
    {
      id: 'demo2', title: 'Lauamäng', price: 29, visible: true, order: 2,
      description: 'NÄIDISTEKST. Lauamäng kogu perele. Mängulaud, nupud ja täring on karbis olemas, reeglid on lihtsad ja eesti keeles.\n\nSiia kirjutate halduslehel oma tootekirjelduse.',
      images: [box('#3e5d3b'), board(0), board(1)]
    },
    {
      id: 'demo3', title: 'Kinkekomplekt', price: 39, visible: true, order: 3,
      description: 'NÄIDISTEKST. Kalender ja lauamäng koos, soodsama hinnaga.\n\nSiia kirjutate halduslehel oma tootekirjelduse.',
      images: [box('#7a3550'), calendar(2)]
    }
  ];
})();
