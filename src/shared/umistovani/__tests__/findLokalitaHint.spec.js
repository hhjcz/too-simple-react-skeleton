/** Created by hhj on 2/5/16. */
/* eslint-disable max-len */
import { expect } from 'chai'
import findLokalitaHint from '../findLokalitaHint'

describe('umistovani findLokalitaHint', () => {

  it('should find correct hints', () => {
    /* [ jmeno, obec, ulice, cislo, cisloDoplnkove, op ] */
    const names = [
      ['A1AT-ASCENDUM.NYRANY_123471', '', '', '', '', '123471'],
      ['X.PRG.HVEZDOVA2A', 'Praha', 'HVEZDOVA', '2', 'a', ''],
      ['XC.PRG.BUDEJOVICKA13-2', 'Praha', 'BUDEJOVICKA', '13', '', ''],
      ['rc.prg.kloknerova26 (ZSMV-PRA-KLOKNEROVA_136675)', 'Praha', 'kloknerova', '26', '', '136675'],
      ['XC.OST.28RIJNA65', 'Ostrava', '28RIJNA', '65', '', ''],
      ['[CBL] TEP Prestanov - Vodojem', '', 'TEP Prestanov', '', '', ''],
      ['[CBL] PHA Dusni10 - Burzak', '', 'PHA Dusni', '10', '', ''],
      ['[SummitD] HradecVZP-Brezhradska148_ETH117796', '', 'HradecVZP', '', '', '117796'],
      ['[cbl] OstravaVitkovice--Horni', '', 'OstravaVitkovice', '', '', ''],
      ['[CBL] CBU_Plana - GOMEL_117744', '', 'CBU_Plana', '', '', '117744'],
      ['xc.prg.ocelarska10-2', 'Praha', 'ocelarska', '10', '', ''],
      ['rc.prg.napankraci72-1-adsl', 'Praha', 'napankraci', '72', '', ''],
      ['rc.trem.plzenska1067-primary', 'trem', 'plzenska', '1067', '', '1067'],
      ['[CERAGON] Sokolska-Drtinova10 (libertas_119674)', '', 'Sokolska', '', '', '119674'],
      ['op.pri.komin', 'Pribram', 'komin', '', '', ''],
      ['[CERAGON] Dobronicka1257-Eltodo (Vimbou)', '', 'Dobronicka', '1257', '', '1257'],
      ['[CERAGON] Dobronicka1257b-Eltodo (Vimbou)', '', 'Dobronicka', '1257', 'b', '1257'],
      ['[CERAGON] Dobronicka1257B-Eltodo (Vimbou)', '', 'Dobronicka', '1257', 'b', '1257'],
      ['Coca-Cola - TEP - Krupka - Kateřinská 95 (SA-3520)', '', '', '', '', 'SA-3520'],
      ['[SUMMITD] Pardubice_ZavoduMiru-CBL_KeKamenici (cbl_69734)', '', 'Pardubice_ZavoduMiru', '', '', '69734'],
    ]

    names.forEach(nameMatch => {
      const lokalitaHint = findLokalitaHint(nameMatch[0])
      expect(lokalitaHint.obec).to.equal(nameMatch[1])
      expect(lokalitaHint.ulice).to.equal(nameMatch[2])
      expect(lokalitaHint.cislo).to.equal(nameMatch[3])
      expect(lokalitaHint.cispop).to.equal(nameMatch[3])
      expect(lokalitaHint.cisori).to.equal(nameMatch[3])
      expect(lokalitaHint.chardop).to.equal(nameMatch[4])
      expect(lokalitaHint.op).to.equal(nameMatch[5])
    })
  })

})
