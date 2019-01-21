const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello',
    times: 1,
    tab: 1,
    current: 0,
    begin: 1,
    isRunning: false
  },
  created() {
    this.msg = window.name;
  },
  methods: {
    start: function () {
      if (this.isRunning) return;
        this.isRunning = true;
        this.current = 0;
        this.begin = 1;
        let index = 64;
        let res = this.test();
        index = Number(index) + Number(res);
        var interval1 = setInterval(() => {
          var currentIndex = this.begin % 8;
          if (currentIndex === 0) {
            this.current = 8;
          } else {
            this.current = currentIndex
          }
          if (this.begin >= index) {
            this.isRunning = false;
            clearInterval(interval1);
          } else {
            this.begin++;
          }
        }, 50);
    },
    test: function () {
      var result = this.getPrize();
      if (result == 1) {
        console.log('10元现金');
      } else if (result == 2 || result == 6) {
        console.log('50元红包');
      } else if (result == 3) {
        console.log('20元现金');
      } else if (result == 4 || result == 8) {
        console.log('5元现金');
      } else if (result == 5) {
        console.log('歇歇参与');
      } else if (result == 7) {
        console.log('15元红包')
      }
      return result;
    },
    getPrize: function () {
      var lucks = [5, 30, 0.1, 5, 13.9, 30, 1, 5];
      var items = [1, 2, 3, 4, 5, 6, 7, 8];
      return this.goodLuck(items, lucks);
    },
    goodLuck: function (obj, luck) {
      var sum = 0, factor = 0, random = Math.random();
      for (var i = luck.length - 1; i >= 0; i--) {
        sum += luck[i];
      }
      random *= sum;
      for (var i = luck.length - 1; i >= 0; i--) {
        factor += luck[i];
        if (random <= factor) return obj[i];
      }
      return null;
    }
  }
});
