// =====================================================================
// 1. BANCO DE DADOS GLOBAL E VARIÁVEIS DE ESTADO
// =====================================================================

/**
 * Mapeamento dos códigos internos para Cliente e Código da Peça.
 * @type {Object<string, {cliente: string, codPeca: string}>}
 */
const pecasData = {
   
    "0007": { cliente: "TESTE", codPeca: "AGENTE SECRETO" },
    "165002": { cliente: "AAM", codPeca: "P40055319 I  5318 " },
    "165003": { cliente: "AAM", codPeca: "P40055041 I  5040 " },
    "165004": { cliente: "AAM", codPeca: "40051651 Br   40051650 Us" },
    "165005": { cliente: "AAM", codPeca: "40051640 Br   40051178 Us" },
    "165006": { cliente: "AAM", codPeca: "40048064  1073 " },
    "165007": { cliente: "AAM", codPeca: "40061460" },
    "165009": { cliente: "AAM", codPeca: "40055170 Br   40055169 Us" },
    "165010": { cliente: "AAM", codPeca: "40075341" },
    "165011": { cliente: "AAM", codPeca: "40075343" },
    "165012": { cliente: "AAM", codPeca: "14035385" },
    "165013": { cliente: "AAM", codPeca: "40057395" },
    "165014": { cliente: "AAM", codPeca: "40142508" },
    "165015": { cliente: "AAM", codPeca: "40008169" },
    "165016": { cliente: "AAM", codPeca: "40143497   40143496 " },
    "165017": { cliente: "AAM", codPeca: "P40109306A" },
    "165018": { cliente: "AAM", codPeca: "40175990   40175989" },
    "165019": { cliente: "AAM", codPeca: "40144073   40144072" },
    "165020": { cliente: "AAM", codPeca: "40147153" },
    "165021": { cliente: "AAM", codPeca: "40168696   40168695" },
    "165022": { cliente: "AAM", codPeca: "40173802" },
    "165023": { cliente: "AAM", codPeca: "40191149" },
    "165024": { cliente: "AAM", codPeca: "40205904" },
    "165025": { cliente: "AAM", codPeca: "40206331" },
    "165004/1": { cliente: "AAM", codPeca: "CORPO PROVA 1640 1651" },
    "135014": { cliente: "ACI/ RENAULT", codPeca: "43200 7885R" },
    "161010": { cliente: "METALSIDER", codPeca: "52004061  52004060 Mont  Esq   341SX " },
    "161011": { cliente: "METALSIDER", codPeca: "52004042  52004041 Mont  Dir   341DX " },
    "161013": { cliente: "METALSIDER", codPeca: "51843565 DX RG" },
    "161014": { cliente: "METALSIDER", codPeca: "51843567 SX RG" },
    "161015": { cliente: "METALSIDER", codPeca: "51833695 SX RP" },
    "161016": { cliente: "METALSIDER", codPeca: "51833693 DX RP" },
    "161017": { cliente: "METALSIDER", codPeca: "51785018  51785020 SX" },
    "161018": { cliente: "METALSIDER", codPeca: "5178517  51785019 DX" },
    "161019": { cliente: "METALSIDER", codPeca: "51785022  51785024 SX" },
    "161020": { cliente: "METALSIDER", codPeca: "51785021  51785023 DX" },
    "161023": { cliente: "METALSIDER", codPeca: "52188117 52128108 RH " },
    "161024": { cliente: "METALSIDER", codPeca: "52128118 52128109 LH " },
    "161027": { cliente: "METALSIDER", codPeca: " 519428070 SX " },
    "201001": { cliente: "Continental", codPeca: "20 5252 8204 9 00" },
    "201002": { cliente: "Continental", codPeca: "20 5252 9207 9 00" },
    "201003": { cliente: "Continental", codPeca: "20 5252 9208 9 00" },
    "201004": { cliente: "Continental", codPeca: "20 5254 8205 9 00" },
    "201005": { cliente: "Continental", codPeca: "20 5254 9209 9  00" },
    "201006": { cliente: "Continental", codPeca: "20 5254 9210 9 00" },
    "201007": { cliente: "Continental", codPeca: "20 5257 8206 9 00" },
    "201008": { cliente: "Continental", codPeca: "20 5257 9211 9 00" },
    "201009": { cliente: "Continental", codPeca: "20 5257 9212 9  00" },
    "201010": { cliente: "Continental", codPeca: "20 5257 8209 9 00" },
    "201011": { cliente: "Continental", codPeca: "20 5257 9215 9 00" },
    "201012": { cliente: "Continental", codPeca: "20 5254 8207 9 00" },
    "201013": { cliente: "Continental", codPeca: "20 5254 8208 9 00" },
    "201014": { cliente: "Continental", codPeca: "20 5254 9213 9 00" },
    "201015": { cliente: "Continental", codPeca: "20 5254 9214 9 00" },
    "201016": { cliente: "Continental", codPeca: "20 5257 8212 9 00" },
    "201017": { cliente: "Continental", codPeca: "20 5257 9223 9 00" },
    "201018": { cliente: "Continental", codPeca: "20 5257 9224 9 00" },
    "201019": { cliente: "Continental", codPeca: "20 5254 8211 9 00" },
    "201020": { cliente: "Continental", codPeca: "20 5254 9221 9 00" },
    "201021": { cliente: "Continental", codPeca: "20 5254 9222 9 00" },
    "201022": { cliente: "Continental", codPeca: "20 5254 8210 9 00" },
    "201023": { cliente: "Continental", codPeca: "20 5254 9219 9 00" },
    "201024": { cliente: "Continental", codPeca: "20 5254 9220 9 00" },
    "201025": { cliente: "Continental", codPeca: "20 5254 9225 9 00" },
    "201026": { cliente: "Continental", codPeca: "20 5254 9226 9 00" },
    "201027": { cliente: "Continental", codPeca: "20 5248 8213 9 00" },
    "201028": { cliente: "Continental", codPeca: "20 5248 9227 9 00" },
    "201029": { cliente: "Continental", codPeca: "20 5248 9228 9 00" },
    "201030": { cliente: "Continental", codPeca: "20 5254 8214 9 00" },
    "201031": { cliente: "Continental", codPeca: "20 5254 9229 9 00" },
    "201032": { cliente: "Continental", codPeca: "20 5254 9231 9 00" },
    "201033": { cliente: "Continental", codPeca: "20 5254 9232 9 00" },
    "201034": { cliente: "Continental", codPeca: "20 5522 1436 9 00" },
    "201035": { cliente: "Continental", codPeca: "20 5522 1438 9 00" },
    "201045": { cliente: "Continental", codPeca: "20 5254 8215 9 00" },
    "201037": { cliente: "Continental", codPeca: " 20 5522 1439 9 00" },
    "201038": { cliente: "Continental", codPeca: " 20 5522 1440 9 00" },
    "201039": { cliente: "Continental", codPeca: "20 5254 9203 9 " },
    "201040": { cliente: "Continental", codPeca: "20 5254 9204 9 00" },
    "201041": { cliente: "Continental", codPeca: "20 5254 8202 9 " },
    "201042": { cliente: "Continental", codPeca: "20 5522 1442 9" },
    "201046": { cliente: "Continental", codPeca: "20 5254 9237 9" },
    "201044": { cliente: "Continental", codPeca: "20 5254 9236 9" },
    "201048": { cliente: "Continental", codPeca: " 20 5523 1143 9" },
    "201047": { cliente: "Continental", codPeca: "20 5254 9238 9" },
    "201043": { cliente: "Continental", codPeca: "20 5254 9235 9" },
    "201050": { cliente: "Continental", codPeca: " 20 5520 1236 9" },
    "201051": { cliente: "Continental", codPeca: "20 5520 1372 9" },
    "202001": { cliente: "OMR", codPeca: "PG16 0196" },
    "189005": { cliente: "OMR", codPeca: "CA070 7 0015325 00" },
    "142015": { cliente: "MUVIQ", codPeca: "WHRZ 196" },
    "142016": { cliente: "MUVIQ", codPeca: "WHRZ 191" },
    "142017": { cliente: "MUVIQ", codPeca: "WRRQ 97" },
    "142018": { cliente: "MUVIQ", codPeca: "WRRQ 77" },
    "142019": { cliente: "MUVIQ", codPeca: "WHRZ 159" },
    "161003": { cliente: "OMR", codPeca: "55224355" },
    "161005": { cliente: "OMR", codPeca: "51967259" },
    "161006": { cliente: "OMR", codPeca: "51967260" },
    "161007": { cliente: "OMR", codPeca: "55260123" },
    "161008": { cliente: "OMR", codPeca: "46806233" },
    "161009": { cliente: "OMR", codPeca: "46806234" },
    "161012": { cliente: "OMR", codPeca: "46833807 46833806" },
    "161021": { cliente: "OMR", codPeca: "55224429" },
    "161022": { cliente: "OMR", codPeca: "55278884" },
    "170001": { cliente: "HALDEX", codPeca: "3662HB" },
    "170002": { cliente: "HALDEX", codPeca: "3663HB" },
    "170003": { cliente: "HALDEX", codPeca: "4083HB" },
    "170004": { cliente: "HALDEX", codPeca: "4084HB" },
    "170005": { cliente: "HALDEX", codPeca: "5056HB" },
    "170006": { cliente: "HALDEX", codPeca: "3226" },
    "170007": { cliente: "HALDEX", codPeca: "4020" },
    "170008": { cliente: "HALDEX", codPeca: "4021" },
    "170009": { cliente: "HALDEX", codPeca: "3860" },
    "170010": { cliente: "HALDEX", codPeca: "3861" },
    "170011": { cliente: "HALDEX", codPeca: "4024" },
    "170012": { cliente: "HALDEX", codPeca: "5064HB" },
    "170013": { cliente: "HALDEX", codPeca: "5065HB" },
    "170014": { cliente: "HALDEX", codPeca: "4158" },
    "170015": { cliente: "HALDEX", codPeca: "4163" },
    "170016": { cliente: "HALDEX", codPeca: "4164" },
    "170017": { cliente: "HALDEX", codPeca: "475 20003" },
    "170018": { cliente: "HALDEX", codPeca: "4171" },
    "170019": { cliente: "HALDEX", codPeca: "5123" },
    "170020": { cliente: "HALDEX", codPeca: "5122" },
    "170021": { cliente: "HALDEX", codPeca: "3900HB" },
    "170022": { cliente: "HALDEX", codPeca: "4096" },
    "170023": { cliente: "HALDEX", codPeca: "2760" },
    "170024": { cliente: "HALDEX", codPeca: "2761" },
    "170025": { cliente: "HALDEX", codPeca: "4179" },
    "170026": { cliente: "HALDEX", codPeca: "5015" },
    "170027": { cliente: "HALDEX", codPeca: "5016" },
    "170028": { cliente: "HALDEX", codPeca: "5188" },
    "170029": { cliente: "HALDEX", codPeca: "5189" },
    "192004": { cliente: "OMR", codPeca: "51211 TGKF T600" },
    "192005": { cliente: "OMR", codPeca: "51216 TGKF T600" },
    "192006": { cliente: "OMR", codPeca: "51211 TRY M000" },
    "192007": { cliente: "OMR", codPeca: "51216 TRY M000" },
    "192008": { cliente: "OMR", codPeca: "51211 TEA T000" },
    "192009": { cliente: "OMR", codPeca: "51216 TEA T000" },
    "192017": { cliente: "OMR", codPeca: "51211 T7A 0000" },
    "192018": { cliente: "OMR", codPeca: "51216 T7A 0000" },
    "192012": { cliente: "OMR", codPeca: "42101 T7A 0000" },
    "192013": { cliente: "OMR", codPeca: "42102 T7A 0000" },
    "192014": { cliente: "OMR", codPeca: "11121 a 11124 XZ1C V000" },
    "192015": { cliente: "OMR", codPeca: "51211 T00A T000" },
    "192016": { cliente: "OMR", codPeca: "51216 T00A T000" },
    "190001": { cliente: "OMR", codPeca: "2T2 131 807 A" },
    "190002": { cliente: "OMR", codPeca: "2T2 131 807 B" },
    "204001": { cliente: "Mando", codPeca: "BC 140 249 00F0 BC 140 249 00 " },
    "204002": { cliente: "Mando", codPeca: "BC 141 249 00F0 BC 141 249 00 " },
    "204003": { cliente: "Mando", codPeca: "BC 412 235 00D0" },
    "204004": { cliente: "Mando", codPeca: "BC 140 285 00" },
    "204005": { cliente: "Mando", codPeca: "BC412   B4200" },
    "204006": { cliente: "Mando", codPeca: " BC 140 B 5100LH" },
    "204007": { cliente: "Mando", codPeca: "BC 141 B 5100RH" },
    "204008": { cliente: "Mando", codPeca: " BC 412 B 3000" },
    "204009": { cliente: "Mando", codPeca: " BC 412 B 3100" },
    "204010": { cliente: "Mando", codPeca: " BC 412 A 7100" },
    "200001": { cliente: "OMR", codPeca: "CA 350209" },
    "196001": { cliente: "OMR", codPeca: "12651390" },
    "136002": { cliente: "OMR", codPeca: "46751188" },
    "136003": { cliente: "OMR", codPeca: "46752132" },
    "136011": { cliente: "OMR", codPeca: "51789167" },
    "136012": { cliente: "OMR", codPeca: "51769812 13" },
    "136013": { cliente: "OMR", codPeca: "51769814 15" },
    "136014": { cliente: "OMR", codPeca: "504246045 701 " },
    "136015": { cliente: "OMR", codPeca: "55191802 801 " },
    "136018": { cliente: "OMR", codPeca: "ROH 030 105 271 H Br  030 105 271 J Us" },
    "136001": { cliente: "OMR", codPeca: "50017754 Cav  7á12" },
    "136003/1": { cliente: "OMR", codPeca: "46752132 Mod 2 " },
    "136021": { cliente: "OMR", codPeca: "500377484" },
    "136023": { cliente: "OMR", codPeca: "504063590" },
    "136024": { cliente: "OMR", codPeca: "504388461" },
    "136027": { cliente: "OMR", codPeca: "51850226" },
    "136029": { cliente: "OMR", codPeca: "04C 105 273 L" },
    "136029/1": { cliente: "OMR", codPeca: "04C 105 273 D" },
    "136030": { cliente: "OMR", codPeca: "55268174" },
    "136031": { cliente: "OMR", codPeca: "51989071" },
    "136032": { cliente: "OMR", codPeca: "52045806  4022 " },
    "136033": { cliente: "OMR", codPeca: "25203896 25203897" },
    "136034": { cliente: "OMR", codPeca: "04C 105 269 Q" },
    "136035": { cliente: "OMR", codPeca: " 25206075  25198629 " },
    "136036": { cliente: "OMR", codPeca: " 5802272381" },
    "136037": { cliente: "OMR", codPeca: "52109525" },
    "136038": { cliente: "OMR", codPeca: "136 038" },
    "136039": { cliente: "OMR", codPeca: "5802522700" },
    "136040": { cliente: "OMR", codPeca: "04C 105 273 N Br" },
    "136041": { cliente: "OMR", codPeca: "46338499M" },
    "136045": { cliente: "OMR", codPeca: "52160014" },
    "136046": { cliente: "OMR", codPeca: "52160017" },
    "136043": { cliente: "OMR", codPeca: "52160013" },
    "136044": { cliente: "OMR", codPeca: "52160016" },
    "1D116026": { cliente: "SACHS", codPeca: "9 002 017 099" },
    "116027": { cliente: "SACHS", codPeca: "9 002 119 099" },
    "116028": { cliente: "SACHS", codPeca: "9 112 003 099" },
    "116029": { cliente: "SACHS", codPeca: "9 114 004 099" },
    "116030": { cliente: "SACHS", codPeca: "9 402 104 099" },
    "116031": { cliente: "SACHS", codPeca: "9 002 120 099" },
    "116034": { cliente: "SACHS", codPeca: "9 002 058 199" },
    "116036": { cliente: "SACHS", codPeca: "3 114 120 199" },
    "116037": { cliente: "SACHS", codPeca: "9 002 121 099" },
    "116039": { cliente: "SACHS", codPeca: "3 002 211 099" },
    "116040": { cliente: "SACHS", codPeca: "9 402 091 099" },
    "116045": { cliente: "SACHS", codPeca: "9 402 079 099" },
    "116046": { cliente: "SACHS", codPeca: "9 402 099 099" },
    "116047": { cliente: "SACHS", codPeca: "9 402 075 099" },
    "116048": { cliente: "SACHS", codPeca: "9 802 065 099" },
    "116049": { cliente: "SACHS", codPeca: "9 402 086 099" },
    "116050": { cliente: "SACHS", codPeca: "9 402 106 099" },
    "116053": { cliente: "SACHS", codPeca: "9 002 117 099" },
    "116058": { cliente: "SACHS", codPeca: "9 842 007 099" },
    "116071": { cliente: "SACHS", codPeca: "9 002 012 099" },
    "116072": { cliente: "SACHS", codPeca: "9 402 078 099" },
    "116075": { cliente: "SACHS", codPeca: "9 402 098 099" },
    "116076": { cliente: "SACHS", codPeca: "9 402 100 099" },
    "1E116078": { cliente: "SACHS", codPeca: "3 402 000 162" },
    "116079": { cliente: "SACHS", codPeca: "3 002 000 236" },
    "116080": { cliente: "SACHS", codPeca: "3 002 000 066" },
    "116082": { cliente: "SACHS", codPeca: "3 002 000 174" },
    "116084": { cliente: "SACHS", codPeca: "3 402 000 063" },
    "116085": { cliente: "SACHS", codPeca: "3 402 072 099" },
    "116086": { cliente: "SACHS", codPeca: "3402 077 190" },
    "116087": { cliente: "SACHS", codPeca: "9002 006 099" },
    "116088": { cliente: "SACHS", codPeca: "3002 000 816" },
    "116090": { cliente: "SACHS", codPeca: "3 002 102 090" },
    "116093": { cliente: "SACHS", codPeca: "9402 003 199" },
    "116096": { cliente: "SACHS", codPeca: "3002 001 720" },
    "116006/1": { cliente: "SACHS", codPeca: "9 002 009 099  Sand  " },
    "116080/1": { cliente: "SACHS", codPeca: "3 002 000 066 Sand  " },
    "100001/12B": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100001/18B": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100001/18U": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100001/24A": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100001/S4": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100001/18A": { cliente: "Sada Siderurgia", codPeca: "ø 15mm" },
    "100002/12B": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100002/18B": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100002/18U": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100002/24A": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100002/S4": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100002/18A": { cliente: "Sada Siderurgia", codPeca: "ø 17mm" },
    "100003/12B": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/18B": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/18U": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/24A": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/S24": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/S30": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/S4": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/18A": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100003/S27": { cliente: "Sada Siderurgia", codPeca: "ø 20mm" },
    "100004/12B": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/18B": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/18U": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/24A": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/S24": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/S30": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/S4": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/18A": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100004/S27": { cliente: "Sada Siderurgia", codPeca: "ø 25mm" },
    "100005/11B": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/12B": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/18U": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/24A": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/S24": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/S30": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/S4": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/18A": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100005/S27": { cliente: "Sada Siderurgia", codPeca: "ø 30mm" },
    "100006/12B": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/18B": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/15U": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/24A": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/S24": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/S30": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/S4": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/18A": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/S27": { cliente: "Sada Siderurgia", codPeca: "ø 40mm" },
    "100006/118U": { cliente: "Sada Siderurgia", codPeca: "ø 2,5´´" },
    "100006/1S4": { cliente: "Sada Siderurgia", codPeca: "ø 2,5´´" },
    "100006/124A": { cliente: "Sada Siderurgia", codPeca: "ø 2,5´´" },
    "100006/1S18MUSA": { cliente: "Sada Siderurgia", codPeca: "ø 2,5´´" },
    "100006/111B": { cliente: "Sada Siderurgia", codPeca: "ø 2,5´´" },
    "100008/11B": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/18A": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/18B": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/15U": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/S12": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/24U": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/S4": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/S30": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100008/S27": { cliente: "Sada Siderurgia", codPeca: "ø 60mm" },
    "100009/11B": { cliente: "Sada Siderurgia", codPeca: "ø 70mm" },
    "100009/18A": { cliente: "Sada Siderurgia", codPeca: "ø 70mm" },
    "100009/S12": { cliente: "Sada Siderurgia", codPeca: "ø 70mm" },
    "100011/18A": { cliente: "Sada Siderurgia", codPeca: "ø 80mm" },
    "100012/18A": { cliente: "Sada Siderurgia", codPeca: "ø 90mm" },
    "100013/18A": { cliente: "Sada Siderurgia", codPeca: "ø 100mm" },
    "100014/18A": { cliente: "Sada Siderurgia", codPeca: "ø 3 " },
    "100014/11B": { cliente: "Sada Siderurgia", codPeca: "ø 3 " },
    "100014/24A": { cliente: "Sada Siderurgia", codPeca: "ø 3 " },
    "100036/11B": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/12B": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/18B": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/15U": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/24A": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/S4": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/18A": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/S27": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100036/S30": { cliente: "Sada Siderurgia", codPeca: "ø 50mm" },
    "100014/18U": { cliente: "Sada Siderurgia", codPeca: "ø 3 " },
    "100012/12B": { cliente: "Sada Siderurgia", codPeca: "ø 90mm" },
    "158001": { cliente: "ZF Lemforder", codPeca: "055 060 008 103" },
    "158002": { cliente: "ZF Lemforder", codPeca: "062 060 007 103" },
    "158003": { cliente: "ZF Lemforder", codPeca: "070 060 033 103" },
    "158004": { cliente: "ZF Lemforder", codPeca: "070 060 037 103" },
    "158005": { cliente: "ZF Lemforder", codPeca: "062 060 024 103" },
    "158006": { cliente: "ZF Lemforder", codPeca: "062 060 032 103" },
    "158007": { cliente: "ZF Lemforder", codPeca: "782 215 139 290B" },
    "158008": { cliente: "ZF Lemforder", codPeca: "782 215 139 289B" },
    "158009": { cliente: "ZF Lemforder", codPeca: "070 060 066 103" },
    "158010": { cliente: "ZF Lemforder", codPeca: "062 060 046 103" },
    "158011": { cliente: "ZF Lemforder", codPeca: "062 060 048 103" },
    "149013": { cliente: "OMR", codPeca: "5Z0 422 407 A" },
    "161028": { cliente: "METALSIDER", codPeca: "519428060 DX " },
    "201052": { cliente: "Continental", codPeca: "20 5520 1237 9 " },
    "136051": { cliente: "OMR", codPeca: "51211 39KZ M000" },
    "136052": { cliente: "OMR", codPeca: "51216 39KZ M000" },
    "201053": { cliente: "Continental", codPeca: "20 5523 1271 9 " },
    "161025": { cliente: "METALSIDER", codPeca: "519428050 SX " },
    "161026": { cliente: "METALSIDER", codPeca: "519428040 DX " },
    "136053": { cliente: "OMR", codPeca: "Suporte 46358955" },
    "170034": { cliente: "HALDEX", codPeca: "5031" },
    "170032": { cliente: "HALDEX", codPeca: "5018" },
    "170030": { cliente: "HALDEX", codPeca: "5017" },
    "170033": { cliente: "HALDEX", codPeca: "5203 ADI" },
    "170031": { cliente: "HALDEX", codPeca: "5202 ADI" },
    "170035": { cliente: "HALDEX", codPeca: "5204 ADI" },
    "204014": { cliente: "Mando", codPeca: "BC 140 B93 00" },
    "204013": { cliente: "Mando", codPeca: "BC 412 C11 00" },
    "204015": { cliente: "Mando", codPeca: "BC 412 355 00" },
    "204016": { cliente: "Mando", codPeca: "BC 140 424 00" },
    "204017": { cliente: "Mando", codPeca: "BC 412 C10 00" },
    "204018": { cliente: "Mando", codPeca: "BC 140 B92 00" },
    "161029": { cliente: "METALSIDER", codPeca: "52265699 SX" },
    "161030": { cliente: "METALSIDER", codPeca: "52265698 DX" },
    "136058": { cliente: "OMR ", codPeca: "52264095 3443490 " }
};

