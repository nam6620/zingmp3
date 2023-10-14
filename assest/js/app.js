
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER__STORAGE_KEY = "F8_PLAYER";

const player = $(".app");
const input = $("#progress");
const bar = $(".progress-bar");
const thumb = $(".thumb");
const input__volume = $("#progress__volume");
const bar__volume = $(".progress-bar__volume");
const thumb__volume = $(".thumb__volume");
const bntRightNav = $(".js__btn-rightnav");
const nav__right = $(".nav__right");
const playListmain = $(".personal__nav-playlist--songlist");
const audio = $("#audio");
const showsong__img = $(".showsong__img");
const name__song = $(".name__song");
const author__song = $(".author__song");
const playBtn = $(".btn-toggle-play");
const animationPause = $(
  ".personal__nav-playlist--songlist-left-img-icon-pause"
);
const animationPlaying = $(
  ".personal__nav-playlist--songlist-left-img-icon-pause-play"
);
const endTime = $(".end__time");
const current__time = $(".current__time");
const nextBtn = $(".btn-next");
const prevBtn= $(".btn-prev");
const ramBtn=$(".btn-random");
const repeatBtn=$(".btn-repeat");
const btn_repeat_1= $(".btn-repeat-1");
const volume__notice=$(".volume__notice");
const content=$(".content");
const header=$(".header");
const listMiniPlaying=$(".nav__right-playlist-playing");
const listMiniContinte=$(".nav__right-continue-playlist");
const personalHeaderIcon=$(".personal__header");
const app = {
  currentIndex: 0,
  navRightIndex: false,
  isPlaying: false,
  isRandom: false,
  isRepeat: 0,
  volume: 100,
  config: JSON.parse(localStorage.getItem(PLAYER__STORAGE_KEY)) || {},
  songs: [
    {
      name: "Anh Đã Lạc Vào (Đại Mèo Remix)",
      singer: "Green",
      path: "./assest/music/music__song/0.mp3",
      image: "./assest/music/music__img/0.webp",
      time: "04:23",
      album: "Anh Đã Lạc Vào (Singer)",
    },
    {
      name: "Đường Quyền Tình Yêu",
      singer: "DatKaa, QT Beatz",
      path: "./assest/music/music__song/1.mp3",
      image: "./assest/music/music__img/1.webp",
      time: "03:34",
      album: "Đường Quyền Tình Yêu (Singer)",
    },
    {
      name: "Đánh Mất Em (Lofi Version)",
      singer: "Quang Đăng Trần, Freak D",
      path: "./assest/music/music__song/2.mp3",
      image: "./assest/music/music__img/2.webp",
      time: "03:48",
      album: "Đánh Mất Em (Singer)",
    },
    {
      name: "Lỗi Tại Anh - Lofi Remix By Freak D",
      singer: "Alex Lam, Freak D",
      path: "./assest/music/music__song/3.mp3",
      image: "./assest/music/music__img/3.webp",
      time: "03:50",
      album: "Lỗi Tại Anh (Singer)",
    },
    {
      name: "Ôm Nhiều Mộng Mơ",
      singer: "Phát Huy T4",
      path: "./assest/music/music__song/4.mp3",
      image: "./assest/music/music__img/4.webp",
      time: "04:03",
      album: "Ôm Nhiều Mộng Mơ (Singer)",
    },
    {
      name: "Em Nên Dừng Lại",
      singer: "Khang Việt",
      path: "./assest/music/music__song/5.mp3",
      image: "./assest/music/music__img/5.webp",
      time: "07:27",
      album: "Em Nên Dừng Lại (Singer)",
    },
    {
      name: "Đau Ở Đây Này (Lofi Version)",
      singer: "Nal",
      path: "./assest/music/music__song/6.mp3",
      image: "./assest/music/music__img/6.webp",
      time: "03:41",
      album: "Đau Ở Đây Này (Singer)",
    },
    {
      name: "Lỡ Yêu Người Đậm Sâu",
      singer: "Linh Hương Luz",
      path: "./assest/music/music__song/7.mp3",
      image: "./assest/music/music__img/7.webp",
      time: "03:42",
      album: "Lỡ Yêu Người Đậm Sâu (Singer)",
    },
    {
      name: "Tiếng Pháo Tiễn Người",
      singer: "Hùng Quân",
      path: "./assest/music/music__song/8.mp3",
      image: "./assest/music/music__img/8.webp",
      time: "05:04",
      album: "Tiếng Pháo Tiễn Người (Singer)",
    },
    {
      name: "Nụ Cười Em Là Nắng",
      singer: "Green",
      path: "./assest/music/music__song/9.mp3",
      image: "./assest/music/music__img/9.webp",
      time: "04:04",
      album: "Nụ Cười Em Là Nắng (Singer)",
    },
    {
      name: "Đường Tôi Chở Em Về",
      singer: "buitruonglinh",
      path: "./assest/music/music__song/10.mp3",
      image: "./assest/music/music__img/10.webp",
      time: "03:25",
      album: "Đường Tôi Chở Em Về (Singer)",
    },
    {
      name: "Xem Như Em Chẳng May",
      singer: "Chu Thúy Quỳnh, Trung Ngon",
      path: "./assest/music/music__song/11.mp3",
      image: "./assest/music/music__img/11.webp",
      time: "03:25",
      album: "Xem Như Em Chẳng May (Singer)",
    },
    {
      name: "Vui Lắm Nha",
      singer: "Hương Ly, Jombie",
      path: "./assest/music/music__song/12.mp3",
      image: "./assest/music/music__img/12.webp",
      time: "05:32",
      album: "Vui Lắm Nha (Singer)",
    }
  ],
  setConfig: function(key,value){
    this.config[key] = value;
    localStorage.setItem(PLAYER__STORAGE_KEY, JSON.stringify(this.config))
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="personal__nav-playlist--songlist-item ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                                <div class="personal__nav-playlist--songlist-left">
                                    <div class="personal__nav-playlist--songlist-left-icons">
                                        <div class="personal__nav-playlist--songlist-icon-nohover">
                                            <i class="fa-solid fa-music"></i>
                                        </div>
                                        <div class="personal__nav-playlist--songlist-icon-hover">
                                            <i class="fa-regular fa-square"></i>
                                        </div>
                                    </div>
                                    <div class="personal__nav-playlist--songlist-left-img"   style="background-image: url(${
                                      song.image
                                    })">
                                        <div class="personal__nav-playlist--songlist-left-img-icon-pause" id="${index === this.currentIndex ? "animationpause" : ""}">
                                            <i class="fas fa-play"></i>
                                        </div>
                                        <div class="personal__nav-playlist--songlist-left-img-icon-pause-play " id="${index === this.currentIndex ? "animationplay" : ""}">
                                            <img src="./assest/img/playsongicons/icon-playing.gif" alt="">
                                        </div>
                                    </div>
                                    <div class="personal__nav-playlist--songlist-left-name__author-song">
                                        <span class="personal__nav-playlist--songlist-left-name__author-song-name__song">
                                            ${song.name}
                                        </span>
                                        <p class="personal__nav-playlist--songlist-left-name__author-song-author__songs">
                                            ${song.singer}
                                        </p>
                                    </div>
                                </div>
                                <div class="personal__nav-playlist--songlist-content hide-on-tablet hide-on-mobile">
                                    <a href="">${song.album}</a>
                                </div>
                                <div class="personal__nav-playlist--songlist-right">
                                    <div class="personal__nav-playlist--songlist-right-icon">
                                        <i class="fas fa-microphone"></i>
                                    </div>
                                    <div class="personal__nav-playlist--songlist-right-icon">
                                        <i class="fa-solid fa-heart"></i>
                                    </div>
                                    <div class="personal__nav-playlist--songlist-right-icon">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                    <div class="personal__nav-playlist--songlist-right-end__time">${
                                      song.time
                                    }</div>
                                </div>
                            </div>
        `;
    });
    playListmain.innerHTML = htmls.join("");
  },
  // render list mini
  renderMiniList: function(){
    const htmls = this.songs.map((song, index) =>{
      return index<=this.currentIndex ? `
      <div class="nav__right-playlist-item ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
      <div class="nav__right-playlist-right-left">
          <div class="nav__right-playlist-right-left-img" style="background-image: url(${
            song.image
          })">
              <div class="nav__right-playlist-right-left-img-icon-pause">
                  <i class="fas fa-play"></i>
              </div>
              <div class="nav__right-playlist-right-left-img-icon-pause-play">
                  <img src="./assest/img/playsongicons/icon-playing.gif" alt="">
              </div>
          </div>
          <div class="nav__right-playlist-right-left-name__author-song">
              <span class="nav__right-playlist-right-left-name__author-song-name__song">
                  ${song.name}
              </span>
              <p class="nav__right-playlist-right-left-name__author-song-author__songs">
                  ${song.singer}
              </p>
          </div>
      </div>
      <div class="nav__right-playlist-right-right">
          <div class="nav__right-playlist-right-right-icon">
              <i class="fa-solid fa-heart"></i>
          </div>
          <div class="nav__right-playlist-right-right-icon">
              <i class="fa-solid fa-ellipsis"></i>
          </div>
      </div>
  </div>
      `:''
    });
    listMiniPlaying.innerHTML= htmls.join("");
  },
  // render bài hát bào bài tiếp theo
  renderMiniListContinute: function(){
    const htmls = this.songs.map((song, index) =>{
      return index > this.currentIndex ? `
      <div class="nav__right-playlist-item ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
      <div class="nav__right-playlist-right-left">
          <div class="nav__right-playlist-right-left-img" style="background-image: url(${
            song.image
          })">
              <div class="nav__right-playlist-right-left-img-icon-pause">
                  <i class="fas fa-play"></i>
              </div>
              <div class="nav__right-playlist-right-left-img-icon-pause-play">
                  <img src="./assest/img/playsongicons/icon-playing.gif" alt="">
              </div>
          </div>
          <div class="nav__right-playlist-right-left-name__author-song">
              <span class="nav__right-playlist-right-left-name__author-song-name__song">
                  ${song.name}
              </span>
              <p class="nav__right-playlist-right-left-name__author-song-author__songs">
                  ${song.singer}
              </p>
          </div>
      </div>
      <div class="nav__right-playlist-right-right">
          <div class="nav__right-playlist-right-right-icon">
              <i class="fa-solid fa-heart"></i>
          </div>
          <div class="nav__right-playlist-right-right-icon">
              <i class="fa-solid fa-ellipsis"></i>
          </div>
      </div>
  </div>
      `:''
    });
    listMiniContinte.innerHTML= htmls.join("");
  },
  handleEvents: function () {
    const _this = this;
    // xử lý khi cuộn lên thi làm đục thanh haerd nav
    content.onscroll = function() {
      let scrollY=content.scrollTop || content.scrollY;
      if (scrollY>=10){
          Object.assign(header.style, {
          backgroundColor: `var(--header-search-background)`,
          boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
      }) 
      }else {
        Object.assign(header.style, {
          backgroundColor: `transparent`,
          boxShadow: 'none',
      })
    }
    };
    // Xử lý khi bấn nút minilist
    bntRightNav.onclick = () => {
      if (_this.navRightIndex) {
        nav__right.style.left = "100%";
        _this.navRightIndex = false;
        bntRightNav.style.backgroundColor = "rgba(255,255,255,0.1)";
      } else {
        nav__right.style.left = "calc(100% - 330px)";
        _this.navRightIndex = true;
        bntRightNav.style.backgroundColor = "var(--praimary-color)";
      }
    };
    // Khi nhấn nút Play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Khi bài hát đc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      $("#animationplay").classList.add("active");
      $("#animationpause").classList.remove("active");
    };
    // Khi bài hát đc pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      $("#animationplay").classList.remove("active");
      $("#animationpause").classList.add("active");
    };
    // khi tiến độ bài hát thảy đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        input.value = progressPercent;
        var sliderValue = input.value;
        thumb.style.left = sliderValue + "%";
        bar.style.width = sliderValue + "%";

      }
      _this.currentTimeSong();
    };
    //  khi tời bài hát
    input.oninput = function (e) {
      const seekTime = (input.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };
    // xử lý volume
    input__volume.oninput = function (e) {
      _this.volume = e.target.value;
      
      audio.volume=_this.volume/100;
      let sliderValue = _this.volume;
      _this.setConfig("volume",_this.volume);
      thumb__volume.style.left = sliderValue + "%";
      bar__volume.style.width = sliderValue + "%";
      volume__notice.textContent=e.target.value;
      if (_this.volume == 0){
        $(".mute__volume").style.display="flex";
        $(".low__volume").style.display="none";
        $(".high__volume").style.display="none";
      }
      else if (_this.volume<=50)
      {
        $(".mute__volume").style.display="none";
        $(".low__volume").style.display="flex";
        $(".high__volume").style.display="none";
      }
      else{
        $(".mute__volume").style.display="none";
        $(".low__volume").style.display="none";
        $(".high__volume").style.display="flex";
      }
      
    };
    // khi next song
    nextBtn.onclick = function ()  {
        if(!_this.isRandom){
          _this.nextSong();
        } else {
          _this.radomSong();
        }
        audio.play();
        _this.render();
        _this.renderMiniList();
        _this.renderMiniListContinute();
    };
    // Khi prev song
    prevBtn.onclick = function (){
      _this.preSong();
      audio.play();
      _this.render();
      _this.renderMiniList();
      _this.renderMiniListContinute();
    }
    // xử ký khi kích vào ramdom
    ramBtn.onclick =function(e) {
      if (!_this.isRandom){
        _this.isRandom=true;
        ramBtn.classList.toggle('btn-active');
        $(".btn-random-hover").textContent="Bật phát ngẫu nhiên";
      }
      else{
        _this.isRandom=false;
        ramBtn.classList.remove('btn-active');
        $(".btn-random-hover").textContent="Tắt phát ngẫu nhiên";
      }
      _this.setConfig('isRandom',_this.isRandom);
    }
    // xử lý khi nhấn nút lạp lại repeat
    repeatBtn.onclick = function() {
      _this.isRepeat++;
      
      if (_this.isRepeat >= 3){
        _this.isRepeat=0;
        _this.setConfig("isRepeat",_this.isRepeat);
      }
      if (_this.isRepeat==0){
        repeatBtn.classList.remove('btn-active');
        btn_repeat_1.style.display= "none";
        $(".btn-repeat-hover").textContent="Tắt phát lại tất cả";
        _this.setConfig("isRepeat",_this.isRepeat);
      } else
      if(_this.isRepeat==1){
        repeatBtn.classList.toggle('btn-active');
        $(".btn-repeat-hover").textContent="Bật phát lại một bài";
        _this.setConfig("isRepeat",_this.isRepeat);
      } else
      if (_this.isRepeat==2){
        btn_repeat_1.style.display= "flex";
        $(".btn-repeat-hover").textContent="Bật phát lại tất cả";
        _this.setConfig("isRepeat",_this.isRepeat);
      }
      _this.setConfig("isRepeat",_this.isRepeat);
    }
    // xử lý khi hết song 
    audio.onended= function() {
      if (_this.isRepeat==1){
        audio.play();
      }else 
      if (_this.isRepeat==0 && _this.currentIndex == _this.songs.length-1){
        audio.pause()
      }
      else{
        nextBtn.click();
      }
    }
    // xử lý khi duolbe click vào play list
    playListmain.ondblclick = function (e){
      const songNode = e.target.closest('.personal__nav-playlist--songlist-item:not(.active)')
      //xử lý khi vào song
      //xử lý khi vào song
      if (songNode){
        _this.currentIndex= Number(songNode.dataset.index);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
        _this.renderMiniList();
        _this.renderMiniListContinute();
      }
    }
    // xử lý khi kích vào listmini
    nav__right.ondblclick = function (e){
      const songNode = e.target.closest('.nav__right-playlist-item:not(.active)')
      //xử lý khi vào song
      //xử lý khi vào song
      if (songNode){
        _this.currentIndex= Number(songNode.dataset.index);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
        _this.renderMiniList();
        _this.renderMiniListContinute();
      }
    }
    // xử ký khi kick vào song nút play  thư viện
    personalHeaderIcon.onclick = function(){
      _this.radomSong();
      audio.play();
      _this.render();
      _this.renderMiniList();
      _this.renderMiniListContinute();
      
    } 
  },

  //load config
  loadConfig: function(){
    this.isRandom=this.config.isRandom;
    this.isRepeat=this.config.isRepeat;
    audio.volume=this.volume/100;
    this.volume=this.config.volume;
    if (this.isRandom){
      ramBtn.classList.toggle('btn-active');
      $(".btn-random-hover").textContent="Bật phát ngẫu nhiên";
    }
    else{
      ramBtn.classList.remove('btn-active');
      $(".btn-random-hover").textContent="Tắt phát ngẫu nhiên";
    }



    if (this.isRepeat==0){
      repeatBtn.classList.remove('btn-active');
      btn_repeat_1.style.display= "none";
      $(".btn-repeat-hover").textContent="Tắt phát lại tất cả";
    } else
    if(this.isRepeat==1){
      repeatBtn.classList.toggle('btn-active');
      $(".btn-repeat-hover").textContent="Bật phát lại một bài";
    } else
    if (this.isRepeat==2){
      btn_repeat_1.style.display= "flex";
      repeatBtn.classList.toggle('btn-active');
      $(".btn-repeat-hover").textContent="Bật phát lại tất cả";
    }

    let sliderValue = this.volume;
    thumb__volume.style.left = sliderValue + "%";
    bar__volume.style.width = sliderValue + "%";
    volume__notice.textContent=sliderValue;
    if (sliderValue== 0){
      $(".mute__volume").style.display="flex";
      $(".low__volume").style.display="none";
      $(".high__volume").style.display="none";
    }
    else if (sliderValue<=50)
    {
      $(".mute__volume").style.display="none";
      $(".low__volume").style.display="flex";
      $(".high__volume").style.display="none";
    }
    else{
      $(".mute__volume").style.display="none";
      $(".low__volume").style.display="none";
      $(".high__volume").style.display="flex";
    }
  },
  // tải bài hát hiện tại
  loadCurrentSong: function () {
    showsong__img.src = this.currentSong.image;
    name__song.textContent = this.currentSong.name;
    author__song.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
    endTime.textContent = this.currentSong.time;
  },
  // đưa độ dài bài hát về phút
  formatTime: function (songTime) {
    const minute = Math.floor(songTime / 60);
    const second = Math.floor(songTime - minute * 60);
    return `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;
  },
  // bài hát tiếp theo
  nextSong: function() {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length-1) {
      this.currentIndex=0;
    }
    this.loadCurrentSong();
  },
  // lùi bài hát lại
  preSong: function() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex=this.songs.length-1;
    }
    this.loadCurrentSong();
  },
  //xử lý ramdom 1 bài hát 
  radomSong: function() {
    let newIndex;
    do{
       newIndex = Math.floor(Math.random()*this.songs.length)
    } while(newIndex === this.currentIndex);
    this.currentIndex=newIndex;
    this.loadCurrentSong();
  },
  // ghi thơi gian bài hát vào thời gian hiện tại
  currentTimeSong: function () {
    current__time.textContent = this.formatTime(audio.currentTime);
  },
  //  xử lý volume khi bắt đầu vào web
  volumeStrat: function() {
    input__volume.value = audio.volume*100;
    let sliderValue = input__volume.value;
    thumb__volume.style.left = sliderValue + "%";
    bar__volume.style.width = sliderValue + "%";
    
  },
  start: function () {
    
    this.loadConfig();
    this.defineProperties();
    this.loadCurrentSong();
    this.volumeStrat();
    this.renderMiniList();
    this.renderMiniListContinute();
    // lắng nghe sự kiện
    this.handleEvents();
    // tải bài hát đầu tiên vào UI
    // thời giạn hiện tại của bài hát
    this.currentTimeSong();
    //render bài hát vào play list
    this.render();
  },
};
app.start();

