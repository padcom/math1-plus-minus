<template>
  <div id="app">
    <table>
      <tr>
        <td></td>
        <td v-for="digit in x.digits">{{digit}}</td>
      </tr>
      <tr>
        <td style="font-weight: bold">{{sign}}</td>
        <td v-for="digit in y.digits">{{digit}}</td>
      </tr>
      <tr>
        <td :colspan="length + 1"><hr/></td>
      </tr>
      <tr>
        <td></td>
        <td v-for="digit, index in result.digits">
          <input ref="digit" @keypress="check" maxlength="1"/>
        </td>
        <td style="padding-left: 40px">
          <button @click="verify">Sprawdź!</button>
        </td>
      </tr>
    </table>
    <div :style="{ marginTop: '50px', textAlign: 'center', color: status }">{{ message }}</div>
  </div>
</template>

<script>
const rnd = range => Math.floor(Math.random() * range)

const item = x => ({ value: x, digits: x.toString() })

const calcData = sign => {
  const x = rnd(1000) + 1
  const y = rnd(x) + 1
  return sign === 0 ? {
    x, y, result: x + y, sign: '+'
  } : {
    x, y, result: x - y, sign: '-'
  }
}

const stoi = s => s === '' ? 0 : Number.parseInt(s)

export default {
  name: 'app',
  data () {
    const { x, y, result, sign } = calcData(rnd(2) - 1)
    const data = { sign, x: item(x), y: item(y), result: item(result), message: '', status: '' }
    data.length = Math.max(data.result.digits.length, Math.max(data.x.digits.length, data.y.digits.length))
    data.x.digits = data.x.digits.padStart(data.length).split('')
    data.y.digits = data.y.digits.padStart(data.length).split('')
    data.result.digits = data.result.digits.padStart(data.length).split('')
    return data
  },
  methods: {
    verify () {
      let result = 0
      for (let i = 0; i < this.length; i++) {
        result = result + stoi(this.$refs.digit[i].value)
        if (i < this.length - 1) result = result * 10
      }
      if (result === this.result.value) {
        this.message = 'Dobrze!'
        this.status = 'green'
      } else {
        this.message = 'Spróbuj jeszcze raz...'
        this.status = 'black'
      }
    },
    check (e) {
      const digits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
      const allowedKeys = [ 'Tab', 'Enter', 'F5', 'Backspace' ].concat(digits)

      if (!allowedKeys.find(x => e.key === x)) {
        e.preventDefault()
        return false
      }

      if (e.key === 'Enter') {
        this.verify()
      }

      if (e.key === 'Tab') {
        e.target.selectAll()
      }

      if (digits.find(x => e.key === x)) {
        for (let i = 1; i < this.length; i++) {
          if (this.$refs.digit[i] === e.target) {
            this.$refs.digit[i - 1].focus()
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.digit[this.length - 1].focus()
  }
}
</script>

<style>
* {
  font-size: 30px;
}

#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

table {
  margin: auto;
}

td {
  text-align: right;
}

input {
  width: 1em;
  text-align: right;
}
</style>