/**
 * Lista de defeitos completa.
 * @type {string[]}
 */
const listaDeDefeitos = [
    "1 Exc.de cola", "2 Modelo Defeituoso", "3 Porosidade", "4 Fervura", "5 Penetração Metálica", 
    "6 Escama", "7 Inc.de Areia", "8 Molde Quebrado", "9 Molde Esmagado", "10 Molde Mole", 
    "11 Desencontro", "12 Empenado", "13 Inchamento", "14 Molde Vazado", "15 Falta de Macho", 
    "16 Macho Vazado", "17 Macho Deslocado", "18 Macho Quebrado", "19 Macho Trocado", "20 Rebarba de Macho", 
    "21 Rechupe", "22 Inc.Cementita", "23 Dureza Alta", "24 Dureza Baixa", "25 Inc.de Escórea", 
    "26 Ferro Frio", "27 Vaz.Interrompido", "28 Vaz.Incompleto", "29 Trincado", "30 Quebra Manuseio", 
    "31 Gases", "32 Amassado Manuseio", "33 Amassado Desmoldamento", "34 Fratura Canal", "35 Junta Fria", 
    "36 Trinca Quente", "37 Gota Fria", "38 Nodulização Baixa", "39 Quebrana Desmoldagem", "40 Depressão", 
    "41 Exc.Limpeza", "42 Exc.Rebarbação", "43 Destruídap/Teste", "44 Inc.de Liga", "45 Molde Trincado", 
    "46 Explosão de Molde", "47 Furo Deslocado", "48 Matriz Fora", "49 Bola Bicuda", "50 Quebra Quente", 
    "51 Composição QuímicaFora", "52 Areia Sinterizada", "53 Furo Maior", "54 Tração Baixa", "55 Parede Fina", 
    "56 Alongamento Baixo", "57 Dimensional Fora", "58 Inc.de Grumos", "59 Olho de Peixe", "60 Faltade Material", 
    "61 Peça Deslocada", "62 Oxidação", "63 Rabode Cometa", "64 Excesso de Rebarba", "65 Diferença", 
    "66 Descontinuidade", "67 Areiade Macho", "68 Sanidade Interna", "69 Gravação Ilegivel", "70 Grafita Explodida", 
    "71 Suspeita de Cementita",
];

