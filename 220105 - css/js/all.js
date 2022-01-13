// Modal
// 開啟 modal 時， bootstrap 替 body 增加 overflow hidden
// 並且替 body、#navbar 增加 padding-right，造成整個畫面寬度邊寬
$('#reg_btn, #login_btn').on('click', function () {
	$('body,#navbar').css({
		overflow: 'auto',
		paddingRight: 0
	})
})

// section03 生物種族
$('#race a').on('click', function () {
	$('#race a').removeClass('active')
	$(this).addClass('active')
})

// swiper
const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	loop: true,
	speed: 1000,
	spaceBetween: 15,
	centeredSlides: true,
	autoplay: {
		delay: 10000
	},
	slidesPerView: 'auto',
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true
	},
	breakpoints: {
		576: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		},
		920: {
			slidesPerView: 3
		},
		1200: {
			slidesPerView: 4
		}
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	navigation: {
		nextEl: '.swiper-button-next',
		preEl: '.swiper-button-prev'
	}
})

// GSAP -----------------------------------------------------------------------------------------------
// 註冊 Pligins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

$('#navbar .main-link, .backtop a').each(function (index) {
	$(this).on('click', function (e) {
		e.preventDefault() //阻止 a 連結的預設動作
		if ($().attr('href') == '#section04' || $(this).attr('href') == '#section05') {
			gsap.to($(window), {
				scrollTo: {
					y: `#section0${index + 1}`
				},
				duration: 1.5,
				ease: 'back.inOut'
			})
		} else {
			gsap.to($(window), {
				scrollTo: {
					y: `#section0${index + 1}`,
					offsetY: 150
				},
				duration: 1.5,
				ease: 'back.inOut'
			})
		}
	})
})

// scrollTrigger 滾動軸
gsap.to('.backtop', {
	scrollTrigger: {
		trigger: '#footer',
		start: 'top bottom',
		end: '100% bottom',
		toggleActions: 'play none none reverse'
	},
	display: 'block',
	opacity: 1,
	duration: 1
})

// 流星
// 1, 創建流星數目
function createStar(starNumber) {
	for (let i = 0; i < starNumber; i++) {
		$('.shooting_star').append('<div class="star"></div>')
	}
	const stars = gsap.utils.toArray('.star')
	return stars
}

// 2. 設定補間動畫預設值
function setStarTween(stars) {
	gsap.set('.shooting_star', {
		perspective: 800
	})
	stars.forEach(function (star, index) {
		gsap.set(star, {
			transformOrigin: '0 50%',
			position: 'absolute',
			left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
			top: gsap.utils.random(-100, -200),
			rotation: -40
		})
	})
	return stars
}

// 3. 播放流星的時間軸動畫
function playStarTimeline(stars) {
	const tl = gsap.timeline({
		repeat: -1
	})
	tl.to(stars, {
		x: `-=${$(window).width() * 1.5}`,
		y: `+=${$(window).width() * 1.5}`,
		z: `random(-100, 500)`,
		stagger: function (index) {
			return gsap.utils.random(index + 5, (index + 5) * 2, 1)
		},
		duration: 'random(0,5, 3, 0,1)',
		ease: 'none'
	})
}

// 管道流程，可以設定一系列的流程，將函式結果 return 給下一個函式，當成參數來接收
const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimeline)
playStar(30)

// 視差效果
gsap.to('body', {
	scrollTrigger: {
		trigger: 'body',
		start: 'top 0%',
		end: 'bottom 0%',
		scrub: 5
	},
	backgroundPosition: '50% 100%',
	ease: 'none'
})

// 浮空島
const float_tl = gsap.timeline({
	scrollTrigger: {
		trigger: 'body',
		start: 'top 100%',
		end: 'bottom 100%',
		scrub: 5
	},
	ease: 'none'
})

// 使用 timeline 操作進場位置
float_tl
	.from('.float-wrap-01', {
		left: '-30%'
	})
	.from('.float-wrap-02', {
		right: '-30%'
	}, '<')
	.from('.float-wrap-03', {
		bottom: '-30%'
	}, '<')

// 島自身上下浮動
$('.float-island').each(function (index, island) {
	gsap.to(island, {
		y: 50 * (index + 1),
		duration: 10 * (index + 1),
		repeat: -1,
		yoyo: true,
		ease: 'power1.inOut'
	})
})

// 霧
$('.fog').each(function (index, fog) {
	gsap.set(fog, {
		width: '100%',
		height: '100%',
		background: 'url(./images/fog.png) no-repeat center/80%',
		opacity: 0.8,
		position: 'absolute',
		top: 'random(0, 100)' + '%',
		x: function () {
			return index % 2 == 0 ? -$(window).width() : $(window).width()
		}
	})
	gsap.to(fog, {
		x: function () {
			return index % 2 == 0 ? $(window).width() : -$(window).width()
		},
		onRepeat() {
			$(fog).css({
				top: gsap.utils.random(0, 100) + '%'
			})
		},
		repeat: -1,
		duration: 10,
		ease: 'none'
	})
})

// 導覽列 滾動收合
// gsap.from('#navbar', {
//   yPercent: -100,
//   paused: false,
//   duration: 0.5,
//   scrollTrigger: {
//     start: 'top 60',
//     end: () => '+=' + document.documentElement.scrollHeight, //整份文件的高度
//     onEnter(self) {
//       console.log(self)
//       self.animation.play()
//     },
//     onUpdate(self) {
//       self.direction === -1 ? self.animation.play() : self.animation.reverse
//     }
//   }
// })

// 導覽列 active 位置
$('.main-link').each(function (index, link) {
	let href = $(link).attr('href') // 抓 section id
	console.log(href)
	gsap.to(link, {
		scrollTrigger: {
			trigger: `${href}`,
			start: 'top center',
			end: 'bottom center',
			toggleClass: {
				targets: link,
				className: 'active'
			}
		}
	})
})

// splitText
gsap.set('#splitText', {
	perspective: 400
})

const tl_text = gsap.timeline({
	repeat: -1,
	repeatDelay: 8
})

// 將段落轉成陣列
const paragraphs = gsap.utils.toArray('#splitText p')
console.log(paragraphs)

// 將段落迭代循環，使用建構式 new SplitText() 將每個段落每個字分割成一個陣列，最後再放入新陣列 splitTexts
const splitTexts = paragraphs.map(function (p) {
	return new SplitText(p, {
		charsClass: 'charBg'
	})
})

splitTexts.forEach(function (splitText) {
	const chars = splitText.chars
	tl_text.from(chars, {
		y: 80,
		rotateX: 0,
		rotateY: 180,
		scale: 2,
		transformOrigin: '0% 50% -100',
		opacity: 0,
		duration: 2,
		ease: 'back',
		stagger: 0.1,
		onComplete() {
			gsap.to(chars, {
				delay: 3,
				duration: 2,
				opacity: 0,
				scale: 2,
				y: 80,
				rotationX: 180,
				rotationY: 0,
				transformOrigin: '0% 50% -100',
				ease: 'back',
				stagger: 0.1
			})
		}
	}, '+=3')
})