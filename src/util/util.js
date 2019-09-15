export default {
    converterISOStringParaDate(s, considerarTimeZone) {
        const b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])); 
    },

    obterDataTimestamp(timestamp) {
        const s = timestamp.substring(0, timestamp.indexOf('T'));
        const data = {
            dia: s.split('-')[2],
            mes: s.split('-')[1],
            ano: s.split('-')[0],
        }
        
        return `${data.dia}/${data.mes}/${data.ano}`;
    },

    obterHorasTimestamp(timestamp) {
        const s = timestamp.substring(timestamp.indexOf('T') + 1, timestamp.indexOf('.'));
        const time = {
            horas: s.split(':')[0],
            minutos: s.split(':')[1]
        }
        
        return `${time.horas}:${time.minutos}`;
    },

    doubleParaMonetario(d) {
        if(d) {
            const toStr = `${d}`.replace('.', ',');
            const casasDecimais = toStr.split(',')[1].length;
            
            if(casasDecimais > 2) {
                return toStr.split(',')[0] + toStr.split(',')[1].substring(0, 2);
            } else if(casasDecimais < 2) {
                return toStr + '0';
            }
            return toStr;
        }
        return;
    },
    
    monetarioParaDouble(m) {
        if(m) {
            return parseFloat(m.replace('.', ','));
        }
        return;
    },

    obterValorPorChave(key, collection) {
        collection.map(item => {
            if(item.key === key)
                return item.value;
        });

        return undefined;
    }
}