/**
 * Mapeamento dos defeitos para os índices das colunas na tabela de exportação.
 * @type {Object<string, number>}
 */
const mapaDefeitosParaIndiceCSV = {};
listaDeDefeitos.forEach((defeito, index) => {
    // Índice base zero
    mapaDefeitosParaIndiceCSV[defeito] = index;
});


// --- Constantes do Sistema ---

/**
 * Versão da aplicação (Usada na aba de Metadados de Controle).
 * @type {string}
 */
const APLICACAO_VERSAO = "1.3 (Com Coerência ISO/IATF)"; // NOVO: Versão da aplicação para rastreabilidade


// --- Variáveis de Estado Global ---

/**
 * Armazena os dados da PEÇA ATUAL (preenchidos em 'Dados Iniciais').
 * @type {Object}
 */
let dadosIniciais = {}; 

/**
 * Indica se os dados iniciais foram preenchidos pelo menos uma vez.
 * @type {boolean}
 */
let dadosIniciaisPreenchidos = false;

/**
 * Armazena o histórico completo de apontamentos (refugos e liberadas) de todas as peças.
 * Cada item contém o contexto da peça.
 * @type {Array<Object>}
 */
let apontamentos = [];

/**
 * A cavidade selecionada no momento.
 * @type {number | null}
 */
let cavidadeAtual = null;

/**
 * O defeito selecionado no modal.
 * @type {string | null}
 */
let defeitoAtual = null;

/**
 * A Data de Fundição ativa para o registro de apontamentos.
 * @type {string}
 */
let dataFundicaoAtiva = '';

/**
 * Lista de todas as datas de fundição disponíveis para a peça atual/sessão.
 * @type {string[]}
 */
let datasFundicaoDisponiveis = [];

/**
 * Ordem de exibição dos botões de defeito, com os mais usados no topo.
 * @type {string[]}
 */
let ordemDefeitosAtual = [...listaDeDefeitos];

/**
 * Variáveis globais para instâncias dos gráficos Chart.js.
 * @type {Chart | null}
 */
let graficoDefeitosInstance = null;
let graficoCavidadesInstance = null;

/**
 * ID do intervalo para o salvamento automático no Local Storage.
 * @type {number | null}
 */
let backupIntervalId = null;