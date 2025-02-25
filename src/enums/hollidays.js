function calcularCarnavalEAfins(ano) {
  const pascoa = new Date(ano, 2, 21)
  
  pascoa.setDate(pascoa.getDate() + (7 - pascoa.getDay()))
  
  const carnaval = new Date(pascoa)
  
  carnaval.setDate(pascoa.getDate() - 47)
  
  const sextaSanta = new Date(pascoa)
  
  sextaSanta.setDate(pascoa.getDate() - 2)
  
  const corpusChristi = new Date(pascoa)
  
  corpusChristi.setDate(pascoa.getDate() + 60)
  
  function formatarData(data) {
    return data.toLocaleDateString("pt-BR").split("/").reverse().join("-")
  }
  
  return {
    carnaval: formatarData(carnaval),
    
    sextaSanta: formatarData(sextaSanta),
    
    corpusChristi: formatarData(corpusChristi)
  }
}

const anoAtual = new Date().getFullYear()

const datasMoveis = calcularCarnavalEAfins(anoAtual)

const nationalHollidays = [
  { nome: "Confraternização Universal", data: `01-01-${anoAtual}` },
  { nome: "Carnaval", data: datasMoveis.carnaval },
  { nome: "Sexta-feira Santa", data: datasMoveis.sextaSanta },
  { nome: "Tiradentes", data: `21-04-${anoAtual}` },
  { nome: "Dia do Trabalho", data: `01-05-${anoAtual}` },
  { nome: "Corpus Christi", data: datasMoveis.corpusChristi },
  { nome: "Independência do Brasil", data: `07-09-${anoAtual}` },
  { nome: "Nossa Senhora Aparecida", data: `12-10-${anoAtual}` },
  { nome: "Finados", data: `02-11-${anoAtual}` },
  { nome: "Proclamação da República", data: `15-11-${anoAtual}` },
  { nome: "Natal", data: `25-12-${anoAtual}` }
]

export default nationalHollidays
