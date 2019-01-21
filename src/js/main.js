$(function(){
  $('.close-btn').click(function(){
    $(this).parent().hide().parents('.popup-wrap').hide();
  });

  $('.popup-buttons > a').click(function(){
    $(this).parents('.popup').hide().parents('.popup-wrap').hide();
  })
});

const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello',
    times: 1,
    tab: 1,
    current: 0,
    begin: 1,
    isRunning: false,
    sendData: null,
    prizeNumber: null,
    isLogin: true,
    records: null,
  },
  created() {
    this.msg = window.name;
  },
  methods: {
    start:function () {
      if (this.isRunning) return;
      var res = this.test();
      console.log(this.sendData);
      if(this.isLogin === false){
        $('.popup.login-popup').show().parents('.popup-wrap').show();
      }else if(this.times <= 0){
        $('.popup.noTimes-popup').show().parents('.popup-wrap').show();
      }else{
        this.game(res);
      }
      // $.ajax({
      //   methods: 'GET',
      //   url: '',
      //   dataType: 'json',
      //   success: function(data){
      //
      //   }
      // });
    },
    game: function (res) {
        this.isRunning = true;
        this.current = 0;
        this.begin = 1;
        let index = 64;
        // let res = this.test();
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
            if(this.sendData == 0){
              $('.popup.fail-popup').show().parents('.popup-wrap').show();
            }else if(this.sendData == 5){
              $('.popup.hongbao-popup').show().parents('.popup-wrap').show();
            }else{
              $('.popup.xianjin-popup').show().parents('.popup-wrap').show();
            }
            this.times--;
          } else {
            this.begin++;
          }
        }, 50);
    },
    getRecords: function(){
      this.tab = 0;
      // $.ajax({
      //   url: '',
      //   method: 'GET',
      //   dataType: 'json',
      //   success: function(){

      //   }
      // })
      let str = `
                <p class="record-date">2019年1月28日</p>
                <ul class="record-items">
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>2元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>2元现金</span></li>
                </ul>
                <p class="record-date">2019年1月28日</p>
                <ul class="record-items">
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>2元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>20元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>2元现金</span></li>
                  <li class="record-item"><span>第1次</span><span>2元现金</span></li>
                </ul>
      `;

      setTimeout(function(){
        vm.records = str;
      }, 1000)
    },
    test: function () {
      var result = this.getPrize();
      if (result == 1) {
        console.log('10元现金');
        this.sendData = 2;
        this.prizeNumber = 10;
      } else if (result == 2 || result == 6) {
        console.log('50元红包');
        this.sendData = 5;
      } else if (result == 3) {
        console.log('20元现金');
        this.sendData = 4;
        this.prizeNumber = 20;
      } else if (result == 4 || result == 8) {
        console.log('5元现金');
        this.sendData = 1;
        this.prizeNumber = 5;
      } else if (result == 5) {
        console.log('歇歇参与');
        this.sendData = 0;
      } else if (result == 7) {
        console.log('15元现金');
        this.sendData = 3;
        this.prizeNumber = 15;
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
